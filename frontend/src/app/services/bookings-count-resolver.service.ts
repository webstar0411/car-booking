import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {BookingsService} from './bookings.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingsCountResolver implements Resolve<number> {

  constructor(private bookingsService: BookingsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    return this.bookingsService.getBookingsCount()
      .pipe(
        catchError(_ => of(0))
      );
  }
}
