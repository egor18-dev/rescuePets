import { TestBed } from '@angular/core/testing';

import { AuthSessionServiceService } from './auth-session-service.service';

describe('AuthSessionServiceService', () => {
  let service: AuthSessionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSessionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
