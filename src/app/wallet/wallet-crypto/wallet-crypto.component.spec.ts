import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCryptoComponent } from './wallet-crypto.component';

describe('WalletCryptoComponent', () => {
  let component: WalletCryptoComponent;
  let fixture: ComponentFixture<WalletCryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletCryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
