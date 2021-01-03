import {Injectable} from '@angular/core';
import {Post} from '../../shared/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {
  }

  // todo replace mock data with http request

  getPostById(id: number): Post {
    return {
      id: 1,
      start_time: new Date(2020, 12, 31, 23, 40),
      end_time: new Date(2021, 1, 1, 10, 50),
      payment: {
        id: 3,
        type: 'Paypal',
        description: 'Paypal description'
      },
      type: 'Angebot',
      vehicle: {
        id: 3,
        type: {
          id: 1,
          type: 'PKW',
          description: 'vw golf'
        },
        seats: 3,
        comment: '....'
      },
      bookedBy: [],
      seats: 4,
      author: {
        id: 424,
        firstname: 'Chrissi',
        lastname: 'Eberle',
        email: 'chrissi.eberle@gmx.de',
        password: 'p3inf2so',
        birthday: new Date(2000, 12, 24)
      },
      price: 150,
      closed: false
    };
  }

  getMorePosts(): Post[] {
    return [
      {
        author: {
          firstname: 'Max',
          lastname: 'Mustermann'
        },
        type: 'Angebot',
        start_time: new Date(2020, 12, 32, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        /*        startlocation: {
                  city: 'Gießen'
                },
                endlocation: {
                  city: 'Frankfurt'
                },*/
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
        /*        startlocation: {
                  city: 'Gießen'
                },
                endlocation: {
                  city: 'München'
                },*/
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
        /*        startlocation: {
                  city: 'Linden'
                },
                endlocation: {
                  city: 'Nürnberg'
                },*/
        vehicle: {
          type: {
            type: 'lkw'
          }
        }
      }
    ];
  }
}
