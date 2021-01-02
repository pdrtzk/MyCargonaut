import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVehicleTypeIconComponent } from './post-vehicle-type-icon.component';

describe('PostVehicleTypeIconComponent', () => {
  let component: PostVehicleTypeIconComponent;
  let fixture: ComponentFixture<PostVehicleTypeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostVehicleTypeIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostVehicleTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
