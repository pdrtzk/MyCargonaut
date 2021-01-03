import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PostComponent} from './components/post/post.component';


export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]}, // TODO: canActivate here only for demo. Add it to every protected route
  {path: 'profile', component: ProfileComponent},
  {path: 'post', component: PostComponent /* todo add post id param */},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
