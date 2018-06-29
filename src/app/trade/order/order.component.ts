import { Component, OnInit } from '@angular/core';
import { TradePageStateService } from '../../service/trade-page-state.service';
import { OrderHistoryType } from '../../app.const';
import { MatTabChangeEvent } from '@angular/material';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(private tradePageStateService:TradePageStateService) {
    this.tradePageStateService.setHistoryTabState(OrderHistoryType.OpenOrder);
  }

  ngOnInit() {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tradePageStateService.setHistoryTabState(tabChangeEvent.index);
  }
}
