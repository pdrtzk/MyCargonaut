import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Vehicle} from '../../../../shared/vehicle.model';
import {MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from '../../account/login/login.component';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Output() submitCallback: EventEmitter<any> = new EventEmitter();
  addVehicleForm: FormGroup;
  vehicle: Vehicle;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddVehicleComponent>) {
    this.vehicle = new Vehicle();
  }

  ngOnInit(): void {
    this.addVehicleForm = this.formBuilder.group({
      type: ['pkw', Validators.required],
      model: ['', Validators.required], // description
      seats: [0, Validators.required],
      comment: [''],
      length: [0],
      width: [0],
      height: [0],
    });
  }

  onSubmit(){
    this.vehicle.type.type = this.addVehicleForm.controls.type.value;
    this.vehicle.type.description = this.addVehicleForm.controls.model.value;
    this.vehicle.seats = this.addVehicleForm.controls.seats.value;
    this.vehicle.comment = this.addVehicleForm.controls.comment.value;
    this.vehicle.hold.length = this.addVehicleForm.controls.length.value;
    this.vehicle.hold.height = this.addVehicleForm.controls.height.value;
    this.vehicle.hold.width = this.addVehicleForm.controls.width.value;
    this.submitCallback.emit(this.vehicle);
    return this.vehicle;
  }

  onCancel(): void {
    this.dialogRef.close(true);
  }

  onCloseDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }
}
