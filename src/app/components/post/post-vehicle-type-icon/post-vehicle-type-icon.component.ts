import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-vehicle-type-icon',
  templateUrl: './post-vehicle-type-icon.component.html',
  styleUrls: ['./post-vehicle-type-icon.component.css']
})
export class PostVehicleTypeIconComponent implements OnInit {

  @Input() type: string;
  @Input() style: string;

  getIconName(): string {
    if (!this.type) {
      return 'help';
    }
    if (this.type === 'PKW') {
      return 'directions_car';
    } else if (this.type === 'LKW') {
      return 'local_shipping';
    } else if (this.type === 'Transporter') {
      return 'directions_bus';
    } else if (this.type === 'Schiff') {
      return 'directions_boat';
    } else if (this.type === 'Flugzeug') {
      return 'local_airport';
    } else {
      return 'help';
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
