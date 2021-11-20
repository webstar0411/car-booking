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

  submitToServer(): void {
    this.bookingsService.create(this.formGroup.value)
      .subscribe(
        res => {
          this.formGroup.reset();
          this.userMsgService.ok('Booking saved.');
        },
        err => this.userMsgService.error('Fail to create Booking'),
        () => console.log('HTTP request completed.')
      );
  }
}
