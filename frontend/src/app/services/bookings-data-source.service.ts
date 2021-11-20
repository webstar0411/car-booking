import {Injectable} from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Booking} from '../models/booking';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {BookingsService} from './bookings.service';
import {catchError, finalize} from 'rxjs/operators';

@Injectable()
export class BookingsDataSourceService implements DataSource<Booking> {
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  private bookings$ = new BehaviorSubject<Booking[]>([]);

  constructor(private bookingsService: BookingsService) {
  }

  load(filter: string, sortDirection: string, pageIndex: number, pageSize: number): void {
    this.loading$.next(true);
    this.bookingsService.getBookings(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loading$.next(false))
      ).subscribe(dta => this.bookings$.next(dta));
  }

  connect(collectionViewer: CollectionViewer): Observable<Booking[] | ReadonlyArray<Booking>> {
    console.log('Connecting data source');
    return this.bookings$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('Disconnecting data source');
    this.bookings$.complete();
    this.loading$.complete();
  }
}
