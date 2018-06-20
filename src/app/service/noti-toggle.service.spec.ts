import { TestBed, inject } from '@angular/core/testing';

import { NotiToggleService } from './noti-toggle.service';

describe('NotiToggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotiToggleService]
    });
  });

  it('should be created', inject([NotiToggleService], (service: NotiToggleService) => {
    expect(service).toBeTruthy();
  }));
});
