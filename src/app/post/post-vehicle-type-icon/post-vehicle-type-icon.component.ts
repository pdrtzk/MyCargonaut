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
    if (this.type === 'pkw') {
      return 'directions_car';
    } else if (this.type === 'lkw') {
      return 'local_shipping';
    } else if (this.type === 'bus') {
      return 'directions_bus';
    } else if (this.type === 'boat') {
      return 'directions_boat';
    } else if (this.type === 'plane') {
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
