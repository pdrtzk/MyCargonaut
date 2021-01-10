import {TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Cargonaut} from '../../shared/cargonaut.model';
import {Observable} from 'rxjs';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  const dummyUser: Cargonaut =
    {
      id: 1,
      firstname: 'Firstname',
      lastname: 'Lastname',
      birthday: new Date(Date.parse('01-01-0000')),
      email: 'firstname@lastname.com',
      password: '123456',
      account_holder: 'Account Holder', // does not matter, no Validator
      iban: 'DE12 3456 7890 1234 5678 90',
      bic: 'A1234567890'
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve logged in user', () => {
    service.isLoggedIn().then((res) => {
      expect(res).toBeTrue();
      expect(service.user).toBe(dummyUser);
    });

    const req = httpMock.expectOne(`http://localhost:4200/api/login`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush({user: dummyUser});
  });

  it('should reject if no user logged in', () => {
    service.isLoggedIn().then((res) => {
      expect(res).toBeFalsy();
      expect(service.user).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:4200/api/login`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.error(
      new ErrorEvent('User nicht mehr eingeloggt. Erneut anmelden!'),
      {status: 401}
    );
  });

  it('should resolve if user logs in', () => {
    service.userSubject.subscribe(value => expect(value).toEqual(dummyUser));
    service.login(dummyUser.email, dummyUser.password).then((res) => {
      expect(res).toEqual(dummyUser);
      expect(service.user).toEqual(dummyUser);
    });
    const req = httpMock.expectOne(`http://localhost:4200/api/login`, 'post to api');
    expect(req.request.method).toBe('POST');
    req.flush({user: dummyUser});
  });

  it('should get user if subscribed to userSubject', () => {
    service.userSubject.subscribe(value => expect(value).toEqual(dummyUser));
    service.userSubject.next(dummyUser);
  });

  it('should get user infos of existing user', () => {
    service.get(dummyUser.id).then((res) => {
      expect(res).toBe(dummyUser);
    });

    const req = httpMock.expectOne('http://localhost:4200/api/cargonaut/' + dummyUser.id, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush({user: dummyUser});
  });

  it('should reject get of not existing user', () => {
    service.get(dummyUser.id).then((res) => {
      expect(res).toBeFalsy();
    });

    const req = httpMock.expectOne('http://localhost:4200/api/cargonaut/' + dummyUser.id, 'call to api');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Der User konnte nicht gefunden werden!'), {status: 400});
  });

});
