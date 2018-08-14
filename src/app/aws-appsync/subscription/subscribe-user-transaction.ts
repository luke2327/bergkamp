import gql from 'graphql-tag';
export default gql`
subscription SubscribeUserTransaction($user_: Int!) {
  subscribeUserTransaction(user_: $user_) {
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
