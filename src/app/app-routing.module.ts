import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PostComponent} from './components/post/post.component';
import {LoginComponent} from './components/account/login/login.component';
import {RegisterComponent} from './components/account/register/register.component';

import {NewPostModalComponent} from './components/new-post-modal/new-post-modal.component';

export const routes: Routes = [
  // tslint:disable-next-line:max-line-length
  {path: '', component: HomeComponent, /*canActivate: [AuthGuard]*/}, // TODO: canActivate here only for demo. Add it to every protected route
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
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
