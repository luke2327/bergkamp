import { TestBed, inject } from '@angular/core/testing';

import { PutFavoriteService } from './put-favorite.service';

describe('PutFavoriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PutFavoriteService]
    });
  });

  it('should be created', inject([PutFavoriteService], (service: PutFavoriteService) => {
    expect(service).toBeTruthy();
  }));
});
