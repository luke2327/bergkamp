import gql from 'graphql-tag';
export default gql`
subscription SubscribeHistory($id: ID!) {
  subscribeHistory(id: $id) {
    ...HistoryData
  }
}
fragment HistoryData on History {
  id
  ut
  low
  high
  open
  close
  volume
}
`
