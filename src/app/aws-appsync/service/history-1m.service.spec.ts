import { TestBed, inject } from '@angular/core/testing';

import { History1mService } from './history-1m.service';

describe('History1mService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [History1mService]
    });
  });

  it('should be created', inject([History1mService], (service: History1mService) => {
    expect(service).toBeTruthy();
  }));
});
