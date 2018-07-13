import { TestBed, inject } from '@angular/core/testing';

import { TrdgePageStateService } from './trade-page-state.service';

describe('TragePageStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TragePageStateService]
    });
  });

  it('should be created', inject([TragePageStateService], (service: TragePageStateService) => {
    expect(service).toBeTruthy();
  }));
});
