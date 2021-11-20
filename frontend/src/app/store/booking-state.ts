import {EntityState} from '@datorama/akita';
import {Booking} from '../models/booking';

export interface BookingState extends EntityState<Booking> {
  filter: string;
  sortField: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  areBookingsLoaded: boolean;
  totalBookings: number;
}
