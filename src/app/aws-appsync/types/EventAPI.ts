/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type GetSnapshotQueryVariables = {
  id_: string,
};

export type GetSnapshotQuery = {
  getSnapshot:  {
    id_: string,
    pairs:  Array< {
      __typename: "Pair",
      pair: string,
      type: string,
      price: number,
      low24: number,
      high24: number,
      open24: number,
      volume24: number,
      changepct24: number,
    } | null > | null,
  } | null,
};

export type GetHistoryQueryVariables = {
  id_: string,
  asending?: boolean | null,
  ut?: number | null,
  limit?: number | null,
};

export type GetHistoryQuery = {
  getHistory:  Array< {
    id_: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null > | null,
};

export type PutDummySnapshotMutationVariables = {
  id_: string,
};

export type PutDummySnapshotMutation = {
  putDummySnapshot:  {
    id_: string,
    pairs:  Array< {
      __typename: "Pair",
      pair: string,
      type: string,
      price: number,
      low24: number,
      high24: number,
      open24: number,
      volume24: number,
      changepct24: number,
    } | null > | null,
  } | null,
};

export type PutDummyHistoryMutationVariables = {
  id_: string,
  ut: number,
};

export type PutDummyHistoryMutation = {
  putDummyHistory:  {
    id_: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};

export type SubscribeSnapshotSubscriptionVariables = {
  id_: string,
};

export type SubscribeSnapshotSubscription = {
  subscribeSnapshot:  {
    id_: string,
    pairs:  Array< {
      __typename: "Pair",
      pair: string,
      type: string,
      price: number,
      low24: number,
      high24: number,
      open24: number,
      volume24: number,
      changepct24: number,
    } | null > | null,
  } | null,
};

export type SubscribeHistorySubscriptionVariables = {
  id_: string,
};

export type SubscribeHistorySubscription = {
  subscribeHistory:  {
    id_: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};

export type SnapshotDataFragment = {
  id_: string,
  pairs:  Array< {
    __typename: string,
    pair: string,
    type: string,
    price: number,
    low24: number,
    high24: number,
    open24: number,
    volume24: number,
    changepct24: number,
  } | null > | null,
};

export type HistoryDataFragment = {
  id_: string,
  ut: number,
  low: number,
  high: number,
  open: number,
  close: number,
  volume: number,
};
