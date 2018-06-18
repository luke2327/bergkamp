import { TestBed, inject } from '@angular/core/testing';

import { SnapshotDataService } from './snapshot-data.service';

describe('SnapshotDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnapshotDataService]
    });
  });

  it('should be created', inject([SnapshotDataService], (service: SnapshotDataService) => {
    expect(service).toBeTruthy();
  }));
});
