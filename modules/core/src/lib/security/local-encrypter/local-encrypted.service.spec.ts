import { TestBed } from '@angular/core/testing';

import { LocalEncryptedService } from './local-encrypted.service';

describe('LocalEncryptedService', () => {
  let service: LocalEncryptedService;
  const KEY_TEST = 'KEY_TEST';
  const VALUE_JSON = {
    name: 'test',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalEncryptedService);
  });

  it('set item Encrypted', () => {
    service.setValue(KEY_TEST, VALUE_JSON);
    expect(service.getValue(KEY_TEST)).toEqual(VALUE_JSON);
  });

  beforeEach(() => {
    service.setValue(KEY_TEST, VALUE_JSON);
  });
  it('get item Encrypted', () => {
    expect(service.getValue(KEY_TEST)).toEqual(VALUE_JSON);
  });

  it('clear items', () => {
    service.clearToken();
    expect(service.count()).toEqual(0);
  });
});
