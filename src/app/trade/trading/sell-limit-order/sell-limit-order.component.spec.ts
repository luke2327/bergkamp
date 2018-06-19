import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellLimitOrderComponent } from './sell-limit-order.component';

describe('SellLimitOrderComponent', () => {
  let component: SellLimitOrderComponent;
  let fixture: ComponentFixture<SellLimitOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellLimitOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellLimitOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
