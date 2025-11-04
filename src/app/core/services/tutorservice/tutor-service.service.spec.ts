import { TestBed } from '@angular/core/testing';

import { TutorServiceService } from './tutor-service.service';

describe('TutorServiceService', () => {
  let service: TutorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
