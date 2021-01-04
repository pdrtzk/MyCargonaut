import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vehicle} from '../../../../shared/vehicle.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehicleTypeType} from '../../../../shared/vehicle-type.model';

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
      seats: [this.vehicle.seats, Validators.required],
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
    const id = this.vehicle.id.toString();
    this.vehicle.type.type = this.getVehicleTypeFromString(this.editVehicleForm.controls.type.value);
    this.vehicle.type.description = this.editVehicleForm.controls.model.value;
    this.vehicle.seats = this.editVehicleForm.controls.seats.value;
    this.vehicle.comment = this.editVehicleForm.controls.comment.value;
    if (this.vehicle.type.type !== VehicleTypeType.PKW){
      this.vehicle.hold.length = this.editVehicleForm.controls.length.value;
      this.vehicle.hold.width = this.editVehicleForm.controls.width.value;
      this.vehicle.hold.height = this.editVehicleForm.controls.height.value;
    }

    this.submitCallback.emit(this.vehicle);
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
     type: this.vehicle.type.type,
     model: this.vehicle.type.description,
     seats: this.vehicle.seats,
     comment: this.vehicle.comment,
   });
   if (this.vehicle.type.type !== VehicleTypeType.PKW){
     this.editVehicleForm.reset({
       length: this.vehicle.hold.length,
       width: this.vehicle.hold.width,
       height: this.vehicle.hold.height
     });
   }
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
