import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {BookingPageComponent} from './booking-page/booking-page.component';
import { BookingCardComponent } from './booking-page/booking-card/booking-card.component';
import { BookingListComponent } from './booking-page/booking-list/booking-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingPageComponent,
    BookingCardComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
