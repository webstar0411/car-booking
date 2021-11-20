import {FormBuilder, Validators} from '@angular/forms';
import {BookingsService} from '../../services/bookings.service';
import {UserMsgService} from '../../services/user-msg.service';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';


export class OperationsBooking {

  readonly waypointFormGroup = this.formBuilder.group({
    locality: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
  });

  readonly formGroup = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    asap: [true],
    pickup_time: ['', Validators.required],
    waiting_time: ['', Validators.required],
    number_of_passengers: ['', Validators.required],
    price: ['', Validators.required],
    rating: ['', Validators.required],
    waypoint: this.waypointFormGroup
  });

  bookingAppearance: MatFormFieldAppearance = 'fill';
  waypointAppearance: MatFormFieldAppearance = 'outline';
  // tslint:disable-next-line:variable-name
  readonly _bookingsService: BookingsService;

  constructor(protected formBuilder: FormBuilder,
              protected userMsgService: UserMsgService,
              protected bookingsService: BookingsService) {
    this._bookingsService = bookingsService;
  }

  submit(): void {
    this.formGroup.controls.asap.markAsDirty();
    if (this.formGroup.valid) {
      this.submitToServer();
    }
  }

  resetForm(): void {
  }

  edit(): boolean {
    return false;
  }

  submitToServer(): void {
    const booking = this.formGroup.value;
    booking.pickup_time = this.convertTime(booking.pickup_time);
    this.bookingsService.create(booking)
      .subscribe(
        res => {
          this.userMsgService.ok('Booking saved.');
        },
        err => this.userMsgService.error('Fail to create Booking'),
        () => console.log('HTTP request completed.')
      );
  }

  convertTime(pickupTime: string): number {
    const timeSplit = pickupTime.split(':');
    const date = new Date();
    date.setHours(parseInt(timeSplit[0], 10));
    date.setMinutes(parseInt(timeSplit[1], 10));
    return date.getTime();
  }
}
