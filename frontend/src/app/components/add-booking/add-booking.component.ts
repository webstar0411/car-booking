import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BookingsService} from '../../services/bookings.service';
import {UserMsgService} from '../../services/user-msg.service';
import {OperationsBooking} from './operations-booking';

@Component({
  selector: 'cars-add-booking',
  templateUrl: './operations-booking.html',
  styleUrls: ['./operations-booking.scss']
})
export class AddBookingComponent extends OperationsBooking {


  constructor(protected formBuilder: FormBuilder,
              protected userMsgService: UserMsgService,
              protected bookingsService: BookingsService) {
    super(formBuilder, userMsgService, bookingsService);
  }


}
