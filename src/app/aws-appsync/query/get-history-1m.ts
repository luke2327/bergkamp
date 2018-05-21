import gql from 'graphql-tag';
export default gql`
query GetHistory1m($id: ID!, $asending: Boolean!, $ut: Int!, $limit: Int!) {
  getHistory1m(id: $id, asending: $asending, ut: $ut, limit: $limit) {
    id
    ut
    low
    high
    open
    close
    volume
  }
}
`
