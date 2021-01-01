import {Address} from './address.model';

export interface Cargonaut {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  username?: string;
  birthday?: Date;
  address?: Address;
}
