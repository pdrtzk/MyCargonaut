import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {AccountService} from '../../services/account.service';
import {HttpClientModule} from '@angular/common/http';
import {Router, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Subject} from 'rxjs';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {Location} from '@angular/common';

const accountServiceStub  = {
  logout(): Promise<void> {
    return new Promise<void>(resolve => resolve());
  },
  isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>(resolve => resolve(true));
  },
  userSubject: new Subject<Cargonaut>()
};

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: HomeComponent},
  {path: 'register', component: HomeComponent},
  {path: 'profile', component: HomeComponent},
  {path: 'bookings', component: HomeComponent},
];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      providers: [ {provide: AccountService, useValue: accountServiceStub}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.userLoggedIn = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if logged in, links to home, bookings and profile should be rendered', () => {
    component.userLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const navlinks = compiled.querySelectorAll('.nav-link'); // should be six elements: 3 for large navbar, 3 for collapsable

    expect(navlinks[0].innerHTML).toEqual('HOME');
    expect(navlinks[1].innerHTML).toEqual('BUCHUNGEN');
    expect(navlinks[2].innerHTML).toEqual('PROFIL');
    expect(navlinks[3].innerHTML).toEqual('HOME');
    expect(navlinks[4].innerHTML).toEqual('BUCHUNGEN');
    expect(navlinks[5].innerHTML).toEqual('PROFIL');
  });

  it('if not logged in, links to home, login and registration should be rendered', () => {
    component.userLoggedIn = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const navlinks = compiled.querySelectorAll('.nav-link'); // should be six elements: 3 for large navbar, 3 for collapsable

    expect(navlinks[0].innerHTML).toEqual('HOME');
    expect(navlinks[1].innerHTML).toEqual('LOGIN');
    expect(navlinks[2].innerHTML).toEqual('REGISTRIEREN');
    expect(navlinks[3].innerHTML).toEqual('HOME');
    expect(navlinks[4].innerHTML).toEqual('LOGIN');
    expect(navlinks[5].innerHTML).toEqual('REGISTRIEREN');
  });

  it('navigate to "login" should lead to /login', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['login']);
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/login');
    });
  }));

  it('navigate to "register" should lead to /register', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['register']);
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/register');
    });
  }));

  it('navigate to "home" should lead to /', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['home']);
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/home');
    });
  }));

  it('navigate to "profile" should lead to /profile', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['profile']);
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/profile');
    });
  }));

  it('navigate to "bookings" should lead to /bookings', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['bookings']);
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/bookings');
    });
  }));

});
