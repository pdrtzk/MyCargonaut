import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Vehicle} from '../../../../shared/vehicle.model';
import {MatDialogRef} from '@angular/material/dialog';
import {VehicleTypeType} from '../../../../shared/vehicle-type.model';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  submitCallback: EventEmitter<any> = new EventEmitter();
  addVehicleForm: FormGroup;
  vehicle: Vehicle;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVehicleComponent>) {
    this.vehicle = new Vehicle();
  }

  ngOnInit(): void {
    this.addVehicleForm = this.formBuilder.group({
      type: [this.getVehicleStringFromType(VehicleTypeType.PKW), Validators.required],
      model: ['', Validators.required], // description
      seats: [1, [Validators.required, Validators.min(1)]],
      comment: [''],
      length: [0],
      width: [0],
      height: [0],
    });
  }


  onSubmit(): void{
    if (this.addVehicleForm.invalid || this.addVehicleForm.controls.seats.value <= 0){
      document.getElementById('errorAddVehicle').innerText = 'Fahrzeugtyp, Model und Sitzanzahl müssen angegeben werden.';
      return;
    }
    this.vehicle.type.type = this.getVehicleTypeFromString(this.addVehicleForm.controls.type.value);
    this.vehicle.type.description = this.addVehicleForm.controls.model.value;
    this.vehicle.seats = this.addVehicleForm.controls.seats.value;
    this.vehicle.comment = this.addVehicleForm.controls.comment.value;
    if (this.vehicle.type.type !== VehicleTypeType.PKW)  {
    this.vehicle.hold.length = this.addVehicleForm.controls.length.value;
    this.vehicle.hold.height = this.addVehicleForm.controls.height.value;
    this.vehicle.hold.width = this.addVehicleForm.controls.width.value;
    } else {
      this.vehicle.hold.length = 1;
      this.vehicle.hold.height = 1;
      this.vehicle.hold.width = 1;
    }
    this.submitCallback.emit(this.vehicle);

    this.resetForm();
    this.vehicle = new Vehicle();
    document.getElementById('errorAddVehicle').innerText = '';

    this.dialogRef.close(false);
  }

  onCancel(): void {
   this.resetForm();
   this.dialogRef.close();
  }

  resetForm(): void {
    this.addVehicleForm.reset({
      type: this.getVehicleStringFromType(VehicleTypeType.PKW),
      model: '',
      seats: 0,
      comment: '',
      length: 0,
      height: 0,
      width: 0
    });
  }

  getVehicleStringFromType(type: VehicleTypeType): string {
    switch (type){
      case VehicleTypeType.PKW:
        return 'pkw';
      case VehicleTypeType.LKW:
        return 'lkw';
      case VehicleTypeType.BUS:
        return 'bus';
      case VehicleTypeType.PLANE:
        return 'plane';
      case VehicleTypeType.BOAT:
        return 'boat';
    }
  }

  getVehicleType(): string {
    switch (this.vehicle.type.type){
      case VehicleTypeType.PKW:
        return 'PKW';
      case VehicleTypeType.LKW:
        return 'LKW';
      case VehicleTypeType.BUS:
        return 'Transporter';
      case VehicleTypeType.PLANE:
        return 'Flugzeug';
      case VehicleTypeType.BOAT:
        return 'Schiff';
    }
  }

  getVehicleTypeFromString(str: string): VehicleTypeType {
    switch (str){
      case 'pkw':
        return VehicleTypeType.PKW;
      case 'lkw':
        return VehicleTypeType.LKW;
      case 'bus':
        return VehicleTypeType.BUS;
      case 'plane':
        return VehicleTypeType.PLANE;
      case 'boat':
        return VehicleTypeType.BOAT;
    }
  }
}
