import gql from 'graphql-tag';
export default gql`
subscription SubscribePairTransaction($pair_type: Int!) {
  subscribePairTransaction(pair_type: $pair_type) {
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
