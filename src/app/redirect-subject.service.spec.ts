import { TestBed } from '@angular/core/testing';

import { RedirectSubjectService } from './redirect-subject.service';

describe('RedirectSubjectService', () => {
  let service: RedirectSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
