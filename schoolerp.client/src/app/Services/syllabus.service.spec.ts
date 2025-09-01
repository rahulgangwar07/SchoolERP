import { TestBed } from '@angular/core/testing';

import { SyllabusServiceService } from './syllabus.service';

describe('SyllabusServiceService', () => {
  let service: SyllabusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyllabusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
