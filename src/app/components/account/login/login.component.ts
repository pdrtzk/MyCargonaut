import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../alert/alert.service';
import {AccountService} from '../../../services/account.service';
import {Cargonaut} from '../../../../shared/cargonaut.model';

@Component({templateUrl: 'login.component.html', selector: 'app-login', styleUrls: ['../account.css']})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.accountService.isLoggedIn().then(() => {
      if (this.accountService.user) {
        this.router.navigate(['/']).then();
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let user: Cargonaut;
    await this.accountService.login(this.f.email.value.trim(), this.f.password.value).then(
      res => {
        user = res;
        this.loading = false;
        const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        this.router.navigateByUrl(returnUrl, {replaceUrl: true});
        // this.alertService.success('Angemeldet.');
      },
      error => {
        if (error.status === 401 && error.error.message === 'Login information is not correct!') {
          this.alertService.error('Ungültige Anmeldedaten.');
        } else {
          this.alertService.error('Hier ist wohl etwas schief gelaufen');
        }
        this.loading = false;
      });
  }


}
