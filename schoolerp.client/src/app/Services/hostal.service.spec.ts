import { TestBed } from '@angular/core/testing';

import { HostalService } from './hostal.service';

describe('HostalService', () => {
  let service: HostalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
