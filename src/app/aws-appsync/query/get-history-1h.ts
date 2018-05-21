import gql from 'graphql-tag';
export default gql`
query GetHistory1h($id: ID!, $asending: Boolean!, $ut: Int!, $limit: Int!) {
  getHistory1h(id: $id, asending: $asending, ut: $ut, limit: $limit) {
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
