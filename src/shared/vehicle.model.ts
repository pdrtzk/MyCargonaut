import {VehicleType} from './vehicle-type.model';
import {Cargonaut} from './cargonaut.model';
import {Hold} from './hold.model';

export class Vehicle {
  id?: number;
  type?: VehicleType;
  seats?: number;
  comment?: string;
  hold?: Hold;
  owner?: Cargonaut;

  constructor() {
    this.type = new VehicleType();
    this.hold = new Hold(0, 0, 0);
  }
}
