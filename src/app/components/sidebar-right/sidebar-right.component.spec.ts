import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SidebarRightComponent } from './sidebar-right.component';
import {AccountService} from '../../services/account.service';
import {HttpClientModule} from '@angular/common/http';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {of, Subject} from 'rxjs';
import {RouterModule, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeComponent} from '../home/home.component';



describe('SidebarRightComponent', () => {
  let component: SidebarRightComponent;
  let fixture: ComponentFixture<SidebarRightComponent>;


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
  ];

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ SidebarRightComponent ],
      imports: [HttpClientModule,  RouterTestingModule.withRoutes(routes)],
      providers: [
        {provide: AccountService, useValue: accountServiceStub},
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRightComponent);
    component = fixture.componentInstance;
    component.userLoggedIn = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when not logged-in the logout-button should not be rendered', fakeAsync (() => {
    component.userLoggedIn = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#logout-button')).toBeNull();
  }));

  it('clicking on #logout-button, onLogout should be called', fakeAsync (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const spy = spyOn(component, 'onLogout');
    const button = compiled.querySelector('#logout-button');
    button.click();
    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));
});
