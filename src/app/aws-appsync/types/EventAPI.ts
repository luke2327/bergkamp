/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type GetSnapshotQueryVariables = {
  id: string,
};

export type GetSnapshotQuery = {
  getSnapshot:  {
    id: string,
    pairs:  Array< {
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
  id: string,
  asending?: boolean | null,
  ut?: number | null,
  limit?: number | null,
};

export type GetHistoryQuery = {
  getHistory:  Array< {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null > | null,
};

export type PutDummySnapshotMutationVariables = {
  id: string,
};

export type PutDummySnapshotMutation = {
  putDummySnapshot:  {
    id: string,
    pairs:  Array< {
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
  id: string,
  ut: number,
};

export type PutDummyHistoryMutation = {
  putDummyHistory:  {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};

export type SubscribeSnapshotSubscriptionVariables = {
  id: string,
};

export type SubscribeSnapshotSubscription = {
  subscribeSnapshot:  {
    id: string,
    pairs:  Array< {
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
  id: string,
};

export type SubscribeHistorySubscription = {
  subscribeHistory:  {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};

export type SnapshotDataFragment = {
  id: string,
  pairs:  Array< {
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
  id: string,
  ut: number,
  low: number,
  high: number,
  open: number,
  close: number,
  volume: number,
};
