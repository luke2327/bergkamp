import { TestBed, inject } from '@angular/core/testing';

import { UserRegService } from './user-reg.service';

describe('UserRegService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRegService]
    });
  });

  it('should be created', inject([UserRegService], (service: UserRegService) => {
    expect(service).toBeTruthy();
  }));
});
