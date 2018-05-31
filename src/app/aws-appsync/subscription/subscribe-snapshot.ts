import gql from 'graphql-tag';
export default gql`
subscription SubscribeSnapshot($id: ID!) {
  subscribeSnapshot(id: $id) {
    ...SnapshotData
  }
}
fragment SnapshotData on Snapshot {
  id
  pairs {
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
