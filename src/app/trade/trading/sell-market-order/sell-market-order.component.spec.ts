import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellMarketOrderComponent } from './sell-market-order.component';

describe('SellMarketOrderComponent', () => {
  let component: SellMarketOrderComponent;
  let fixture: ComponentFixture<SellMarketOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellMarketOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellMarketOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
