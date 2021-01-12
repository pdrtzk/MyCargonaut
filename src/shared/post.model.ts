import {Hold} from './hold.model';
import {Vehicle} from './vehicle.model';
import {Cargonaut} from './cargonaut.model';

export interface Post {
  id?: number;
  startlocation?: string;
  endlocation?: string;
  start_time?: Date;
  end_time?: Date;
  payment?: string;
  hold?: Hold;
  vehicle?: Vehicle;
  bookedBy?: Cargonaut[];
  seats?: number;
  type?: PostType; // 'Angebot' oder 'Gesuch'
  author?: Cargonaut;
  price?: number;
  closed?: boolean;
  description?: string;
  status?: DriveStatus;
}

export enum PostType {
  OFFER = 'Angebot',
  SEARCHING = 'Gesuch'
}

export enum DriveStatus {
  AUFGETRAGEN, UNTERWEGS, ABGESCHLOSSEN
}
