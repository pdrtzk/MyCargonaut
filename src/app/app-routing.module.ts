import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PostComponent} from './components/post/post.component';


export const routes: Routes = [
  // tslint:disable-next-line:max-line-length
  {path: '', component: HomeComponent, /*canActivate: [AuthGuard]*/}, // TODO: canActivate here only for demo. Add it to every protected route
  {path: 'profile', component: ProfileComponent},
  {path: 'post/:id', component: PostComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
