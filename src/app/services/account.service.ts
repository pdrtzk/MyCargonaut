import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  public  isLoggedIn(): boolean {
    let loggedIn;
    this.http.get('/login').subscribe((res) => {
      console.log('service result: ' + res);
      loggedIn = res;
    });
    return loggedIn;
  }

}
