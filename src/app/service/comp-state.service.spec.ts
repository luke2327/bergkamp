import { TestBed, inject } from '@angular/core/testing';

import { CompStateService } from './comp-state.service';

describe('CompStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompStateService]
    });
  });

  it('should be created', inject([CompStateService], (service: CompStateService) => {
    expect(service).toBeTruthy();
  }));
});
