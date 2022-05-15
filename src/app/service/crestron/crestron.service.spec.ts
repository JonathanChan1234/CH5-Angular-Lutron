import { TestBed } from '@angular/core/testing';

import { CrestronService } from './crestron.service';

describe('CrestronService', () => {
  let service: CrestronService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrestronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
