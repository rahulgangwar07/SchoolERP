import { TestBed } from '@angular/core/testing';

import { ReportcardSeetingsService } from './reportcard-seetings.service';

describe('ReportcardSeetingsService', () => {
  let service: ReportcardSeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportcardSeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
