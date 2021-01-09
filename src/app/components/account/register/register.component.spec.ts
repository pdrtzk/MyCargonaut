import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

import {Location} from '@angular/common';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let location: Location;
  let correctData;
  let incorrectData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        [RouterTestingModule.withRoutes(routes)]
      ],
      providers: [
        // { provide: UserService, useValue: userServiceStub }
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    // both needs to be set in beforeEach, in beforeAll or in describe or global does NOT work sometimes!
    correctData = {
      firstname: 'Firstname',
      lastname: 'Lastname',
      birthday: '01-01-0000',
      email: 'firstname@lastname.com',
      password: '123456',
      account_holder: 'Account Holder', // does not matter, no Validator
      iban: 'DE12 3456 7890 1234 5678 90',
      bic: 'A1234567890',
      consent: true
    };
    incorrectData = {
      firstname: '', // empty
      lastname: '', // empty
      birthday: null, // empty
      email: 'email', // no email pattern
      password: '12345', // not min 6 chars long
      account_holder: null, // does not matter, no Validator
      iban: 'AB12 3456 7890 1234 5678 90', // no DE at beginning
      bic: '1234567890', // not 11 chars long
      consent: false // must be checked (true)
    };
  });

  beforeEach(async () => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(RegisterComponent);
    fixture.ngZone.run(() => router.initialNavigation());
    await fixture.ngZone.run(async () => await router.navigateByUrl('/register'));
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    component.form.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /login if #login link is clicked.', fakeAsync(() => {
    expect(location.path()).toBe('/register');
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('#login');
    button.click();
    tick();
    // fixture.detectChanges();
    expect(location.path()).toBe('/login');
  }));

  it('should call onSubmit() if #submit button is clicked.', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onSubmit');
    const button = compiled.querySelector('#submit');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
    // expect(component.submitted).toBeTrue();
  }));

  it('should return form.controls if getter f is called.', () => {
    expect(component.f).toEqual(component.form.controls);
  });

  it('should set form invalid if no input is provided.', () => {
    component.form.reset();
    expect(component.form.invalid).toBeTrue();
    expect(component.form.valid).toBeFalse();
  });

  it('should set form valid if all input is provided.', () => {
    component.form.reset(correctData); // is correct if run alone, fails sometimes if not (but whyyy?)
    console.log(component.form.value);
    console.log(correctData);
    expect(component.form.invalid).toBeFalse();
    expect(component.form.valid).toBeTrue();
  });

  it('should set form invalid if #consent is not checked.', () => {
    const data = correctData;
    data.consent = false;
    component.form.reset(data);
    expect(component.form.invalid).toBeTrue();
    expect(component.form.valid).toBeFalse();
  });

  it('should set form invalid if only wrong input is provided.', () => {
    component.form.reset(incorrectData);
    expect(component.form.invalid).toBeTrue();
    expect(component.form.valid).toBeFalse();
  });

  it('should set form invalid if some wrong input is provided.', () => {
    // Incorrect email
    let data = correctData;
    data.email = incorrectData.email;
    component.form.reset(data);
    expect(component.form.invalid).toBeTrue();
    expect(component.form.valid).toBeFalse();
    // Incorrect iban
    data = correctData;
    data.iban = incorrectData.iban;
    component.form.reset(data);
    expect(component.form.invalid).toBeTrue();
    expect(component.form.valid).toBeFalse();
  });

});
