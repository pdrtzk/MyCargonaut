import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {BookingPageComponent} from './booking-page/booking-page.component';
import { BookingCardComponent } from './booking-page/booking-card/booking-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingPageComponent,
    BookingCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
