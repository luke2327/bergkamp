import { TestBed, inject } from '@angular/core/testing';

import { UserParametersService } from './user-parameters.service';

describe('UserParametersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserParametersService]
    });
  });

  it('should be created', inject([UserParametersService], (service: UserParametersService) => {
    expect(service).toBeTruthy();
  }));
});
