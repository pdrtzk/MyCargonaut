import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRatingComponent } from './components/profileComponents/profile-rating/profile-rating.component';
import { ProfileVehicleComponent } from './components/profileComponents/profile-vehicle/profile-vehicle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarRightComponent,
    ProfileComponent,
    ProfileRatingComponent,
    ProfileVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
