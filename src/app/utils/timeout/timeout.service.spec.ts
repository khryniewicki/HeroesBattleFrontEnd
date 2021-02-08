import { TestBed } from '@angular/core/testing';

import { TimeoutInterceptor } from './timeout-interceptor.service';

describe('TimeoutInterceptor', () => {
  let service: TimeoutInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeoutInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
