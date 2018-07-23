import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAddressComponent } from './deposit-address.component';

describe('DepositAddressComponent', () => {
  let component: DepositAddressComponent;
  let fixture: ComponentFixture<DepositAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
