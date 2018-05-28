import { TestBed, inject } from '@angular/core/testing';

import { AllSnapshotService } from './all-snapshot.service';

describe('AllSnapshotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllSnapshotService]
    });
  });

  it('should be created', inject([AllSnapshotService], (service: AllSnapshotService) => {
    expect(service).toBeTruthy();
  }));
});
