import {Hold} from './hold.model';
import {Vehicle} from './vehicle.model';
import {Cargonaut} from './cargonaut.model';
import {Address} from './address.model';

export interface Post {
  id?: number;
  startlocation?: Address;
  endlocation?: Address;
  start_time?: Date;
  end_time?: Date;
  payment?: string;
  hold?: Hold;
  vehicle?: Vehicle;
  bookedBy?: Cargonaut [];
  seats?: number;
  type?: string; // 'Angebot' oder 'Gesuch'
  author?: Cargonaut;
  price?: number;
  closed?: boolean;
  description?: string;
}
