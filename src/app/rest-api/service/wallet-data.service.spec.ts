import { TestBed, inject } from '@angular/core/testing';

import { WalletDataService } from './wallet-data.service';

describe('WalletDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletDataService]
    });
  });

  it('should be created', inject([WalletDataService], (service: WalletDataService) => {
    expect(service).toBeTruthy();
  }));
});
