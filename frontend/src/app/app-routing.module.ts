import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingsComponent} from './components/bookings/bookings.component';
import {BookingsCountResolver} from './services/bookings-count-resolver.service';
import {HomePageComponent} from './components/home-page/home-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {
    path: 'bookings', component: BookingsComponent,
    resolve: {
      totalBookings: BookingsCountResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
