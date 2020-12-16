import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth';
import {AppComponent} from './app.component';

export const routes: Routes = [
   {path: '', component: AppComponent, /*canActivate: [AuthGuard]*/},
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
