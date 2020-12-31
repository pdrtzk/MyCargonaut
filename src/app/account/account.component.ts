import {Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';

// import { AccountService } from '@app/_services';



@Component({ templateUrl: 'account.component.html', styleUrls: ['account.component.css'] })
export class AccountComponent {
  public login;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) private data
    // private accountService: AccountService
  ) {
    this.login = data.login;
    // redirect to home if already logged in
    /*if ( this.accountService.userValue) {
      this.router.navigate(['/']);
    }*/
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
