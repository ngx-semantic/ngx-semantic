import { TestBed } from '@angular/core/testing';

import { NgxSemanticService } from './ngx-semantic.service';

describe('NgxSemanticService', () => {
  let service: NgxSemanticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSemanticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
