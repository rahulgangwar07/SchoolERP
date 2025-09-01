import { TestBed } from '@angular/core/testing';

import { DownloadFormService } from './download-form.service';

describe('DownloadFormService', () => {
  let service: DownloadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
