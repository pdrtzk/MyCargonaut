import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UpdatePasswordComponent } from './update-password.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';




describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;

  const matDialogRefMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordComponent ],
      imports: [FormsModule, ReactiveFormsModule,  MatDialogModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue:  matDialogRefMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#updatePWCancelBtn should call #onCancel', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onCancel');
    const button = compiled.querySelector('#updatePWCancelBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onCancel).toHaveBeenCalled();
  }));

  it('#updatePWSubmitBtn should call #onSubmit', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onSubmit');
    const button = compiled.querySelector('#updatePWSubmitBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should close dialog on cancelling', () => {
    const spy = spyOn(component.dialogRef, 'close');
    component.onCancel();
    expect(spy).toHaveBeenCalled();
  });

  it('if not filled out correctly, error should be shown and dialog not be closed', () => {
    const compiled = fixture.debugElement.nativeElement;
    const dialogRefSpy = spyOn(component.dialogRef, 'close');
    component.onSubmit();
    expect(compiled.querySelector('#errorUpdatePW')).toBeTruthy();
    expect(dialogRefSpy).not.toHaveBeenCalled();
  });

  it('if filled out correctly, callback to parent should be emitted', () => {
    const dialogRefSpy = spyOn(component.dialogRef, 'close');
    const eventEmitterSpy = spyOn(component.submitCallback, 'emit');
    component.updatePasswordForm.controls.password.setValue('password12');
    component.onSubmit();
    expect(eventEmitterSpy).toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalled();
  });
});
