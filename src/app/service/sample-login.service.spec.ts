import { TestBed, inject } from '@angular/core/testing';

import { SampleLoginService } from './sample-login.service';

describe('SampleLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleLoginService]
    });
  });

  it('should be created', inject([SampleLoginService], (service: SampleLoginService) => {
    expect(service).toBeTruthy();
  }));
});
