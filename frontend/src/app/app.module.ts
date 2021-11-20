import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FooterComponent} from './components/footer/footer.component';
import {BookingsComponent} from './components/bookings/bookings.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HomePageComponent} from './components/home-page/home-page.component';
import {AddBookingComponent} from './components/add-booking/add-booking.component';
import {HeaderNavbarComponent} from './components/header-navbar/header-navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditBookingComponent} from './components/add-booking/edit-booking.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {RestAmqInterceptor} from './interceptors/rest-amq.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BookingsComponent,
    HomePageComponent,
    AddBookingComponent,
    HeaderNavbarComponent,
    EditBookingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    FlexModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ],
  providers: [MatSnackBar, {provide: HTTP_INTERCEPTORS, useClass: RestAmqInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
