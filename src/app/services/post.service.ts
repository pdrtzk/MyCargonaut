import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';
import {Post} from '../../shared/post.model';

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
      await http.post('http://localhost:8080/post/' + cargonaut.id, {
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
      await http.get('http://localhost:8080/posts').toPromise().then((res: any) => {
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
      await http.get('http://localhost:8080/post/' + postId).toPromise().then((res: any) => {
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
      await http.put('http://localhost:8080/post/' + postId, {
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
      start_time: new Date(2020, 12, 31, 23, 40),
      end_time: new Date(2021, 1, 1, 10, 50),
      payment: 'Paypal',
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

