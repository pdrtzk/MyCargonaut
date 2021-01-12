import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AccountService} from '../../services/account.service';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit, OnChanges {
  userLoggedIn = false;
  navbarOpen = false;
  userId: number;
  public active: string;


  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof RouterEvent) {
        // console.log(event.url);
        if (event.url.includes('home') || event.url === '/') {
          this.active = 'home';
        } else if (event.url.includes('login')) {
          this.active = 'login';
        } else if (event.url.includes('register')) {
          this.active = 'register';
        } else if (event.url.includes('profile')) {
          this.active = 'profile';
        } else if (event.url.includes('bookings')) {
          this.active = 'bookings';
        }
      }
    });
  }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.userLoggedIn = !!value);
    this.accountService.isLoggedIn().then();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.router.url);
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  async onLogout() {
    await this.accountService.logout();
  }

  getUserId() {
    this.userId = this.accountService.user.id;
    return this.userId;
  }

  getActiveStyle(route: string) {
    if (route === this.active) {
      console.log('styled: ' + route);
      return {
        color: 'white'
      };
    }
  }
}
