import {inject, InjectionToken} from '@angular/core';
import {BookingQueryService} from './booking-query.service';
import {PaginatorPlugin} from '@datorama/akita';

export const BOOKINGS_PAGINATOR = new InjectionToken('BOOKINGS_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const queryService = inject(BookingQueryService);
    return new PaginatorPlugin(queryService, {startWith: 0});
  }
});
