import { TestBed } from '@angular/core/testing';

import { SuccessMessagePopupService } from './success-message-popup.service';

describe('SuccessMessagePopupService', () => {
  let service: SuccessMessagePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessMessagePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
