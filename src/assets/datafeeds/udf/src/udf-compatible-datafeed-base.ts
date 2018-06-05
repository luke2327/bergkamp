import {
	DatafeedConfiguration,
	ErrorCallback,
	GetMarksCallback,
	HistoryCallback,
	HistoryDepth,
	IDatafeedChartApi,
	IDatafeedQuotesApi,
	IExternalDatafeed,
	LibrarySymbolInfo,
	Mark,
	OnReadyCallback,
	QuotesCallback,
	ResolutionBackValues,
	ResolutionString,
	ResolveCallback,
	SearchSymbolResultItem,
	SearchSymbolsCallback,
	ServerTimeCallback,
	SubscribeBarsCallback,
	TimescaleMark,
	Timezone
} from '../../../charting_library/datafeed-api';
import {
	getErrorMessage,
	logMessage,
	RequestParams,
	UdfErrorResponse,
} from './helpers';

import {
	GetBarsResult,
	HistoryProvider,
} from './history-provider';

import { IQuotesProvider } from './iquotes-provider';
import { DataPulseProvider } from './data-pulse-provider';
import { QuotesPulseProvider } from './quotes-pulse-provider';
import { SymbolsStorage } from './symbols-storage';
import { Requester } from './requester';

export interface UdfCompatibleConfiguration extends DatafeedConfiguration {
	// tslint:disable
	supports_search?: boolean;
	supports_group_request?: boolean;
	// tslint:enable
}

export interface ResolveSymbolResponse extends LibrarySymbolInfo {
	s: undefined;
}

// it is hack to let's TypeScript make code flow analysis
export interface UdfSearchSymbolsResponse extends Array<SearchSymbolResultItem> {
	s?: undefined;
	errmsg: string;
}

export const enum Constants {
	SearchItemsLimit = 30,
}

type UdfDatafeedMarkType<T extends TimescaleMark | Mark> = {
	[K in keyof T]: T[K] | T[K][];
} & {
	id: (string | number)[];
};

type UdfDatafeedMark = UdfDatafeedMarkType<Mark>;
type UdfDatafeedTimescaleMark = UdfDatafeedMarkType<TimescaleMark>;

function extractField<Field extends keyof Mark>(data: UdfDatafeedMark, field: Field, arrayIndex: number): Mark[Field];
function extractField<Field extends keyof TimescaleMark>(data: UdfDatafeedTimescaleMark, field: Field, arrayIndex: number): TimescaleMark[Field];
function extractField<Field extends keyof (TimescaleMark & Mark)>(data: UdfDatafeedMark & UdfDatafeedTimescaleMark, field: Field, arrayIndex: number): (TimescaleMark & Mark)[Field] {
	const value = data[field];
	return Array.isArray(value) ? value[arrayIndex] : value;
}

/**
 * This class implements interaction with UDF-compatible datafeed.
 * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
 */
export class UDFCompatibleDatafeedBase implements IExternalDatafeed, IDatafeedQuotesApi, IDatafeedChartApi {
	protected _configuration: UdfCompatibleConfiguration = defaultConfiguration();
	private readonly _datafeedURL: string;
	private readonly _configurationReadyPromise: Promise<void>;

	private _symbolsStorage: SymbolsStorage | null = null;

	private readonly _historyProvider: HistoryProvider;
	private readonly _dataPulseProvider: DataPulseProvider;

	private readonly _quotesProvider: IQuotesProvider;
	private readonly _quotesPulseProvider: QuotesPulseProvider;

	private readonly _requester: Requester;
	public historyCallback:HistoryCallback;
	protected constructor(datafeedURL: string,
		quotesProvider: IQuotesProvider,
		requester: Requester,
		updateFrequency: number = 10 * 1000) {
		this._datafeedURL = datafeedURL;
		this._requester = requester;
		this._historyProvider = new HistoryProvider(datafeedURL, this._requester);
		this._quotesProvider = quotesProvider;

		this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
		this._quotesPulseProvider = new QuotesPulseProvider(this._quotesProvider);

		// this._configurationReadyPromise = this._requestConfiguration()
		// 	.then((configuration: UdfCompatibleConfiguration | null) => {
		//
		//
		// 	});
		this._configuration  = {
			"supports_search":true,
			"supports_group_request":false,
			"supports_marks":true,
			"supports_timescale_marks":true,
			"supports_time":true,
			"exchanges":[],
			"symbols_types":[],
			"supported_resolutions":["1","60"]
		};
		this._setupWithConfiguration(this._configuration);
	}

	public onReady(callback: OnReadyCallback): void {
		// this._configurationReadyPromise.then(() => {
		// 	callback(this._configuration);
		// });
		callback(this._configuration);
	}

	public getQuotes(symbols: string[], onDataCallback: QuotesCallback, onErrorCallback: (msg: string) => void): void {
		this._quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
	}

	public subscribeQuotes(symbols: string[], fastSymbols: string[], onRealtimeCallback: QuotesCallback, listenerGuid: string): void {
		this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
	}

