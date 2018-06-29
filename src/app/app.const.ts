import { HttpParams, HttpHeaders } from '@angular/common/http';
export const AppSyncConfig = {
  url: "https://rsdyr5jruvcgzetcjhyekcynym.appsync-api.us-west-2.amazonaws.com/graphql",
  region: "us-west-2",
  auth: {
    type: "API_KEY",
    apiKey: "da2-joi3eflr65e73gd7o5ckxrytae",
  }
}
export const AppSyncOptions = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
}
export const RestUrlGeoLoc: string = 'http://geoip.nekudo.com/api/';
export const RestUrlBase: string = 'https://288ro8h2i2.execute-api.us-west-2.amazonaws.com/apidev/';
export const RestUrlNotice: string = 'info/notice/';
export const RestUrlFavorite: string = 'user/favorite/';
export const RestUrlOrder: string = 'order/';
export const RestUrlOrderMy: string = 'order/my';
export const RestTransactionMy: string = 'transaction/my';
export const enum BidAskTableType {
  BidOnly = 0,
  AskOnly = 1,
  BidAndAsk = 2
}
export const enum BidAskType {
  Bid = 0,
  Ask = 1
}
export const enum RestStatus {
  ResultOk = 200
}
export const enum OrderStatus {
  Undefined = -1,
  BuyLimit = 0,
  BuyMarket = 1,
  SellLimit = 2,
  SellMarket = 3
}
export const enum OrderType {
  Limit = 0,
  Market = 1
}
export const enum OrderHistoryType {
  OpenOrder = 0,
  OrderHistory = 1
}
//지원 언어
export const SupportedLang = {
  "langs" : [
    {
      "langCode" : "en",
      "langName" : "English",
      "img" : "/assets/img/web_navi_language_en.png"
    },
    {
      "langCode" : "ko",
      "langName" : "한국어",
      "img" : "/assets/img/web_navi_language_ko.png"
    }
  ]
}
//http option에 대한 interface
export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
}
