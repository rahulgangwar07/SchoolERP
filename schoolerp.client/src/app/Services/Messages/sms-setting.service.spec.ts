import { TestBed } from '@angular/core/testing';

import { SmsSettingService } from './sms-setting.service';

describe('SmsSettingService', () => {
  let service: SmsSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
