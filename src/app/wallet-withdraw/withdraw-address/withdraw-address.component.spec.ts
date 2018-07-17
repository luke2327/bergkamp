import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawAddressComponent } from './withdraw-address.component';

describe('WithdrawAddressComponent', () => {
  let component: WithdrawAddressComponent;
  let fixture: ComponentFixture<WithdrawAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
