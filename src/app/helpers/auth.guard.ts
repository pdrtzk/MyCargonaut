import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AccountService} from '../services/account.service';
import {AlertService} from '../components/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(readonly accountService: AccountService, private router: Router, private alertService: AlertService) {
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
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    await this.accountService.isLoggedIn();
    const user = this.accountService.user;

    if (user) {
      // authorised so return true
      return true;
    } else {

      // not logged in so redirect to login page with the return url});
      await this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}, replaceUrl: true});
      this.router.navigate([], {replaceUrl: true});
      this.alertService.info('Bitte melden Sie sich vorher an.');
      return false;
    }
  }
}
