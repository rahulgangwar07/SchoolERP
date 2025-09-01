import { TestBed } from '@angular/core/testing';

import { FeeHeaderService } from './fee-header.service';

describe('FeeHeaderService', () => {
  let service: FeeHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
