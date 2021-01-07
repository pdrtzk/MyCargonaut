import {Payment} from './payment.model';
import {Hold} from './hold.model';
import {Vehicle} from './vehicle.model';
import {Cargonaut} from './cargonaut.model';

export interface Post {
  id?: number;
  startlocation?: Location;
  endlocation?: Location;
  start_time?: Date;
  end_time?: Date;
  payment?: Payment;
  hold?: Hold;
  vehicle?: Vehicle;
  bookedBy?: Cargonaut[];
  seats?: number;
  type?: string;
  author?: Cargonaut;
  price?: number;
  closed?: boolean;
}
