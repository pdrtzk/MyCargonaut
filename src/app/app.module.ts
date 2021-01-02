import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostDisplayCardComponent } from './post/post-display-card/post-display-card.component';
import { StarRatingComponent } from './post/star-rating/star-rating.component';
import {PostVehicleTypeIconComponent} from './post/post-vehicle-type-icon/post-vehicle-type-icon.component';

import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDisplayCardComponent,
    StarRatingComponent,
    PostVehicleTypeIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
