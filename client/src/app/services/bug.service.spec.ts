import { TestBed, inject } from '@angular/core/testing';

import { BugService } from './bug.service';

describe('BugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BugService]
    });
  });

  it('should be created', inject([BugService], (service: BugService) => {
    expect(service).toBeTruthy();
  }));
});
