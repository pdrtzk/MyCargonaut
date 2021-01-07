import {Injectable} from '@angular/core';
import {Post} from '../../shared/post.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() {
  }

  // todo query data for 1 specific cargonaut

  getInboxBookings(/* cargonaut: Cargonaut */): Post[] {
    return [
      {
        author: {
          firstname: 'Max',
          lastname: 'Mustermann'
        },
        type: 'Angebot',
        start_time: new Date(2020, 12, 32, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        vehicle: {
          type: {
            type: 'pkw'
          }
        }
      }, {
        author: {
          firstname: 'Lisa',
          lastname: 'Müller'
        },
        type: 'Angebot',
        start_time: new Date(2020, 12, 32, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        vehicle: {
          type: {
            type: 'plane'
          }
        }
      }, {
        type: 'Gesuch',
        author: {
          firstname: 'Angela',
          lastname: 'Merkel'
        },
        start_time: new Date(2020, 12, 32, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        vehicle: {
          type: {
            type: 'lkw'
          }
        }
      }
    ];
  }

  getOutboxBookings( /*cargonaut: Cargonaut */): Post[] {
    return this.getInboxBookings();
  }

}
