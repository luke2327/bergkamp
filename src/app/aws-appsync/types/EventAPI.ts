/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type GetAllSnapshotQuery = {
  getAllSnapshot:  Array< {
    id: string,
    ut: number,
    price: number,
    low24: number,
    high24: number,
    open24: number,
    volume24: number,
    changepct24: number,
  } | null > | null,
};

export type GetHistory1mQueryVariables = {
  id: string,
  asending: boolean,
  ut: number,
  limit: number,
};

export type GetHistory1mQuery = {
  getHistory1m:  Array< {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null > | null,
};

export type GetHistory1hQueryVariables = {
  id: string,
  asending: boolean,
  ut: number,
  limit: number,
};

export type GetHistory1hQuery = {
  getHistory1h:  Array< {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null > | null,
};

export type PutSnapshotMutationVariables = {
  id: string,
  ut: number,
  low24: number,
  high24: number,
  open24: number,
  volume24: number,
  changepct24: number,
};

export type PutSnapshotMutation = {
  putSnapshot:  {
    id: string,
    ut: number,
    low24: number,
    high24: number,
    open24: number,
    volume24: number,
    changepct24: number,
  } | null,
};

export type PutHistory1mMutationVariables = {
  id: string,
  ut: number,
  low: number,
  high: number,
  open: number,
  close: number,
  volume: number,
};

export type PutHistory1mMutation = {
  putHistory1m:  {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};

export type PutHistory1hMutationVariables = {
  id: string,
  ut: number,
  low: number,
  high: number,
  open: number,
  close: number,
  volume: number,
};

export type PutHistory1hMutation = {
  putHistory1h:  {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};

export type SubscribeAllSnapshotSubscription = {
  subscribeAllSnapshot:  {
    id: string,
    ut: number,
    price: number,
    low24: number,
    high24: number,
    open24: number,
    volume24: number,
    changepct24: number,
  } | null,
};

export type SubscribeSnapshotSubscriptionVariables = {
  id: string,
};

export type SubscribeSnapshotSubscription = {
  subscribeSnapshot:  {
    id: string,
    ut: number,
    price: number,
    low24: number,
    high24: number,
    open24: number,
    volume24: number,
    changepct24: number,
  } | null,
};

export type SubscribeHistory1mSubscriptionVariables = {
  id: string,
};

export type SubscribeHistory1mSubscription = {
  subscribeHistory1m:  {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};

export type SubscribeHistory1hSubscriptionVariables = {
  id: string,
};

export type SubscribeHistory1hSubscription = {
  subscribeHistory1h:  {
    id: string,
    ut: number,
    low: number,
    high: number,
    open: number,
    close: number,
    volume: number,
  } | null,
};
