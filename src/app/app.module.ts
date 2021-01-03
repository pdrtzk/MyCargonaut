import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {SidebarRightComponent} from './components/sidebar-right/sidebar-right.component';
import {AlertComponent} from './components/alert/alert.component';
import {AccountComponent} from './components/account/account.component';
import {LoginComponent} from './components/account/login/login.component';
import {RegisterComponent} from './components/account/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRatingComponent } from './components/profileComponents/profile-rating/profile-rating.component';
import { ProfileVehicleComponent } from './components/profileComponents/profile-vehicle/profile-vehicle.component';
import { AddVehicleComponent } from './components/profileComponents/add-vehicle/add-vehicle.component';
import { EditProfileComponent } from './components/profileComponents/edit-profile/edit-profile.component';

import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';

import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AlertComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarRightComponent,
    ProfileComponent,
    ProfileRatingComponent,
    ProfileVehicleComponent,
    AddVehicleComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
