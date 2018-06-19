import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyLimitOrderComponent } from './buy-limit-order.component';

describe('BuyLimitOrderComponent', () => {
  let component: BuyLimitOrderComponent;
  let fixture: ComponentFixture<BuyLimitOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyLimitOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyLimitOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
