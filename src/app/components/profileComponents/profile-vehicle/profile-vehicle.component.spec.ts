import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ProfileVehicleComponent } from './profile-vehicle.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Vehicle} from '../../../../shared/vehicle.model';
import {VehicleTypeType} from '../../../../shared/vehicle-type.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';

const mockOwnProfile = false;
const mockVehicle: Vehicle = {
  id: 143,
  comment: 'Sehr zuverlässig',
  seats: 4,
  type: {
    description: 'A121',
    type: VehicleTypeType.LKW,
  },
  hold: {
    length: 300,
    width: 200,
    height: 200,
    getSpace(): number {
      return (this.length * this.width * this.height) / 100;
    }
  },
  owner: {
    id: 21,
    firstname: 'Test',
    lastname: 'Cargonaut'
  }
};


describe('ProfileVehicleComponent', () => {
  let component: ProfileVehicleComponent;
  let fixture: ComponentFixture<ProfileVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVehicleComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVehicleComponent);
    component = fixture.componentInstance;
    component.ownProfile = true;
    component.vehicle = mockVehicle;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // *************edit-part*************

  it('#editVehicleCancelBtn should call #onCancel', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onCancel');
    const button = compiled.querySelector('#editVehicleCancelBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onCancel).toHaveBeenCalled();
  }));

  it('#editVehicleSubmitBtn should call #onSubmit', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onSubmit');
    const button = compiled.querySelector('#editVehicleSubmitBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('form is valid when not edited', () => {
    expect(component.editVehicleForm.valid).toBeTruthy();
  });

  it('form is invalid if not all fields have been filled out', () => {
    component.editVehicleForm.controls.model.setValue('');
    expect(component.editVehicleForm.valid).toBeFalsy();
  });

  it('on cancelling, changes should be discarded and form values should be reset, form should be hidden', () => {
    expect(component.editVehicleForm.controls.model.value).toEqual('A121');
    component.editVehicleForm.controls.model.setValue('A123');
    expect(component.editVehicleForm.controls.model.value).toEqual('A123');
    component.onCancel();
    expect(component.editVehicleForm.controls.model.value).toEqual('A121');
  });

  it('on cancelling, the edit form should be hidden', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.onCancel();
    expect(compiled.querySelector('#editVehicleForm-143').style.display).toEqual('none');
  });

  it('form on init should be filled with vehicles\'s information', () => {
    expect(component.editVehicleForm.controls.type.value).toEqual('lkw');
    expect(component.editVehicleForm.controls.model.value).toEqual('A121');
    expect(component.editVehicleForm.controls.comment.value).toEqual('Sehr zuverlässig');
    expect(component.editVehicleForm.controls.seats.value).toEqual(4);
    expect(component.editVehicleForm.controls.length.value).toEqual(300);
    expect(component.editVehicleForm.controls.width.value).toEqual(200);
    expect(component.editVehicleForm.controls.height.value).toEqual(200);
  });

  it('if not filled out correctly, error should be shown and form should not be hidden', () => {
    const compiled = fixture.debugElement.nativeElement;
    const eventEmitterSpy = spyOn(component.submitCallback, 'emit');
    component.editVehicleForm.controls.model.setValue('');
    component.onSubmit();
    expect(compiled.querySelector('#errorVehicle').innerHTML.length).toBeGreaterThan(0);
    expect(eventEmitterSpy).not.toHaveBeenCalled();
  });

  it('if filled out correctly, callback to parent with new values should be emitted', () => {
    const eventEmitterSpy = spyOn(component.submitCallback, 'emit');
    component.editVehicleForm.controls.model.setValue('B1234');
    component.onSubmit();
    expect(eventEmitterSpy).toHaveBeenCalled();
  });


  it('on delete, the delete callback should be called', () => {
    const eventEmitterSpy = spyOn(component.submitDeleteCallback, 'emit');
    component.deleteVehicle();
    expect(eventEmitterSpy).toHaveBeenCalledWith(component.vehicle);
  });

  it('after clicking the delete button, #deleteVehicle should be called', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    console.log(component.ownProfile);
    const delVehSpy = spyOn(component, 'deleteVehicle');
    const button = compiled.querySelector('#deleteVehicleBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(delVehSpy).toHaveBeenCalled();
  }));


  // *************display-part*************
  it('clicking the edit button, #editVehicle should be called and form should be displayed', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('#editVehicleBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelector('#editVehicleForm-143').style.display).toEqual('block');
    expect(compiled.querySelector('#vehicleInfo-143').style.display).toEqual('none');
  }));

  it('if own profile, edit and delete buttons should be visible', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#editVehicleBtn')).toBeTruthy();
    expect(compiled.querySelector('#deleteVehicleBtn')).toBeTruthy();
  }));

  it('if not own profile, edit and delete buttons should not be rendered', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    component.ownProfile = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#editVehicleBtn')).toBeNull();
    expect(compiled.querySelector('#deleteVehicleBtn')).toBeNull();
  }));

  it('on init, vehicle info instead of form should  be visible', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#vehicleInfo-143').style.display).not.toEqual('none');
  });


});
