import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '../../../../shared/vehicle.model';

@Component({
  selector: 'app-profile-vehicle',
  templateUrl: './profile-vehicle.component.html',
  styleUrls: ['./profile-vehicle.component.css']
})
export class ProfileVehicleComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor() { }

  ngOnInit(): void {
  }
}
