import { TestBed } from '@angular/core/testing';

import { PromoteDemoteClassService } from './promote-demote-class.service';

describe('PromoteDemoteClassService', () => {
  let service: PromoteDemoteClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoteDemoteClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
