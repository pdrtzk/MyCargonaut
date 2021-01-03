import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {SidebarRightComponent} from './components/sidebar-right/sidebar-right.component';
import {NewPostModalComponent} from './components/new-post-modal/new-post-modal.component';
import {NgbDatepicker, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomePostComponent} from './components/home-post/home-post.component';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarRightComponent,
    NewPostModalComponent,
    HomePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
