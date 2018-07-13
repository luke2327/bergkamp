import { TestBed, inject } from '@angular/core/testing';

import { GeolocationDataService } from './geolocation-data.service';

describe('GeolocationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationDataService]
    });
  });

  it('should be created', inject([GeolocationDataService], (service: GeolocationDataService) => {
    expect(service).toBeTruthy();
  }));
});
