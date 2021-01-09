import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
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
        console.log('Error: ' + error);
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
        console.log('Error: ' + error);
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
        console.log('Error: ' + error);
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
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  public async getUser(id: number): Promise<Cargonaut> {
    const http = this.http;
    return new Promise<Cargonaut>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/cargonaut/' + id).toPromise().then((res: any) => {
        console.log('cargonaut: ' + res);
        // const user: Cargonaut = {};
        resolve(res.user);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  public async getAverageUserRating(userId: number): Promise<number> {
    const http = this.http;
    return new Promise<number>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/avgBewertung/' + userId).toPromise().then((res: any) => {
        resolve(res.avgBewertung.avg);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }
}
