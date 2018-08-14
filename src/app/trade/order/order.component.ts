import { Component, OnInit } from '@angular/core';
import { TradePageStateService } from '../../service/trade-page-state.service';
import { OrderHistoryType } from '../../app.const';
import { MatTabChangeEvent } from '@angular/material';
import { CommonSubComponent } from '../../common-sub/common-sub.component';
import { CompStateService } from '../../service/comp-state.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent extends CommonSubComponent implements OnInit {

  constructor(
    private tradePageStateService:TradePageStateService,
    public compStateService: CompStateService
  ) {
    super(compStateService);

  }

  ngOnInit() {
  }
  startComponent() {
    this.tradePageStateService.setHistoryTabState(OrderHistoryType.OpenOrder);
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tradePageStateService.setHistoryTabState(tabChangeEvent.index);
  }
}
