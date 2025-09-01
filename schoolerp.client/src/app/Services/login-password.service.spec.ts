import { TestBed } from '@angular/core/testing';

import { LoginPasswordService } from './login-password.service';

describe('LoginPasswordService', () => {
  let service: LoginPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
