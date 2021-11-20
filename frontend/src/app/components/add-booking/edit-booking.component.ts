import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserMsgService} from '../../services/user-msg.service';
import {BookingsService} from '../../services/bookings.service';
import {OperationsBooking} from './operations-booking';
import {ActivatedRoute, Router} from '@angular/router';
import {Booking} from '../../models/booking';
import {DateToTimepickerPipe} from '../../pipes/date-to-timepicker.pipe';

@Component({
  selector: 'cars-edit-booking',
  templateUrl: './operations-booking.html',
  styleUrls: ['./operations-booking.scss']
})
export class EditBookingComponent extends OperationsBooking implements OnInit {
  private id: number;
  private original: any;
  private isDeleted = false;

  constructor(protected formBuilder: FormBuilder,
              protected userMsgService: UserMsgService,
              protected bookingsService: BookingsService,
              private route: ActivatedRoute,
              private router: Router) {
    super(formBuilder, userMsgService, bookingsService);
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
  }

  ngOnInit(): void {
    this._bookingsService.getBooking(this.id)
      .subscribe(
        (res) => {
          res.pickup_time = new DateToTimepickerPipe().transform(res.pickup_time);
          this.original = res;
          this.formGroup.patchValue(this.original);
        },
        err => this.userMsgService.error('Fail to retrieve booking'),
        () => console.log('HTTP request completed.')
      );
  }

  submitToServer(): void {
    const booking: Booking = {...this.original, ...this.formGroup.value};
    booking.pickup_time = this.convertTime(booking.pickup_time).toString();
    booking.waypoint.id = this.original.waypoint.id;
    this.bookingsService.update(booking)
      .subscribe(
        res => {
          this.userMsgService.ok('Booking updated.');
          res.pickup_time = new DateToTimepickerPipe().transform(res.pickup_time);
        },
        err => this.userMsgService.error('Fail to update Booking'),
        () => console.log('HTTP request completed.')
      );
  }

  public resetForm(): void {
    this.formGroup.patchValue(this.original);
    this.userMsgService.ok('Booking original data has been restored.');
  }

  edit(): boolean {
    return true;
  }


  delete(): void {
    this.bookingsService.delete(this.original).subscribe(
      res => {
        this.userMsgService.ok('Booking deleted.');
        this.router.navigate(['/bookings']);
      },
      err => this.userMsgService.error('Fail to delete Booking'),
      () => console.log('HTTP request completed.')
    );
  }

  clone(): void {
    const reset = {
      id: undefined,
      created_on: undefined,
      modified_on: undefined,
      pickup_time: this.convertTime(this.original.pickup_time).toString(),
      waypoint: {...this.original.waypoint, ...{id: undefined}}
    };
    const clone = {...this.original, ...reset};
    this.bookingsService.create(clone).subscribe(
      res => this.userMsgService.ok('Booking cloned,with success.'),
      err => this.userMsgService.error('Fail to clone Booking'),
      () => console.log('HTTP request completed.')
    );
  }
}
