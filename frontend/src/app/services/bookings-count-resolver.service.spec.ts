import { TestBed } from '@angular/core/testing';

import { BookingsCountResolver } from './bookings-count-resolver.service';

describe('BookingsCountResolverService', () => {
  let service: BookingsCountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingsCountResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
