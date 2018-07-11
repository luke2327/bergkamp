import { TestBed, inject } from '@angular/core/testing';

import { InfoDataService } from './info-data.service';

describe('InfoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoDataService]
    });
  });

  it('should be created', inject([InfoDataService], (service: InfoDataService) => {
    expect(service).toBeTruthy();
  }));
});
