import { TestBed } from '@angular/core/testing';

import { SmartWatchService } from './smart-watch.service';

describe('SmartWatchService', () => {
  let service: SmartWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
