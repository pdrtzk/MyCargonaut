import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

// import { AccountService, AlertService } from '@app/_services';
import {AlertService} from 'src/app/components/alert/alert.service';
import {AccountService} from '../../../services/account.service';

@Component({templateUrl: 'register.component.html', selector: 'app-register', styleUrls: ['../account.css']})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required], // Validators.pattern('([1-9]|0[1-9]|1[0-9]|2[0-9]|3[01])\\.([1-9]|0[1-9]|1[012])\\.[0-9]{4})')
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      account_holder: [''],
      iban: ['', [
        Validators.required, Validators.minLength(22),
        Validators.pattern('DE[ ]*[0-9]{2}[ ]*[0-9]{4}[ ]*[0-9]{4}[ ]*[0-9]{4}[ ]*[0-9]{4}[ ]*[0-9]{2}[ ]*')
      ]],
      bic: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      consent: [false, Validators.requiredTrue]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;


    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value).then(
      () => {
        this.alertService.success('Registrierung erfolgreich. Sie können sich nun anmelden.', {keepAfterRouteChange: true});
        this.router.navigate(['/login']).then();
      },
      error => {
        // TODO: Fehler für Benutzer verständlich ausgeben
        this.alertService.error(error.message);
        this.loading = false;
      });
  }
}
