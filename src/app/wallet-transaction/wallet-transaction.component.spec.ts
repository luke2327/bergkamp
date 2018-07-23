import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTransactionComponent } from './wallet-transaction.component';

describe('WalletTransactionComponent', () => {
  let component: WalletTransactionComponent;
  let fixture: ComponentFixture<WalletTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
