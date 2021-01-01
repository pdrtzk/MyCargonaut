import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../app-routing.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        [RouterTestingModule.withRoutes(routes)]
      ],
      providers: [
        RouterModule,
        // { provide: UserService, useValue: userServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
