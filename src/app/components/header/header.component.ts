import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AccountComponent} from '../../account/account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  userLoggedIn = false; // todo: get actual login status in ngOnInit
  navbarOpen = false;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  openLoginDialog(login = true): void {
    console.log('hellooooo from header');
    const dialogRef = AccountComponent.openDialog(this.dialog, login);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // only if login  was succesful
      if (result) {
        this.userLoggedIn = true;
      } else {
      }
    });
  }

}
