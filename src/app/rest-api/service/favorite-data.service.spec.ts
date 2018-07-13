import { TestBed, inject } from '@angular/core/testing';

import { FavoriteDataService } from './favorite-data.service';

describe('FavoriteDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteDataService]
    });
  });

  it('should be created', inject([FavoriteDataService], (service: FavoriteDataService) => {
    expect(service).toBeTruthy();
  }));
});
