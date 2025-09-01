import { TestBed } from '@angular/core/testing';

import { MarksSettingsService } from './marks-settings.service';

describe('MarksSettingsService', () => {
  let service: MarksSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarksSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
