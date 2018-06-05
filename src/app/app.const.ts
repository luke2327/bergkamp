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
export const RestUrlBase: string = 'https://288ro8h2i2.execute-api.us-west-2.amazonaws.com/apidev/info/';
export const RestUrlNotice: string = 'notice/';
