import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }
  public user: Cargonaut;

  public async login(email: string, password: string): Promise<Cargonaut> {
    const http = this.http;

    return new Promise<Cargonaut>(async (resolve, reject) => {
      await http.post('/login', {
        email,
        password
      }).toPromise().then((res: any) => {
        this.user = res.user;
        resolve(res.user);
      }).catch((res: any) => {
        console.log('Error: ' + res);
        reject(res);
      });
    });
  }
}
