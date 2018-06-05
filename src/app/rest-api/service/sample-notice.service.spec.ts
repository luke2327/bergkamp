import { TestBed, inject } from '@angular/core/testing';

import { SampleNoticeService } from './sample-notice.service';

describe('SampleNoticeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleNoticeService]
    });
  });

  it('should be created', inject([SampleNoticeService], (service: SampleNoticeService) => {
    expect(service).toBeTruthy();
  }));
});
