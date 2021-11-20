import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BookingsService} from '../../services/bookings.service';
import {UserMsgService} from '../../services/user-msg.service';
import {MatFormFieldAppearance} from '@angular/material/form-field/form-field';

@Component({
  selector: 'cars-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  readonly formGroup = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    asap: [true],
    pickup_time: ['', Validators.required],
    waiting_time: ['', Validators.required],
    number_of_passengers: ['', Validators.required],
    price: ['', Validators.required],
    rating: ['', Validators.required],
    waypoint: this.formBuilder.group({
      locality: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    })

  });
  bookingAppearance: MatFormFieldAppearance = 'fill';
  waypointAppearance: MatFormFieldAppearance = 'outline';

  constructor(private formBuilder: FormBuilder,
              private userMsgService: UserMsgService,
              private bookingsService: BookingsService) {

  }

  submit(): void {
    this.formGroup.controls.asap.markAsDirty();
    if (this.formGroup.valid) {
      this.bookingsService.save(this.formGroup.value)
        .subscribe(
          res => {
            this.formGroup.reset();
            this.userMsgService.ok('Booking saved.');
          },
          err => this.userMsgService.error('Fail to save Booking'),
          () => console.log('HTTP request completed.')
        );
    }
  }

  ngOnInit(): void {

  }
}
