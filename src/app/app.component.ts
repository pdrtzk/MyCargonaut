import { Component } from '@angular/core';

// import { AccountService } from './_services';
import { Cargonaut } from '../shared/cargonaut.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Cargonaut;

  constructor(/* private accountService: AccountService */) {
    // this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    // this.accountService.logout();
  }
}

