import { TestBed } from '@angular/core/testing';

import { AssiguserconfigurationService } from './assiguserconfiguration.service';

describe('AssiguserconfigurationService', () => {
  let service: AssiguserconfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssiguserconfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
