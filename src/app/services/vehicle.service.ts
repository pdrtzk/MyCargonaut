import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private authenticatedUser: Cargonaut;

  constructor(private http: HttpClient) {
  }

  // get vehicles
  public async getAllVehicles(cargonautId: number): Promise<Cargonaut> {
    console.log('get all vehicles');
    const http = this.http;
    return new Promise<Cargonaut>(async (resolve, reject) => {
      await http.get('http://localhost:8080/vehicles/' + cargonautId.toString(), {
      }).toPromise().then((res: any) => {
        console.log(res);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  // update vehicle

  // add new vehicle

  // remove vehicle

}
