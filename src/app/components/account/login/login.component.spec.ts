import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../app-routing.module';
import {RouterModule} from '@angular/router';
import {MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        HttpClientModule,
        // FormsModule,
        ReactiveFormsModule,
        // AccountRoutingModule,
        // FormsModule,
        MatDialogModule,
        // MatFormFieldModule,
        // MatButtonModule,
        // MatInputModule,
        [RouterTestingModule.withRoutes(routes)]
      ],
      providers: [
        RouterModule,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
        // { provide: UserService, useValue: userServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
