import gql from 'graphql-tag';
export default gql`
subscription SubscribeHistory1m($id: ID!) {
  subscribeHistory1m(id: $id) {
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
