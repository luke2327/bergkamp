import { Component, Input, OnInit } from '@angular/core';
import { HistoryService } from '../../aws-appsync/service/history.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import {
    widget,
    onready,
    ChartingLibraryWidgetOptions,
    LanguageCode,
} from '../../../assets/charting_library/charting_library.min';
import {
  Bar,
	HistoryCallback,
  HistoryMetadata
} from '../../../assets/charting_library/datafeed-api';
import {
  GetBarsResult
} from '../../../assets/datafeeds/udf/src/history-provider';
import {
  UDFCompatibleDatafeed
} from '../../../assets/datafeeds/udf/src/udf-compatible-datafeed';
import {
  TestHistory1m,
  TestHistory1h
} from '../../app.const';
import { getLang } from '../../app.util';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


//차트를 그리기 위한 Component
//TODO 아직 레퍼런스 부족으로 100% 기능파악이 되지않아
//tradingview example에서 뼈대를 가져와 조금씩 수정하는 형태로 개발한다.
export class ChartComponent implements OnInit {

  private _interval: ChartingLibraryWidgetOptions['interval'] = '1';
  // BEWARE: no trailing slash is expected in feed URL
  //TODO 아직 쓰임이 확실하지 않은부분이 있어 남겨둔다.
  private _datafeedUrl = 'https://demo_feed.tradingview.com';
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
  //TODO 아직 쓰임이 확실하지 않은부분이 있어 남겨둔다.2
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://saveload.tradingview.com';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container_id'] = 'tv_chart_container';
  datafeedCustom:CustomUDFCompatibleDatafeed;
  private subscribeId: any;
  private symbolId: string;
  // historyCallback: HistoryCallback;
  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
    this.symbolId = symbol || this.symbolId;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
    this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
    this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
    this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
    this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
    this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
    this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
    this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
    this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
    this._containerId = containerId || this._containerId;
  }
  constructor(private historyService: HistoryService, private route: ActivatedRoute) {
    console.log();
  }
  ngOnInit() {
    //파라미터 값을 가져온다
    this.subscribeId = this.route.params.subscribe(params => {
      this.symbolId = params['id'].replace('-',"/").toUpperCase();
      //값을 전달함
      this.initChart();
    });
  }
  initChart(): void {
    function getLanguageCode(): LanguageCode | null {
      return decodeURIComponent(getLang()) as LanguageCode;
    }
    this.datafeedCustom = new CustomUDFCompatibleDatafeed(this.historyService, this._datafeedUrl);
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this.symbolId,
      datafeed: this.datafeedCustom,
      interval: this._interval,
      container_id: this._containerId,
      library_path: this._libraryPath,
      locale: getLanguageCode() || 'en',
      // disabled_features: [],
      enabled_features: ['study_templates'],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      client_id: this._clientId,
      user_id: this._userId,
      fullscreen: this._fullscreen,
      autosize: this._autosize,
      // timeframe: ['1','D','M'],
      disabled_features: ["use_localstorage_for_settings","header_symbol_search", "left_toolbar", "volume_force_overlay"]
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.chart().onIntervalChanged().subscribe(null, function(interval, obj) {

      })
      //20일선, 5일선 추가
      tvWidget.chart().createStudy("Moving Average", false, false, [20]);
      tvWidget.chart().createStudy("Moving Average", false, false, [5]);
    });
  }
}
//datafeed를 커스텀하게 가져오자.
export class CustomUDFCompatibleDatafeed extends UDFCompatibleDatafeed {
  private _service: HistoryService;
  private _customInterval: string;
  private historys: any;
  public constructor(historyService: HistoryService, datafeedURL: string, updateFrequency: number = 10 * 1000) {
		super(datafeedURL, updateFrequency);
    this._service = historyService;
    this._customInterval = "1";
	}
  public setInterVal(interval: string){
    this._customInterval = interval;
  }
  //직접 차트에다 바를 그려넣는 부분
  public getBarsCustom(resolution: string, onResult: HistoryCallback) {
    console.log('getBarsCustom:' + this._customInterval);
    let bars: Bar[] = [];
    const meta: HistoryMetadata = {
      noData: false,
    };
    //TODO 우선 데이터 문제로 막아놓는다.
    // this._service.startObserver();
    // this._service.queryObservable.subscribe((value) => {
    //   console.log(value.getHistory);
    //   let results = value.getHistory;
    //   const result:GetBarsResult = {
    //     bars: bars,
    //     meta: meta
    //   }
    //   // console.log(bars);
    //   onResult(result.bars, result.meta);
    // });
    if(resolution=='1') {
      this.historys = TestHistory1m.data.getHistory;
    } else {
      this.historys = TestHistory1h.data.getHistory;
    }
    let length: number = this.historys.length;
    for(var i = length-1; i >=0; i--) {
      let entry: any = this.historys[i];
      let t:number = entry.ut * 1000;
      const barValue: Bar = {
        time: t,
        close: entry.close,
        open: entry.open,
        high: entry.high,
        low: entry.low,
        volume: entry.volume
      };
      bars.push(barValue);
    }
    onResult(bars, meta);
	}
}
