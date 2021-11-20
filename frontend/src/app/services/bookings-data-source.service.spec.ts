import { TestBed } from '@angular/core/testing';

import { BookingsDataSourceService } from './bookings-data-source.service';

describe('BookingsDataSourceService', () => {
  let service: BookingsDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingsDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
