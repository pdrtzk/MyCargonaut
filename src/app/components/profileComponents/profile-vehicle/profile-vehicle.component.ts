import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vehicle} from '../../../../shared/vehicle.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VehicleTypeType} from '../../../../shared/vehicle-type.model';
import {Hold} from '../../../../shared/hold.model';

@Component({
  selector: 'app-profile-vehicle',
  templateUrl: './profile-vehicle.component.html',
  styleUrls: ['./profile-vehicle.component.css']
})
export class ProfileVehicleComponent implements OnInit {

  @Input() vehicle: Vehicle;
  @Input() ownProfile: boolean;

  @Output() submitCallback: EventEmitter<any> = new EventEmitter();
  @Output() submitDeleteCallback: EventEmitter<any> = new EventEmitter();
  editVehicleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editVehicleForm = this.formBuilder.group({
      type: [this.getVehicleType(), Validators.required],
      model: [this.vehicle.type.description, Validators.required], // description
      seats: [this.vehicle.seats, [Validators.required, Validators.min(1)]],
      comment: [this.vehicle.comment],
      length: [this.vehicle.type.type !== VehicleTypeType.PKW ? this.vehicle.hold.length : 0],
      width: [this.vehicle.type.type !== VehicleTypeType.PKW ? this.vehicle.hold.width : 0],
      height: [this.vehicle.type.type !== VehicleTypeType.PKW ? this.vehicle.hold.height : 0],
    });
  }

  editVehicle(): void {
    const id = this.vehicle.id.toString();
    document.getElementById('editVehicleForm-' + id).style.display = 'block';
    document.getElementById('vehicleInfo-' + id).style.display = 'none';
  }

  deleteVehicle(): void {
    this.submitDeleteCallback.emit(this.vehicle);
  }

  onSubmit(): void {
    if (this.vehicle.type.type === VehicleTypeType.PKW && this.editVehicleForm.controls.type.value !== 'pwk'){
      this.vehicle.hold = new Hold(0, 0, 0); // initialize hold
    }
    if (this.editVehicleForm.invalid){
      document.getElementById('errorVehicle').innerText = 'Fahrzeugtyp, Modell, Sitzanzahl ' +
        'müssen angegeben werden. Bei allen Fahrzeugtypen außer PKW müssen zusätzlich die Dimensionen des Stauraums vermerkt werden.';
      return;
    }
    const id = this.vehicle.id.toString();
    // new Object
    const newVehicle: Vehicle = new Vehicle();
    newVehicle.id = this.vehicle.id;
    newVehicle.owner = this.vehicle.owner;
    newVehicle.type.type = this.getVehicleTypeFromString(this.editVehicleForm.controls.type.value);
    newVehicle.type.description = this.editVehicleForm.controls.model.value;
    newVehicle.seats = this.editVehicleForm.controls.seats.value;
    newVehicle.comment = this.editVehicleForm.controls.comment.value;
    if ( newVehicle.type.type !== VehicleTypeType.PKW){
      newVehicle.hold.length = this.editVehicleForm.controls.length.value;
      newVehicle.hold.width = this.editVehicleForm.controls.width.value;
      newVehicle.hold.height = this.editVehicleForm.controls.height.value;
    } else {
      newVehicle.hold.length = 1;
      newVehicle.hold.width = 1;
      newVehicle.hold.height = 1;
    }

    document.getElementById('errorVehicle').innerText = '';
    this.submitCallback.emit( newVehicle);
    document.getElementById('editVehicleForm-' + id).style.display = 'none';
    document.getElementById('vehicleInfo-' + id).style.display = 'block';
  }

  onCancel(): void {
    const id = this.vehicle.id.toString();
    this.resetForm();
    document.getElementById('editVehicleForm-' + id).style.display = 'none';
    document.getElementById('vehicleInfo-' + id).style.display = 'block';
  }

  resetForm(): void {
   this.editVehicleForm.reset({
     type: this.getVehicleType(),
     model: this.vehicle.type.description,
     seats: this.vehicle.seats,
     comment: this.vehicle.comment,
     length: this.vehicle.type.type !== VehicleTypeType.PKW ? this.vehicle.hold.length : 0,
     height: this.vehicle.type.type !== VehicleTypeType.PKW ? this.vehicle.hold.length : 0,
     width: this.vehicle.type.type !== VehicleTypeType.PKW ? this.vehicle.hold.length : 0
   });
  }

  getVehicleTypeString(): string {
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

  getVehicleType(): string {
    switch (this.vehicle.type.type){
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
