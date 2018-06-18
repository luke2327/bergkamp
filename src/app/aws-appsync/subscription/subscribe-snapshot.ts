import gql from 'graphql-tag';
export default gql`
subscription SubscribeSnapshot($id_: ID!) {
  subscribeSnapshot(id_: $id_) {
    ...SnapshotData
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
