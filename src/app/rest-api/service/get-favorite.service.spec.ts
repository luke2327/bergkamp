import { TestBed, inject } from '@angular/core/testing';

import { GetFavoriteService } from './get-favorite.service';

describe('GetFavoriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetFavoriteService]
    });
  });

  it('should be created', inject([GetFavoriteService], (service: GetFavoriteService) => {
    expect(service).toBeTruthy();
  }));
});
