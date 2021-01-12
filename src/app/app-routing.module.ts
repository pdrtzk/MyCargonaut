import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {BookingPageComponent} from './components/booking-page/booking-page.component';
import {PostComponent} from './components/post/post.component';
import {LoginComponent} from './components/account/login/login.component';
import {RegisterComponent} from './components/account/register/register.component';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import {A} from '@angular/cdk/keycodes';
import {ChatComponent} from './components/chat/chat.component';

import {NewPostModalComponent} from './components/new-post-modal/new-post-modal.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'chats', component: ChatListComponent, canActivate: [AuthGuard]},
  {path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'bookings', component: BookingPageComponent, canActivate: [AuthGuard]},
  {path: 'addpost', component: NewPostModalComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'enabled' })],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
