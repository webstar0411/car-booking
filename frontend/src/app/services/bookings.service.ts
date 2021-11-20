import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Booking} from '../models/booking';

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


  constructor(private http: HttpClient) {
    super();
  }

  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.forUri('/bookings'), booking);
  }

  getBookings(filter: string, sortField: string, sortDirection: string, pageNumber: number, pageSize: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.forUri('/bookings'), {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortField', sortField)
        .set('sortOrder', sortDirection)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
      responseType: 'json'
    });
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.forUri(`/bookings/${id}`));
  }

  getBookingsCount(): Observable<number> {
    return this.http.get<number>(this.forUri('/bookings/count'));
  }

  update(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(this.forUri(`/bookings/${booking.id}`), booking);
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
}
