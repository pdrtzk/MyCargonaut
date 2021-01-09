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
      await http.get('http://localhost:4200/api/login').toPromise().then((res: any) => {
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
      await http.post('http://localhost:4200/api/login', {
        email,
        password
      }).toPromise().then((res: any) => {
        this.authenticatedUser = res.user;
        this.userSubject.next(res.user);
        resolve(res.user);
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  public async logout(): Promise<void> {
    const http = this.http;
    return new Promise<void>(async (resolve, reject) => {
      await http.post('http://localhost:4200/api/logout', {}).toPromise().then(() => {
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
    return new Promise<void>(async (resolve, reject) => {
      await http.post('http://localhost:4200/api/cargonaut', user).toPromise().then(() => {
        // this.login(user.email, user.password).then(() => resolve());
        resolve();
      }).catch(error => {
        console.log('Error: ' + error.message);
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
      await http.get('http://localhost:4200/api/cargonaut/' + userId).toPromise().then((res: any) => {
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
        await http.put('http://localhost:4200/api/cargonaut/' + user.id, user).toPromise().then((res: any) => {
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
}
