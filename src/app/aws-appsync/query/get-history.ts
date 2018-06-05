import gql from 'graphql-tag';
export default gql`
query GetHistory($id_: ID!, $asending: Boolean, $ut: Int, $limit: Int) {
  getHistory(id_: $id_, asending: $asending, ut: $ut, limit: $limit) {
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
