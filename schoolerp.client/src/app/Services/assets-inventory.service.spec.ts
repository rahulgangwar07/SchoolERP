import { TestBed } from '@angular/core/testing';

import { AssetsInventoryService } from './assets-inventory.service';

describe('AssetsInventoryService', () => {
  let service: AssetsInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
