import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

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

  getBookings(filter: string, sortDirection: string, pageNumber = 0, pageSize = 2): Observable<any> {
    return this.http.get(this.forUri('/bookings'));
  }

  getBookingsCount(): Observable<number> {
    return this.http.get(this.forUri('/bookings/count'))
      .pipe(map(res => 5));
  }
}
