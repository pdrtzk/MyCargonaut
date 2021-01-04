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

  // update vehicle

  // add new vehicle

  // remove vehicle

}
