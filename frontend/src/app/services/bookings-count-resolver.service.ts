import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BookingsService} from './bookings.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsCountResolver implements Resolve<number> {

  constructor(private bookingsService: BookingsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    return this.bookingsService.getBookingsCount();
  }
}
