import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private readonly http: HttpClient) {
    this.userSubject.subscribe(value => this.authenticatedUser = value);
  }

  private authenticatedUser: Cargonaut;
  public userSubject: Subject<Cargonaut> = new Subject<Cargonaut>();

  get user(): Cargonaut {
    return this.authenticatedUser;
  }

  public async isLoggedIn(): Promise<boolean> {
    const http = this.http;
    return new Promise<boolean>(async (resolve, reject) => {
      await http.get('/api/login').toPromise().then((res: any) => {
        this.userSubject.next(res.user);
        resolve(true);
      }).catch(error => {
        this.userSubject.next(null);
        resolve(false);
      });
    });
  }

  public async login(email: string, password: string): Promise<Cargonaut> {
    const http = this.http;
    return new Promise<Cargonaut>(async (resolve, reject) => {
      await http.post('https://mycargonaut.herokuapp.com/api/login', {
        email,
        password
      }, {observe: 'response'}).toPromise().then((res: any) => {
        console.log(res);
        // this.authenticatedUser = res.body.user;
        this.userSubject.next(res.body.user);
        resolve(res.body.user);
      }).catch(error => {
        console.log(`Error: ${error.message} as "${error.error.message}"`);
        reject(error);
      });
    });
  }

  public async logout(): Promise<void> {
    const http = this.http;
    return new Promise<void>(async (resolve, reject) => {
      await http.post('https://mycargonaut.herokuapp.com/api/logout', {}).toPromise().then(() => {
        this.userSubject.next(null);
        resolve();
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  public async register(user: Cargonaut): Promise<void> {
    const http = this.http;
    user.firstname = user.firstname.trim();
    user.lastname = user.lastname.trim();
    user.email = user.email.trim();
    user.account_holder = user.account_holder.trim().replace(/[ ]+/g, ' ');
    user.iban = user.iban.trim().replace(/\s/g, '');
    user.bic = user.bic.trim();
    if (user.account_holder === '') {
      user.account_holder = user.firstname + ' ' + user.lastname;
    }
    console.log(user.account_holder);
    return new Promise<void>(async (resolve, reject) => {
      await http.post('https://mycargonaut.herokuapp.com/api/cargonaut', user, {observe: 'response'}).toPromise().then(() => {
        resolve();
      }).catch(error => {
        console.log(`Error: ${error.message} as "${error.error.message}"`);
        reject(error);
      });
    });
  }

  /**
   * @returns a Cargonaut object with id, firstname and lastname of the specified cargonaut id.
   * @param userId: the id of the wanted user (Cargonaut)
   */
  public async get(userId: number): Promise<Cargonaut> {
    const http = this.http;
    return new Promise<Cargonaut>(async (resolve, reject) => {
      await http.get('https://mycargonaut.herokuapp.com/api/cargonaut/' + userId).toPromise().then((res: any) => {
        resolve(res.user);
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  public async update(user: Cargonaut): Promise<void> { // TODO: check if logged in user is updates user
    const http = this.http;
    return new Promise<void>(async (resolve, reject) => {
      if (this.user.id === user.id) {
        await http.put('https://mycargonaut.herokuapp.com/api/cargonaut/' + user.id, user).toPromise().then((res: any) => {
          this.isLoggedIn();
          resolve();
        }).catch(error => {
          console.log('Error: ' + error.message);
          reject(error);
        });
      } else {
        const error = {message: 'Unberechtigter Zugriff'};
        console.log('Error: ' + error.message);
        reject(error);
      }
    });
  }

  /**
   * TODO
   * @returns resolved Promise<void> if user is deleted or rejected error otherwise
   *
   */
  public async delete(user: Cargonaut): Promise<void> {
    const http = this.http;
    return new Promise<void>(async (resolve, reject) => {
      if (this.user.id === user.id) {
        await http.delete('https://mycargonaut.herokuapp.com/api/cargonaut/' + user.id).toPromise().then((res: any) => {
          this.isLoggedIn();
          console.log(res.message);
          resolve();
        }).catch(error => {
          console.log('Error: ' + error.message);
          reject(error);
        });
      } else {
        const error = {message: 'Unberechtigter Zugriff'};
        console.log('Error: ' + error.message);
        reject(error);
      }
    });
  }

  public async updatePassword(user: Cargonaut, password: string): Promise<void> {
    const http = this.http;
    return new Promise<void>(async (resolve, reject) => {
      if (this.user.id === user.id) {
        await http.put('https://mycargonaut.herokuapp.com/api/password/' + user.id, {password}).toPromise().then((res: any) => {
          // this.isLoggedIn();
          console.log(res.message);
          resolve();
        }).catch(error => {
          console.log('Error: ' + error.message);
          reject(error);
        });
      } else {
        const error = {message: 'Unberechtigter Zugriff'};
        console.log('Error: ' + error.message);
        reject(error);
      }
    });
  }

  public uploadImage(image: File, user: Cargonaut): Promise<void> {
    const formData = new FormData();
    formData.append('image', image);
    return new Promise<void>(async (resolve, reject) => {
      if (this.user.id === user.id) {
        console.log('going to post to upload route');
        await this.http.post(`https://mycargonaut.herokuapp.com/api/cargonaut/${user.id}/upload`, formData).toPromise().then((res: any) => {
            resolve();
          }
        ).catch(error => {
          console.log('Error: ' + error.message);
          reject(error);
        });
      } else {
        const error = {message: 'Unberechtigter Zugriff'};
        console.log('Error: ' + error.message);
        reject(error);
      }
    });
  }

  public getImage(userId: number): Promise<string | ArrayBuffer> {
    const reader = new FileReader();
    return new Promise<string | ArrayBuffer>(async (resolve, reject) => {
      console.log('going to post to upload route');
      await this.http.get(`https://mycargonaut.herokuapp.com/api/cargonaut/${userId}/image`, {
        responseType: 'blob',
        observe: 'response'
      }).toPromise().then((res: any) => {
        reader.addEventListener('load', () => {
          resolve(reader.result);
        }, false);
        reader.readAsDataURL(res.body);
      }).catch(error => {
        console.log('Error in getImage: ' + error.message);
        reject(error);
      });
    });
  }


}
