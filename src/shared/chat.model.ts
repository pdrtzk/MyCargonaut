import {Cargonaut} from './cargonaut.model';
import {ChatMessage} from './chat-message.model';

export interface Chat {
  id?: number;
  fstMember?: Cargonaut;
  sndMember?: Cargonaut;
  messages?: ChatMessage [];
}
