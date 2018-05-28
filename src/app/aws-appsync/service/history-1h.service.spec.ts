import { TestBed, inject } from '@angular/core/testing';

import { History1hService } from './history-1h.service';

describe('History1hService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [History1hService]
    });
  });

  it('should be created', inject([History1hService], (service: History1hService) => {
    expect(service).toBeTruthy();
  }));
});
