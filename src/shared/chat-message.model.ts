import {Cargonaut} from './cargonaut.model';
import {Chat} from './chat.model';

export interface ChatMessage {
  id?: number;
  message?: string;
  sentAt?: Date;
  author?: Cargonaut;
  chat?: Chat;
}
