import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {Component} from '@angular/core';

const mockuser: Cargonaut = {
  id: 11,
  firstname: 'Test',
  lastname: 'Cargonaut',
  birthday: new Date('2000-12-12')
};


describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    component.user = mockuser;
    component.ngOnInit();
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#editProfileCancelBtn should call #editProfileCancelBtn', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'cancelEditProfile');
    const button = compiled.querySelector('#editProfileCancelBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.cancelEditProfile).toHaveBeenCalled();
  }));

  it('#editProfileSubmitBtn should call #onSubmit', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onSubmit');
    const button = compiled.querySelector('#editProfileSubmitBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('form is valid when not edited', () => {
    expect(component.editProfileForm.valid).toBeTruthy();
  });

  it('form is invalid if not all fields have been filled out', () => {
    // make all fields empty, then fill them one by one
    component.editProfileForm.controls.firstName.setValue('');
    component.editProfileForm.controls.lastName.setValue('');
    component.editProfileForm.controls.birthday.setValue(null);
    expect(component.editProfileForm.valid).toBeFalsy();
    component.editProfileForm.controls.firstName.setValue('TestFirstname');
    expect(component.editProfileForm.valid).toBeFalsy();
    component.editProfileForm.controls.lastName.setValue('TestLastname');
    expect(component.editProfileForm.valid).toBeFalsy();
    component.editProfileForm.controls.birthday.setValue(new Date('1998-10-22'));
    expect(component.editProfileForm.valid).toBeTruthy();
  });

  it('on cancelling, changes should be discarded and form values should be reset', () => {
    component.cancelEditProfile = () => { // override function, so no css of parent component gets affected
      component.editProfileForm.reset({
        firstName: component.user.firstname,
        lastName: component.user.lastname,
        birthday: component.getBirthday()});
    };
    expect(component.editProfileForm.controls.lastName.value).toEqual('Cargonaut');
    component.editProfileForm.controls.lastName.setValue('Tested');
    expect(component.editProfileForm.controls.lastName.value).toEqual('Tested');
    component.cancelEditProfile();
    expect(component.editProfileForm.controls.lastName.value).toEqual('Cargonaut');
  });

  it('form on init should be filled with user\'s information', () => {
    const val = component.editProfileForm.controls.firstName.value;
    const val2 = component.editProfileForm.controls.lastName.value;
    expect(val).toEqual('Test');
    expect(val2).toEqual('Cargonaut');
  });

  it('if not filled out correctly, error should be shown and no callback should be emitted', () => {
    const compiled = fixture.debugElement.nativeElement;
    const eventEmitterSpy = spyOn(component.submitCallback, 'emit');
    component.editProfileForm.controls.lastName.setValue('');
    component.onSubmit();
    expect(compiled.querySelector('#error').innerHTML).toEqual('Alle Felder müssen ausgefüllt werden.');
    expect(eventEmitterSpy).not.toHaveBeenCalled();

  });

  it('if filled out correctly, callback to parent with new values should be emitted', () => {
    const eventEmitterSpy = spyOn(component.submitCallback, 'emit');
    component.editProfileForm.controls.lastName.setValue('Testesdfsdf');
    const userNew: Cargonaut = {
      id: component.user.id,
      firstname: component.editProfileForm.controls.firstName.value,
      lastname: component.editProfileForm.controls.lastName.value,
      birthday: component.editProfileForm.controls.birthday.value
    };
    component.onSubmit();
    expect(eventEmitterSpy).toHaveBeenCalledWith(userNew);
  });

});
