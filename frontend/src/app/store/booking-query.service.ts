import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {BookingState} from './booking-state';
import {BookingStore} from './booking-store';
import {Booking} from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingQueryService extends QueryEntity<BookingState, Booking> {

  selectAreBookingsLoaded$ = this.select(state => {
    return state.areBookingsLoaded;
  });

  constructor(protected store: BookingStore) {
    super(store);
  }
}
