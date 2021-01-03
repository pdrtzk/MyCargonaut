import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginComponent} from '../components/account/login/login.component';
import {Cargonaut} from '../../shared/cargonaut.model';
import {switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AppComponent} from '../app.component';
import {AccountComponent} from '../components/account/account.component';
import {AccountService} from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(readonly accountService: AccountService, private router: Router, private dialog: MatDialog) {
  }

  /** Returns true whenever the user is authenticated */
  get authenticated() {
    return !!this.accountService.user;
  }

  /** Returns the current authenticated user id */
  get userId() {
    return this.accountService.user.id;
  }

  // Implements single route user authentication guarding
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // TODO: Hintergrund "verstecken", wenn noch nicht angemeldet...
    // TODO: Nach Logout direkt wieder zu Home zurück
    const user = this.accountService.user;
    console.log('can activate logged in? ' + !!user);
    if (user) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url

    // this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    console.log('auth guard opens pop up on: ' + state.url);
    const dialogRef = AccountComponent.openDialog(this.dialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed: ' + result);
      this.router.navigate([state.url]).then();
    });
    return false;

  }
}
