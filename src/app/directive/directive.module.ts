import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealTimeColorDirective } from './real-time-color.directive';
import { BidAskButtonDirective } from './bid-ask-button.directive';
import { AskTableHeightDirective } from './ask-table-height.directive';
import { BidTableHeightDirective } from './bid-table-height.directive';
import { ToggleDirective } from './toggle.directive';
//directive 를 공용으로 호출해 사용하기 위한 모듈
//directive는 모두 여기서 선언(declarations에 추가) 하고 export 한다.
//모든 directive는 다른모듈에서쓸때 모듈자체를 import해야 쓸수있군..;;
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    RealTimeColorDirective,
    BidAskButtonDirective,
    AskTableHeightDirective,
    BidTableHeightDirective,
    ToggleDirective
  ],
  declarations: [
    RealTimeColorDirective,
    ToggleDirective,
    BidAskButtonDirective,
    AskTableHeightDirective,
    BidTableHeightDirective
  ]
})
export class DirectiveModule { }
