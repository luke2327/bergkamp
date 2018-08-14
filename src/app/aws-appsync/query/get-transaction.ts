import gql from 'graphql-tag';
export default gql`
query GetTransaction($pair_type: Int, $ct: Int, $user_: Int, $limit: Int) {
  getTransaction(pair_type: $pair_type, ct: $ct,
                 user_: $user_, limit: $limit) {
      ...TransactionData
  }
}
fragment TransactionData on Transaction {
  id_
  pair_type
  bidask
  user_
  price
  volume
  original_volume
  order_type
  ct
}
`
