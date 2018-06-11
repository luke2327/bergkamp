import gql from 'graphql-tag';
export default gql`
subscription SubscribeHistory($id_: ID!) {
  subscribeHistory(id_: $id_) {
    ...HistoryData
  }
}
fragment SnapshotData on Snapshot {
  id_
  pairs {
    __typename
    pair
    type
    price
    low24
    high24
    open24
    volume24
    changepct24
  }
}
`
