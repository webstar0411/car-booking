import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserMsgService {

  constructor(private snackBar: MatSnackBar) {
  }

  error(message: string): void {
    this.snackBar.open(message, 'Error', {
      duration: 5000,
    });
  }

  ok(message: string): void {
    this.snackBar.open(message, 'Success', {
      duration: 5000,
    });
  }
}
