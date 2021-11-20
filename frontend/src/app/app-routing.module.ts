import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingsComponent} from './components/bookings/bookings.component';
import {BookingsCountResolver} from './services/bookings-count-resolver.service';
import {HomePageComponent} from './components/home-page/home-page.component';
import {AddBookingComponent} from './components/add-booking/add-booking.component';
import {EditBookingComponent} from './components/add-booking/edit-booking.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'create', component: AddBookingComponent},
  {
    path: 'bookings', component: BookingsComponent,
    resolve: {
      totalBookings: BookingsCountResolver
    }
  },
  {path: 'bookings/:id/edit', component: EditBookingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
