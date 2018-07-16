import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletWithdrawComponent } from './wallet-withdraw.component';

describe('WalletWithdrawComponent', () => {
  let component: WalletWithdrawComponent;
  let fixture: ComponentFixture<WalletWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
