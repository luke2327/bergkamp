import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMarketOrderComponent } from './buy-market-order.component';

describe('BuyMarketOrderComponent', () => {
  let component: BuyMarketOrderComponent;
  let fixture: ComponentFixture<BuyMarketOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyMarketOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMarketOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
