import {Component, OnInit} from '@angular/core';
import {Cargonaut} from '../../shared/cargonaut.model';
import {LoginComponent} from '../account/login/login.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: Cargonaut;

  constructor(/*private accountService: AccountService*/ private dialog: MatDialog) {
    this.user = {firstname: 'Dieter'}; // this.accountService.userValue;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.email = result;
      console.log(result);
    });
  }
}

