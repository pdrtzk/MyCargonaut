import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {AlertService} from '../../alert/alert.service';
import {AccountService} from '../../../services/account.service';
import {Cargonaut} from '../../../../shared/cargonaut.model';

@Component({templateUrl: 'login.component.html', selector: 'app-login', styleUrls: ['../account.component.css']})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  @Output()
  registerClick: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
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
    await this.accountService.login(this.f.email.value, this.f.password.value).then(
      res => {
        user = res;
        this.loading = false;
        this.alertService.success('Angemeldet.');
        this.closeEvent.emit(true);
      },
      error => {
        /* TODO: Error message für Benutzer verständlich ausgeben + Fehlermeldung im Pop up nicht im Hintergrund */
        this.alertService.error(error);
        this.loading = false;
      });
    console.log('Login: ' + user?.email);
  }

  showRegister() {
    this.registerClick.emit();
  }


}
