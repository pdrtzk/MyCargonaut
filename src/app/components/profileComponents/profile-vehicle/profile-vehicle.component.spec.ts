import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVehicleComponent } from './profile-vehicle.component';

describe('ProfileVehicleComponent', () => {
  let component: ProfileVehicleComponent;
  let fixture: ComponentFixture<ProfileVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
