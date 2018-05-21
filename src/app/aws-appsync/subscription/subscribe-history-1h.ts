import gql from 'graphql-tag';
export default gql`
subscription SubscribeHistory1h($id: ID!) {
  subscribeHistory1h(id: $id) {
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
