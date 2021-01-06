import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';
import {Subject} from 'rxjs';
import {Vehicle} from '../../shared/vehicle.model';
import {VehicleTypeType} from '../../shared/vehicle-type.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  allVehiclesUser: Vehicle[] = [];


  constructor(private http: HttpClient) {
  }
/*
anzahl_sitzplaetze: 2
art: "LKW"
besitzer: 12
id: 6
kommentar: "Test"
ladeflaeche: 8
 */
  // get vehicles
  public async getAllVehicles(cargonautId: number): Promise<Vehicle[]> {
    const headersY = new HttpHeaders({'Content-Type': 'application/json'});
    console.log('get all vehicles');
    const http = this.http;
    return new Promise<Vehicle[]>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/vehicles/' + cargonautId.toString(), {
      headers: headersY
      }).toPromise().then((res: any) => {
        res.vehicles.forEach(elem => {
          const v: Vehicle = new Vehicle();
          v.comment = elem.kommentar;
          v.id = elem.id;
          v.seats = elem.anzahl_sitzplaetze;
          v.type.type = this.getVehicleType(elem.art);
          v.type.description = elem.modell;
          this.allVehiclesUser.push(v);
        });
        resolve(this.allVehiclesUser);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  public async getVehicleHold(ve: Vehicle): Promise<Vehicle> {
    return new Promise<Vehicle>(async (resolve, reject) => {
      await this.http.get('http://localhost:4200/api/vehicle/' + ve.id, {
      }).toPromise().then((res: any) => {
        console.log(res);
        ve.hold.height = parseFloat(res.hold.ladeflaeche_hoehe_cm);
        ve.hold.width = parseFloat(res.hold.ladeflaeche_breite_cm);
        ve.hold.length = parseFloat(res.hold.ladeflaeche_laenge_cm);
        resolve(ve);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  // update vehicle - no backend right now
  public async updateVehicles(cargonautId: number): Promise<Cargonaut> {
    console.log('update vehicle');
    const http = this.http;
    return new Promise<Cargonaut>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/vehicle/' + cargonautId.toString(), {
      }).toPromise().then((res: any) => {
        console.log(res);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }
  // add new vehicle
  public async addVehicle(cargonautId: number, vehicle: Vehicle): Promise<number> {
    const  type =  vehicle.type.type;
    const model = vehicle.type.description;
    const length =  vehicle.hold.length;
    const height = vehicle.hold.height;
    const width = vehicle.hold.width;
    const seats = vehicle.seats;
    const comment = vehicle.comment;

    const http = this.http;
    return new Promise<number>(async (resolve, reject) => {
      await http.post('http://localhost:4200/api/vehicle/' + cargonautId.toString(), {
        model,
        type,
        length,
        height,
        width,
        seats,
        comment
      }).toPromise().then((res: any) => {
        resolve(res.createdVehicle);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  // remove vehicle
  public async deleteVehicle(vehicleId: number): Promise<boolean> {
    console.log('delete vehicle');
    const http = this.http;
    return new Promise<boolean>(async (resolve, reject) => {
      await http.delete('http://localhost:4200/api/vehicle/' + vehicleId.toString(), {
      }).toPromise().then((res: any) => {
        console.log(res);
        resolve(true);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }


  getVehicleType(type: string): VehicleTypeType {
    switch (type) {
      case('PKW') : return VehicleTypeType.PKW;
      case('LKW') : return VehicleTypeType.LKW;
      case('Transporter') : return VehicleTypeType.BUS;
      case('Flugzeug') : return VehicleTypeType.PLANE;
      case('Schiff') : return VehicleTypeType.BOAT;
    }
  }
}
