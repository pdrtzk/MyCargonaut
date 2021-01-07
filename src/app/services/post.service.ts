import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';
import {DriveStatus, Post, PostType} from '../../shared/post.model';
import {VehicleTypeType} from '../../shared/vehicle-type.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
    /* const testPayment = {
      id: 1,
      type: 'PayPal',
      description: 'Only Accept PayPal'
    }
    const testVehicle = {
      id: 4,
      type: 'Kleinwagen',
      seats: '3',

    }
    const testPost = {
      start_location: {

      },
      end_location: {

      },
      start_time: new Date(2021, 1, 15, 9, 9, 0, 0),
      end_time: new Date(2021, 1, 15, 15, 9, 0, 0),
      payment: testPayment,
      hold: {

      },
      vehicle: {

      },


    } */

  }

  public async createPost(cargonaut: Cargonaut, post: Post): Promise<number> {
    const http = this.http;
    return new Promise<number>(async (resolve, reject) => {
      await http.post('http://localhost:4200/api/post/' + cargonaut.id, {
        post
      }).toPromise().then((res: any) => {
        console.log('Success: ' + res.message);
        resolve(res.createdVehicle);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  public async getAllPosts(): Promise<Post[]> {
    const http = this.http;
    return new Promise<Post[]>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/posts').toPromise().then((res: any) => {
        resolve(res.posts);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  public async getSpecificPost(postId: number): Promise<Post> {
    const http = this.http;
    return new Promise<Post>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/post/' + postId).toPromise().then((res: any) => {
        resolve(res.post);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  public async updatePost(post: Post, postId: number): Promise<Post> {
    const http = this.http;
    return new Promise<Post>(async (resolve, reject) => {
      await http.put('http://localhost:4200/api/post/' + postId, {
        post
      }).toPromise().then((res: any) => {
        resolve(res.post);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  // todo replace mock data with http request

  getPostById(id: number): Post {
    return {
      id: 1,
      status: DriveStatus.AUFGETRAGEN,
      description: 'test',
      start_time: new Date(2020, 12, 31, 23, 40),
      startlocation: 'Gießen',
      end_time: new Date(2021, 1, 1, 10, 50),
      endlocation: 'Frankfurt',
      payment: 'Paypal',
      type: PostType.OFFER,
      vehicle: {
        id: 3,
        type: {
          id: 1,
          type: VehicleTypeType.PKW,
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
      closed: false,
      hold: {
        height: 50,
        length: 120,
        width: 70,
        getSpace(): number {
          return 0;
        }
      }
    };
  }

  getMorePosts(): Post[] {
    return [
      {
        author: {
          firstname: 'Max',
          lastname: 'Mustermann'
        },
        type: PostType.OFFER,
        status: DriveStatus.AUFGETRAGEN,
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
            type: VehicleTypeType.PKW
          }
        }
      }, {
        author: {
          firstname: 'Lisa',
          lastname: 'Müller'
        },
        status: DriveStatus.AUFGETRAGEN,
        type: PostType.OFFER,
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
            type: VehicleTypeType.PLANE
          }
        }
      }, {
      status: DriveStatus.AUFGETRAGEN,
        type: PostType.SEARCHING,
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
            type: VehicleTypeType.LKW,
          }
        }
      }
    ];
  }
}