	public unsubscribeQuotes(listenerGuid: string): void {
		this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
	}

	public calculateHistoryDepth(resolution: ResolutionString, resolutionBack: ResolutionBackValues, intervalBack: number): HistoryDepth | undefined {
		return undefined;
	}

	public getMarks(symbolInfo: LibrarySymbolInfo, startDate: number, endDate: number, onDataCallback: GetMarksCallback<Mark>, resolution: ResolutionString): void {
	}

	public getTimescaleMarks(symbolInfo: LibrarySymbolInfo, startDate: number, endDate: number, onDataCallback: GetMarksCallback<TimescaleMark>, resolution: ResolutionString): void {

	}

	public getServerTime(callback: ServerTimeCallback): void {
		if (!this._configuration.supports_time) {
			return;
		}

		this._send('time')
			.then((response: string) => {
				const time = parseInt(response);
				if (!isNaN(time)) {
					callback(time);
				}
			})
			.catch((error?: string | Error) => {
				logMessage(`UdfCompatibleDatafeed: Fail to load server time, error=${getErrorMessage(error)}`);
			});
	}

	public searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback): void {

	}

	public resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback): void {
		logMessage('Resolve requested');

		const resolveRequestStartTime = Date.now();
		function onResultReady(symbolInfo: LibrarySymbolInfo): void {
			console.log("onresultready");
			logMessage(`Symbol resolved: ${Date.now() - resolveRequestStartTime}ms`);
			onResolve(symbolInfo);
		}

		if (!this._configuration.supports_group_request) {
			const params: RequestParams = {
				symbol: symbolName,
			};
			// let res:ResolveSymbolResponse = new ResolveSymbolResponse();
			let _timezone: Timezone = "Asia/Seoul";
			// 콜백형태가 아니면 에러가 발생하는 문제로 간단한 setTimeout 콜백을 추가해준다.
			setTimeout(()=>{
				try{
					let res = {
						"name":"",
						"exchange-traded":"",
						"exchange-listed":"",
						"minmov":1,
						"minmov2":0,
						"pointvalue":1,
						"session":"0900-1400",
						"has_intraday":true,
						"has_no_volume":false,
						"description":"",
						"type":"stock",
						"supported_resolutions":[ "1", "60", "D" ],
						"pricescale":100,
						"ticker":"AAPL",
						full_name : '',
						exchange : "",
						listed_exchange : "",
						timezone : _timezone
					};
					onResolve(res);
				}catch(e){
					console.log("e"+e);
					console.log("error");
				}

			},0);


		} else {}
	}

	public getBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, rangeStartDate: number, rangeEndDate: number, onResult: HistoryCallback, onError: ErrorCallback): void {

		// this._historyProvider.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate)
		// 	.then((result: GetBarsResult) => {
		// 		console.log(result.bars);
		// 		console.log(result.meta);
		// 		onResult(result.bars, result.meta);
		// 	})
		// 	.catch(onError);
		//실제로 동작하는 부분코드인데 커스터마이징을 위해 새로운 함수를 추가해준다.
		this.getBarsCustom(resolution.toString(), onResult);
		// console.log("onReady");
		// this.historyCallback = onResult;
	}
	//상속받아 쓸 함수를 구현
	public getBarsCustom(resolution: string, onResult: HistoryCallback): void {
		console.log("getBarsCustom");
	}
	public subscribeBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string, onResetCacheNeededCallback: () => void): void {
		// this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
	}

	public unsubscribeBars(listenerGuid: string): void {
		// this._dataPulseProvider.unsubscribeBars(listenerGuid);
	}

	protected _requestConfiguration(): Promise<UdfCompatibleConfiguration | null> {

		return this._send<UdfCompatibleConfiguration>('config')
			.catch((reason?: string | Error) => {
				logMessage(`UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=${getErrorMessage(reason)}`);
				return null;
			});
	}

	private _send<T>(urlPath: string, params?: RequestParams): Promise<T> {
		return this._requester.sendRequest<T>(this._datafeedURL, urlPath, params);
	}

	private _setupWithConfiguration(configurationData: UdfCompatibleConfiguration): void {
		this._configuration = configurationData;

		if (configurationData.exchanges === undefined) {
			configurationData.exchanges = [];
		}

		if (!configurationData.supports_search && !configurationData.supports_group_request) {
			throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
		}

		if (configurationData.supports_group_request || !configurationData.supports_search) {
			this._symbolsStorage = new SymbolsStorage(this._datafeedURL, configurationData.supported_resolutions || [], this._requester);
		}

		logMessage(`UdfCompatibleDatafeed: Initialized with ${JSON.stringify(configurationData)}`);
	}
}

function defaultConfiguration(): UdfCompatibleConfiguration {
	return {
		supports_search: false,
		supports_group_request: true,
		supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
		supports_marks: false,
		supports_timescale_marks: false,
	};
}
