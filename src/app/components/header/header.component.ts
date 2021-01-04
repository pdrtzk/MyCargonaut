import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AccountComponent} from '../account/account.component';
import {AccountService} from '../../services/account.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  userLoggedIn = false; // todo: get actual login status in ngOnInit
  navbarOpen = false;


  constructor(
    private dialog: MatDialog,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.userLoggedIn = !!value);
    this.accountService.isLoggedIn().then();
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  async onLogout() {
    console.log('onLogout');
    await this.accountService.logout();
  }

}
