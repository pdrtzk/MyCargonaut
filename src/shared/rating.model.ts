import {Cargonaut} from './cargonaut.model';
import {Post} from './post.model';

export class Rating {
  id?: number;
  author?: Cargonaut;
  trip?: Post;
  ratingStars?: number;
  comment?: string;

}
