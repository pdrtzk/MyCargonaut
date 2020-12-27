import {VehicleType} from './vehicle-type.model';
import {Cargonaut} from './cargonaut.model';
import {Hold} from './hold.model';

export interface Vehicle {
  id?: number;
  type?: VehicleType;
  seats?: number;
  comment?: string;
  hold?: Hold;
  owner?: Cargonaut;
}
