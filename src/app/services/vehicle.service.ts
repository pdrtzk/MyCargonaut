import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cargonaut} from '../../shared/cargonaut.model';
import {Vehicle} from '../../shared/vehicle.model';
import {VehicleTypeType} from '../../shared/vehicle-type.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  allVehiclesUser: Vehicle[] = [];


  constructor(private http: HttpClient) {
  }

  // get vehicles
  public async getAllVehicles(cargonautId: number): Promise<Vehicle[]> {
    this.allVehiclesUser.length = 0;
    const headersY = new HttpHeaders({'Content-Type': 'application/json'});
    const http = this.http;
    return new Promise<Vehicle[]>(async (resolve, reject) => {
      await http.get(' https://mycargonaut.herokuapp.com/api/vehicles/' + cargonautId.toString(), {
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
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  public async getVehicleHold(ve: Vehicle): Promise<Vehicle> {
    return new Promise<Vehicle>(async (resolve, reject) => {
      await this.http.get(' https://mycargonaut.herokuapp.com/api/vehicle/' + ve.id, {}).toPromise().then((res: any) => {
        if (ve.hold) {
          ve.hold.height = parseFloat(res.hold.ladeflaeche_hoehe_cm);
          ve.hold.width = parseFloat(res.hold.ladeflaeche_breite_cm);
          ve.hold.length = parseFloat(res.hold.ladeflaeche_laenge_cm);
        }
        resolve(ve);
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  // update vehicle - no backend right now
  public async updateVehicle(vehicle: Vehicle): Promise<string> {
    const http = this.http;
    return new Promise<string>(async (resolve, reject) => {
      await http.put(' https://mycargonaut.herokuapp.com/api/vehicle/' + vehicle.id.toString(), {
        vehicle
      }).toPromise().then((res: any) => {
        resolve(res.message);
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  // add new vehicle
  public async addVehicle(cargonautId: number, vehicle: Vehicle): Promise<number> {
    const type = vehicle.type.type;
    const model = vehicle.type.description;
    const length = vehicle.hold.length;
    const height = vehicle.hold.height;
    const width = vehicle.hold.width;
    const seats = vehicle.seats;
    const comment = vehicle.comment;

    const http = this.http;
    return new Promise<number>(async (resolve, reject) => {
      await http.post(' https://mycargonaut.herokuapp.com/api/vehicle/' + cargonautId.toString(), {
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
    const http = this.http;
    return new Promise<boolean>(async (resolve, reject) => {
      await http.delete(' https://mycargonaut.herokuapp.com/api/vehicle/' + vehicleId.toString(), {}).toPromise().then((res: any) => {
        resolve(true);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }


  getVehicleType(type: string): VehicleTypeType {
    switch (type) {
      case('PKW') :
        return VehicleTypeType.PKW;
      case('LKW') :
        return VehicleTypeType.LKW;
      case('Transporter') :
        return VehicleTypeType.BUS;
      case('Flugzeug') :
        return VehicleTypeType.PLANE;
      case('Schiff') :
        return VehicleTypeType.BOAT;
    }
  }

  async getVehicleTypeForVehicle(vehicleId: number): Promise<Vehicle> {
    return new Promise<Vehicle>(async (resolve, reject) => {
      await this.http.get(' https://mycargonaut.herokuapp.com/api/vehicle/' + vehicleId, {
      }).toPromise().then((res: any) => {
        const vehicleData: Vehicle = {id: vehicleId};
        vehicleData.type = {
          type: res.vehicle.art
        };
        resolve(vehicleData);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  getAllVehicleTypes(): VehicleTypeType[] {
    return [
      VehicleTypeType.PKW,
      VehicleTypeType.LKW,
      VehicleTypeType.BUS,
      VehicleTypeType.PLANE,
      VehicleTypeType.BOAT
    ];
  }
}
