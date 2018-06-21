import { TestBed, inject } from '@angular/core/testing';

import { LangToggleService } from './lang-toggle.service';

describe('LangToggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangToggleService]
    });
  });

  it('should be created', inject([LangToggleService], (service: LangToggleService) => {
    expect(service).toBeTruthy();
  }));
});
