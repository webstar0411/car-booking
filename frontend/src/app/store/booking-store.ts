import {EntityStore, StoreConfig} from '@datorama/akita';
import {Booking} from '../models/booking';
import {SortDirection} from '@angular/material/sort';
import {Injectable} from '@angular/core';
import {BookingState} from './booking-state';

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'bookings'})
export class BookingStore extends EntityStore<BookingState, Booking> {
  constructor() {
    super(initState());
  }

  loadBookings(bookings: Booking[], areBookingsLoaded: boolean): void {
    this.set(bookings);
    this.update(state => ({
      ...state,
      areBookingsLoaded
    }));
  }

  updateTotalBooking(totalBookings: number): void {
    this.update(state => ({
      ...state,
      totalBookings
    }));
  }

}

const TABLE_DEFAULT_OPTIONS = {
  PAGE_SIZE: 2,
  PAGE_SIZE_OPTIONS: [2, 5, 10],
  SORT_FIELD: 'id',
  SORT_ORDER: 'asc' as SortDirection,
  FILTER: ''
};

const initState = () => {
  return {
    filter: TABLE_DEFAULT_OPTIONS.FILTER,
    sortField: TABLE_DEFAULT_OPTIONS.SORT_FIELD,
    sortDirection: TABLE_DEFAULT_OPTIONS.SORT_ORDER,
    pageNumber: 0,
    pageSize: TABLE_DEFAULT_OPTIONS.PAGE_SIZE,
    areBookingsLoaded: false,
    totalBookings: 0
  };
};
