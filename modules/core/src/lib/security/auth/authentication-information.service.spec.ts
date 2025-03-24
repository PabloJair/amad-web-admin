import { TestBed } from '@angular/core/testing';
import { AuthenticationInformationService } from './authentication-information.service';

describe('AuthenticationService', () => {
  let service: AuthenticationInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
