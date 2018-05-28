import gql from 'graphql-tag';
export default gql`
query GetHistory($id: ID!, $asending: Boolean, $ut: Int, $limit: Int) {
  getHistory(id: $id, asending: $asending, ut: $ut, limit: $limit) {
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
