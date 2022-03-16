import { TestBed } from '@angular/core/testing';

import { GuardAvoidService } from './guard-avoid.service';

describe('GuardAvoidService', () => {
  let service: GuardAvoidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardAvoidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
