import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AddVehicleComponent } from './add-vehicle.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';

describe('AddVehicleComponent', () => {
  let component: AddVehicleComponent;
  let fixture: ComponentFixture<AddVehicleComponent>;

  const matDialogRefMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVehicleComponent ],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue:  matDialogRefMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addVehicleCancelBtn should call #onCancel', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onCancel');
    const button = compiled.querySelector('#addVehicleCancelBtn');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.onCancel).toHaveBeenCalled();
  }));

  it('#addVehicleSubmitBtn should call #onSubmit', fakeAsync (() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'onSubmit');
    const button = compiled.querySelector('#addVehicleSubmitBtn');
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

  it('if not filled out correctly, error should be shown and dialog not closed', () => {
  });

});


export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }

  close() {
  }
}
