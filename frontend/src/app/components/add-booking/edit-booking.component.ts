import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserMsgService} from '../../services/user-msg.service';
import {BookingsService} from '../../services/bookings.service';
import {OperationsBooking} from './operations-booking';
import {ActivatedRoute} from '@angular/router';
import {Booking} from '../../models/booking';

@Component({
  selector: 'cars-edit-booking',
  templateUrl: './operations-booking.html',
  styleUrls: ['./operations-booking.scss']
})
export class EditBookingComponent extends OperationsBooking implements OnInit {
  private id: number;
  private original: any;

  constructor(protected formBuilder: FormBuilder,
              protected userMsgService: UserMsgService,
              protected bookingsService: BookingsService,
              private route: ActivatedRoute) {
    super(formBuilder, userMsgService, bookingsService);
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string, 10);
  }

  ngOnInit(): void {
    this._bookingsService.getBooking(this.id)
      .subscribe(
        (res) => {
          this.original = res;
          this.formGroup.patchValue(res);
        },
        err => this.userMsgService.error('Fail to retrieve booking'),
        () => console.log('HTTP request completed.')
      );
  }

  submitToServer(): void {
    const booking: Booking = this.formGroup.value;
    booking.id = this.id;
    booking.waypoint.id = this.id;
    this.bookingsService.update(booking)
      .subscribe(
        res => {
          this.formGroup.reset();
          this.userMsgService.ok('Booking saved.');
        },
        err => this.userMsgService.error('Fail to update Booking'),
        () => console.log('HTTP request completed.')
      );
  }

  public resetForm(): void {
    this.formGroup.patchValue(this.original);
  }

}
