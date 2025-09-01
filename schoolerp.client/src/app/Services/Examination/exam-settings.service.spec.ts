import { TestBed } from '@angular/core/testing';

import { ExamSettingsService } from './exam-settings.service';

describe('ExamSettingsService', () => {
  let service: ExamSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
