import gql from 'graphql-tag';
export default gql`
subscription SubscribeHistory($id_: ID!) {
  subscribeHistory(id_: $id_) {
    ...HistoryData
  }
}
fragment HistoryData on History {
  id_
  ut
  low
  high
  open
  close
  volume
}
`
