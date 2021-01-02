import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vehicle} from '../../../../shared/vehicle.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-vehicle',
  templateUrl: './profile-vehicle.component.html',
  styleUrls: ['./profile-vehicle.component.css']
})
export class ProfileVehicleComponent implements OnInit {

  @Input() vehicle: Vehicle;
  @Input() ownProfile: boolean;

  @Output() submitCallback: EventEmitter<any> = new EventEmitter();
  editVehicleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editVehicleForm = this.formBuilder.group({
      type: [this.vehicle.type.type, Validators.required],
      model: [this.vehicle.type.description, Validators.required], // description
      seats: [this.vehicle.seats, Validators.required],
      comment: [this.vehicle.comment],
      length: [this.vehicle.type.type !== 'pkw' ? this.vehicle.hold.length : 0],
      width: [this.vehicle.type.type !== 'pkw' ? this.vehicle.hold.width : 0],
      height: [this.vehicle.type.type !== 'pkw' ? this.vehicle.hold.height : 0],
    });
  }

  editVehicle(): void {
    const id = this.vehicle.id.toString();
    document.getElementById('editVehicleForm-' + id).style.display = 'block';
    document.getElementById('vehicleInfo-' + id).style.display = 'none';
  }

  deleteVehicle(): void {
    // todo: callback to parent
  }

  onSubmit(): void {
    const id = this.vehicle.id.toString();
    this.vehicle.type.type = this.editVehicleForm.controls.type.value;
    this.vehicle.type.description = this.editVehicleForm.controls.model.value;
    this.vehicle.seats = this.editVehicleForm.controls.seats.value;
    this.vehicle.comment = this.editVehicleForm.controls.comment.value;
    if (this.vehicle.type.type !== 'pkw'){
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
   this.editVehicleForm.reset();
  }

  getVehicleType(): string {
    switch (this.vehicle.type.type){
      case 'pkw':
        return 'PKW';
      case 'lkw':
        return 'LKW';
      case 'bus':
        return 'Transporter';
    }
  }
}
