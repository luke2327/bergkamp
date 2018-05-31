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
