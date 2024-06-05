import { TestBed } from '@angular/core/testing';

import { CartapService } from './cartap.service';

describe('CartapService', () => {
  let service: CartapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
