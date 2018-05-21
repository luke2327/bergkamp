import gql from 'graphql-tag';
export default gql`
query GetAllSnapshot {
  getAllSnapshot {
    id
    ut
    price
    low24
    high24
    open24
    volume24
    changepct24
  }
}
`
