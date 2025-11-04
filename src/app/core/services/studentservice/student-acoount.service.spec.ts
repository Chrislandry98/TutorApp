import { TestBed } from '@angular/core/testing';

import { StudentAcoountService } from '../../../student-acoount.service';

describe('StudentAcoountService', () => {
  let service: StudentAcoountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAcoountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
