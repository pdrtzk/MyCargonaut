import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {AccountService} from '../../services/account.service';

// import { AccountService } from '@app/_services';


@Component({templateUrl: 'account.component.html', styleUrls: ['account.component.css']})
export class AccountComponent {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private accountService: AccountService
  ) {
    this.login = data.login;
    // redirect to home if already logged in
    /*if ( this.accountService.userValue) {
      this.router.navigate(['/']);
    }*/
  }

  public login;

  static openDialog(dialog: MatDialog, login = true): MatDialogRef<AccountComponent> {
    return dialog.open(AccountComponent, {
      width: '400px',
      data: {login}
    });
  }

  onCloseDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }
}
