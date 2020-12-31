import {Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';

// import { AccountService } from '@app/_services';



@Component({ templateUrl: 'account.component.html' })
export class AccountComponent {
  public title: string;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public login = true
    // private accountService: AccountService
  ) {
    // redirect to home if already logged in
    /*if ( this.accountService.userValue) {
      this.router.navigate(['/']);
    }*/
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
