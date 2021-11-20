import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Booking} from '../models/booking';
import {BookingStore} from '../store/booking-store';
import {map, tap} from 'rxjs/operators';
import {PaginationResponse} from '@datorama/akita';

class BaseRequests {
  private readonly baseUrl: string = environment.backend.baseURL;

  forUri(uri: string): string {
    return `${this.baseUrl}${uri}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService extends BaseRequests {


  constructor(private http: HttpClient,
              private store: BookingStore) {
    super();
  }

  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.forUri('/bookings'), booking)
      .pipe(
        tap(result => this.store.add(result))
      );
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.forUri(`/bookings/${id}`))
      .pipe(
        tap(result => this.store.update(result))
      );
  }

  getBookingsCount(): Observable<number> {
    return this.http.get<number>(this.forUri('/bookings/count'))
      .pipe(
        tap(result => this.store.updateTotalBooking(result))
      );
  }

  update(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(this.forUri(`/bookings/${booking.id}`), booking)
      .pipe(
        tap(result => this.store.update(result))
      );
  }

  delete(booking: Booking): Observable<any> {
    return this.http.delete<any>(this.forUri(`/bookings/${booking.id}`));
  }

  clone(booking: Booking): Observable<Booking> {
    const reset = {
      id: undefined,
      created_on: undefined,
      modified_on: undefined,
      waypoint: {...booking.waypoint, ...{id: undefined}}
    };
    const clone = {...booking, ...reset};
    // @ts-ignore
    return this.create(clone);
  }


  getBookingsPaginated(metadata: Map<any, any>): Observable<PaginationResponse<Booking[]>> {
    return this.http.get<any>(this.forUri('/bookings'), {
      params: new HttpParams()
        .set('filter', metadata.get('filter'))
        .set('sortField', metadata.get('sortField'))
        .set('sortOrder', metadata.get('sortOrder'))
        .set('pageNumber', metadata.get('pageNumber'))
        .set('pageSize', metadata.get('pageSize')),
      responseType: 'json'
    }).pipe(
      map(result => {
        return {
          total: result.totalElements,
          perPage: result.size,
          currentPage: result.number,
          lastPage: result.totalPages,
          data: result.content
        };
      }),
      tap(result => console.log(result))
    );
  }
}
