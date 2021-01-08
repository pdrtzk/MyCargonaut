import {Injectable} from '@angular/core';
import {Post, PostType} from '../../shared/post.model';
import {VehicleTypeType} from '../../shared/vehicle-type.model';

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
        type: PostType.OFFER,
        start_time: new Date(2020, 12, 32, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        vehicle: {
          type: {
            type: VehicleTypeType.PKW
          }
        },
        closed: true
      }, {
        author: {
          firstname: 'Lisa',
          lastname: 'Müller'
        },
        type: PostType.OFFER,
        start_time: new Date(2020, 12, 32, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        vehicle: {
          type: {
            type: VehicleTypeType.PLANE
          }
        }
      }, {
        type: PostType.SEARCHING,
        author: {
          firstname: 'Angela',
          lastname: 'Merkel'
        },
        start_time: new Date(2020, 12, 32, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        vehicle: {
          type: {
            type: VehicleTypeType.LKW
          }
        }
      }
    ];
  }

  getOutboxBookings( /*cargonaut: Cargonaut */): Post[] {
    return this.getInboxBookings();
  }

}
