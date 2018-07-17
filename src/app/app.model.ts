//view 모델의 필요성이 생김
//여러개의 모델류 결합과정을 거쳐야함

//walletcrypto에서 row model
export class WalletCryptoRowModel {
  id: number;
  name: string;
  abbre: string;
  type: string;
  total: number;
  available: number;
  inOrder: number;
  byBtc: number;
  byUsd: number;
  trade: string[];
  tradeVisible: boolean;
}

//wallet history에서 view model
export class WalletHistoryRowModel {
 id: number;
 name: string;
 abbre: string;
 type: string;
 crypto: number;
 amount: number;
 fee: number;
 counter_addr: string;
 status: string;
 tx: string;
 tx_ts: number;
 ct: any;
 txVisible: boolean;
}
//wallet의 출금 모델
export class WalletWithdrawalModel {
  crypto: number;
  abbre: string = '';
  inputAddr: string = '';
  inputErrorMesage: string = '';
  inputAddrValid: number = 0;
  available: number = 0;
  inputAmount: number = 0;
  inputAmountErrMesage: string = '';
  amountMax: number = 0;
  minimum: number = 0;
  fee: number = 0;
  limit: number = 0;
  isAddressList: boolean = false;
  isAddDialog: boolean = false;
  isValidAmount: boolean = false;
  amountReceived: number = 0;
}
//wallet 출금주소 추가 모델
export class WalletWithDrawalAddrModel {
  crypto: number = 0;
  name: string = '';
  addr: string = '';
  nameErrMsg: string = '';
  addrErrMsg: string = '';
}
