import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletWithdrawalModel, WalletWithDrawalAddrModel } from '../../../app/app.model';
import { WalletDataService } from '../../rest-api/service/wallet-data.service';
import { WalletService } from '../../rest-api/service/wallet.service';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-withdraw-address',
  templateUrl: './withdraw-address.component.html',
  styleUrls: ['./withdraw-address.component.sass']
})
//wallet 출금및 출금주소관련 다이얼로그 처리
//두개의 데이터를 서로 주고받기 빡세므로
//한군데서 그냥 처리해버리자
//쫌 복잡하긴할듯
export class WithdrawAddressComponent extends CommonSubComponent implements OnInit, AfterViewInit {

  cryptoName: string;
  subscribeId: any;
  cryptoInfo: any;
  viewModel: WalletWithdrawalModel;
  addrListModel: Array<WalletWithDrawalAddrModel>;
  addrDialogModel: WalletWithDrawalAddrModel;

  constructor(private walletDataService: WalletDataService,
    private walletService: WalletService,
    private route: ActivatedRoute,
    public compStateService: CompStateService) {
      super(compStateService);
      this.viewModel = new WalletWithdrawalModel();
      this.addrListModel = [];
    }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
  startComponent() {
    this.subscribeId = this.route.params.subscribe(params => {
      this.cryptoName = params['id'].toUpperCase();
      let cryptos = JSON.parse(localStorage.getItem("info")).cryptos;
      for(let entry of cryptos) {
        if(this.cryptoName == entry.abbre) {
          this.cryptoInfo = entry;
          break;
        }
      }
      this.viewModel.crypto = this.cryptoInfo.id;
      this.viewModel.abbre = this.cryptoInfo.abbre;
      this.viewModel.fee = this.cryptoInfo.basic_fee;
      this.viewModel.minimum = this.cryptoInfo.minimum;
      this.walletService.getBalanceCrypto(this.cryptoInfo.id);
    });
    this.walletDataService.getBalanceCryptoSub.subscribe(data => {

      if(data.body.balance!=null && data.body.balance.length>0) {

        let balance = data.body.balance[0];
        this.viewModel.amountMax = balance.amount;
        //TODO 일단 최대인출한도가 어떤의미인지 확실치 않으므로
        //이렇게 세팅해두자.
        this.viewModel.limit = balance.amount;
      }
    });
    this.walletDataService.getAddrFavCryptoSub.subscribe(data => {

      this.addrListModel = [];
      let addrs = data.body.address;

      for(let entry of addrs) {
        let model: WalletWithDrawalAddrModel = new WalletWithDrawalAddrModel();
        model.crypto = entry.crypto;
        model.name = entry.name;
        model.addr = entry.address;
        this.addrListModel.push(model);
      }
    });
    this.walletDataService.postAddrFavCryptoSub.subscribe(data => {
      console.log(data);
    });

    this.walletDataService.postWithdrawalCryptoSub.subscribe(data => {
      //창을 리셋해주고 정보를 갱신한다.
      //TODO 약간 중복류 코든데 적당히 state를 만들까 말까?
      this.viewModel = new WalletWithdrawalModel();
      this.viewModel.crypto = this.cryptoInfo.id;
      this.viewModel.abbre = this.cryptoInfo.abbre;
      this.viewModel.fee = this.cryptoInfo.basic_fee;
      this.viewModel.minimum = this.cryptoInfo.minimum;
      this.walletService.getBalanceCrypto(this.cryptoInfo.id);
    });
  }
  //출금처리
  //1. 유효성을 체크한후
  //2. rest-api를 호출한다.
  //TODO 점검하는 로직이 깔끔하지 않다..언젠가 수정각
  //TODO 일단 string으로 박아두고 언어팩 정리할때 깔끔하게 처리하자.(html이 아닌 javascript에서 어떻게 처리하는지 잘 모름)
  withDrawal() {
    //1. 주소입력이 없다
    if(this.viewModel.inputAddr == '') {
      this.viewModel.inputAddrValid = 1;
      this.viewModel.inputErrorMesage = 'Please input withdrawal address';
      this.viewModel.inputAddr = '';
      return;
    }
    //2. 주소창 유효성이 검증되지않음
    if(!this.validBase58(this.viewModel.inputAddr)) {
      this.viewModel.inputAddrValid = 2;
      this.viewModel.inputErrorMesage = 'Address VarificationFailed';
      this.viewModel.inputAddr = '';
      return;
    }
    //수량이 한도에 맞지않음
    if(this.viewModel.inputAmount > this.viewModel.amountMax) {
      this.viewModel.isValidAmount = true;
      this.viewModel.inputAmountErrMesage = 'Over your available balance';
      return;
    }

    if(this.viewModel.inputAmount > this.viewModel.limit) {
      this.viewModel.isValidAmount = true;
      this.viewModel.inputAmountErrMesage = 'Over your available limit';
      return;
    }
    if(this.viewModel.inputAmount < this.viewModel.minimum) {
      this.viewModel.isValidAmount = true;
      this.viewModel.inputAmountErrMesage = 'Below the minimum withdrawal';
      return;
    }
    let reqBody = {
      'to_addr' : this.viewModel.inputAddr,
      'fee' : this.viewModel.fee,
      'amount' : this.viewModel.inputAmount
    }
    this.walletService.postWithdrawalCrypto(reqBody, this.cryptoInfo.id);
  }

