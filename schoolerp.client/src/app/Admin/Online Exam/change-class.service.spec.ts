import { TestBed } from '@angular/core/testing';

import {  ChangeClassService } from './change-class.service';

describe('BehaviourSubjectService', () => {
  let service: ChangeClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
