import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostDisplayCardComponent } from './post/post-display-card/post-display-card.component';
import { StarRatingComponent } from './post/star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDisplayCardComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
