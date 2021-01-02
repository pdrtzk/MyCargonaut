import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css']
})
export class SidebarRightComponent implements OnInit {
  userLoggedIn = true; // todo: get actual login status in ngOnInit

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.userLoggedIn = !! value);
  }

  async onLogout() {
    console.log('onLogout');
    await this.accountService.logout().then(() => this.userLoggedIn = false);
  }

}
