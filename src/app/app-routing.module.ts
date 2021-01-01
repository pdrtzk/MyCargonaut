import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './auth';
import {AppComponent} from './app.component';
import {ProfileComponent} from './components/profile/profile.component';

export const routes: Routes = [
   {path: '', component: HomeComponent, /*canActivate: [AuthGuard]*/},
   {path: 'profile', component: ProfileComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
