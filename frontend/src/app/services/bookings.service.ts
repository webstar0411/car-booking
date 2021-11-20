import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
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

  save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.forUri('/bookings'), booking);
  }

  getBookings(filter: string, sortField: string, sortDirection: string, pageNumber: number , pageSize: number): Observable<Booking[]> {
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

  getBookingsCount(): Observable<number> {
    return this.http.get<number>(this.forUri('/bookings/count'));
  }
}