  validBase58(data: any): boolean {
    let pattern=new RegExp("^[a-km-zA-HJ-NP-Z1-9]{20,50}$");
    return pattern.test(data);
  }
  //주소를 가져오기
  getAddrs() {
    this.viewModel.isAddressList = !this.viewModel.isAddressList;
    this.walletService.getAddrFavCrypto(this.cryptoInfo.id);
  }
  //주소를 view 모델에 셋
  setAddr(data: any) {
    this.viewModel.isAddressList = false;
    this.viewModel.inputAddr = data;
  }
  //주소추가 dialog
  addAddrDialog() {
    this.addrDialogModel = new WalletWithDrawalAddrModel();
    this.viewModel.isAddressList = false;
    this.viewModel.isAddDialog = true;
  }
  //주소록 추가 cancel시
  addAddrCancel() {
    this.viewModel.isAddDialog = false;
  }

  //주소록 추가시
  addAddrConfirm() {
    console.log("this");
    if(this.addrDialogModel.name == '') {
      this.addrDialogModel.name = '';
      this.addrDialogModel.nameErrMsg = 'Required';
      return;
    }

    if(this.addrDialogModel.addr == '') {
      this.addrDialogModel.addr = '';
      this.addrDialogModel.addrErrMsg = 'Please input withdrawal address';
      return;
    }

    if(!this.validBase58(this.addrDialogModel.addr)) {
      this.addrDialogModel.addr = '';
      this.addrDialogModel.addrErrMsg = 'Address Varification Failed';
      return;
    }

    this.viewModel.isAddDialog = false;
    let reqBody = {
      'name': this.addrDialogModel.name,
      'address': this.addrDialogModel.addr
    }
    this.walletService.postAddrFavCrypto(reqBody, this.cryptoInfo.id);
  }

  amountMax() {
    //TODO 최대출금한도가 아직 확실하지 않으므로 대충 처리한다.
    this.viewModel.inputAmount = Math.min(this.viewModel.amountMax, this.viewModel.limit);
  }

  amountReceived(): number {
    return Math.max(this.viewModel.inputAmount - this.viewModel.fee ,0)
  }

  inputAmount(event: KeyboardEvent) {
    // (<HTMLInputElement>event.target).value;
    this.viewModel.amountReceived =  Math.max(this.viewModel.inputAmount - this.viewModel.fee ,0);
    this.viewModel.isValidAmount = false;
  }
}
