import { TestBed, inject } from '@angular/core/testing';

import { TymxRouterService } from './tymx-router.service';

describe('TymxRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TymxRouterService]
    });
  });

  it('should be created', inject([TymxRouterService], (service: TymxRouterService) => {
    expect(service).toBeTruthy();
  }));
});
