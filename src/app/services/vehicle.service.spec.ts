import {TestBed} from '@angular/core/testing';

import {VehicleService} from './vehicle.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Vehicle} from '../../shared/vehicle.model';
import {Hold} from '../../shared/hold.model';
import {VehicleTypeType} from '../../shared/vehicle-type.model';
import {defer, of} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Data} from '@angular/router';

describe('VehicleService', () => {
  let service: VehicleService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = new VehicleService(httpClient);
  });

  afterEach(() => {
    // no pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllVehicles should return expected vehicles, be a GET request)', () => {
    const expectedVehicles: Vehicle[] =
      [
        {
          id: 20, comment: 'Zuverlässig', seats: 2, hold: new Hold(1, 1, 1),
          type: {type: VehicleTypeType.PKW, description: 'ToBe2012'}
        }
      ];
    const testData = {vehicles: [{id: 20, art: 'PKW', anzahl_sitzplaetze: 2, ladeflaeche: 25, besitzer: 12, kommentar: 'Test', modell: 'ToBe2012'}]};

    service.getAllVehicles(12).then(
      res => {
        expect(res[0].seats).toEqual(testData.vehicles[0].anzahl_sitzplaetze);
        expect(res[0].type.type).toEqual(testData.vehicles[0].art);
        expect(res[0].id).toEqual(testData.vehicles[0].id);
        expect(res[0].comment).toEqual(testData.vehicles[0].kommentar);
        expect(res[0].type.description).toEqual(testData.vehicles[0].modell);
      }
    );
    const req = httpTestingController.expectOne('http://localhost:4200/api/vehicles/12');
    expect(req.request.method).toEqual('GET');
    req.flush(testData); // return data
    httpTestingController.verify(); // no outstandig requests
  });

  it('getVehicleHold should return expected hold, be a GET request)', () => {
    const exVehicle: Vehicle =
        {
          id: 20, comment: 'Test', seats: 2, hold: new Hold(1, 1, 1),
          type: {type: VehicleTypeType.PKW, description: 'ToBe2012'}
        };

    const testData = {vehicles: [{id: 20, art: 'PKW', anzahl_sitzplaetze: 2, ladeflaeche: 25, besitzer: 12, kommentar: 'Test', modell: 'ToBe2012'}]};

    service.getAllVehicles(12).then(
      res => {
        expect(res[0].seats).toEqual(exVehicle.seats);
        expect(res[0].type.type).toEqual(exVehicle.type.type);
        expect(res[0].id).toEqual(exVehicle.id);
        expect(res[0].comment).toEqual(exVehicle.comment);
        expect(res[0].type.description).toEqual(exVehicle.type.description);
      }
    );
    const req = httpTestingController.expectOne('http://localhost:4200/api/vehicles/12');
    expect(req.request.method).toEqual('GET');
    req.flush(testData); // return data
    httpTestingController.verify(); // no outstandig requests
  });

  it('getVehicleHold should return expected info and be a GET request)', () => {
    const exVehicle: Vehicle =
      {
        id: 20, comment: 'Test', seats: 2, hold: new Hold(0, 0, 0),
        type: {type: VehicleTypeType.PKW, description: 'ToBe2012'}
      };
    const testData = {vehicle: {id: 20, art: 'PKW', anzahl_sitzplaetze: 2, ladeflaeche: 25, besitzer: 12, kommentar: 'Test', modell: 'ToBe2012'}, hold: {id: 25, ladeflaeche_laenge_cm: 1, ladeflaeche_breite_cm: 1, ladeflaeche_hoehe_cm: 1}};

    service.getVehicleHold(exVehicle).then(
      res => { // res: new vehicle
        expect(res.hold.length).toEqual(1);
        expect(res.hold.width).toEqual(1);
        expect(res.hold.height).toEqual(1);
      }
    );
    const req = httpTestingController.expectOne('http://localhost:4200/api/vehicle/20');
    expect(req.request.method).toEqual('GET');
    req.flush(testData); // return data
    httpTestingController.verify(); // no outstandig requests
  });

  it('updateVehicle should return expected info and be a PUT request)', () => {
    const newVehicle: Vehicle =
      {
        id: null, comment: 'Test', seats: 2, hold: new Hold(1, 1, 1),
        type: {type: VehicleTypeType.PKW, description: 'ToBe2012'}
      };

    const testData = {message: 'Neues Fahrzeug erstellt!', createdVehicle: 20};

    service.addVehicle(12, newVehicle).then(
      res => { // res: new vehicle
        expect(res).toEqual(20); // newly assigned id of created vehicle
      }
    );
    const req = httpTestingController.expectOne('http://localhost:4200/api/vehicle/12'); // 12 is owner
    expect(req.request.method).toEqual('POST');
    req.flush(testData); // return data
    httpTestingController.verify(); // no outstandig requests

    // now update
    newVehicle.id = 20;
    newVehicle.comment = 'new comment';
    const testData2 = {message: 'Fahrzeug aktualisiert!', createdVehicle: 0};

    service.updateVehicle( newVehicle).then(
      res => { // res: new vehicle
        expect(res).toEqual('Fahrzeug aktualisiert!');
      }
    );
    const req2 = httpTestingController.expectOne('http://localhost:4200/api/vehicle/20'); // 12 is owner
    expect(req2.request.method).toEqual('PUT');
    req2.flush(testData2); // return data
    httpTestingController.verify(); // no outstandig requests
  });

  it('addVehicle should return created vehicle and be a POST request)', () => {
    const newVehicle: Vehicle =
      {
        id: null, comment: 'Test', seats: 2, hold: new Hold(1, 1, 1),
        type: {type: VehicleTypeType.PKW, description: 'ToBe2012'}
      };

    const testData = {message: 'Neues Fahrzeug erstellt!', createdVehicle: 20};

    service.addVehicle(12, newVehicle).then(
      res => { // res: new vehicle
        expect(res).toEqual(20); // newly assigned id of created vehicle
      }
    );
    const req = httpTestingController.expectOne('http://localhost:4200/api/vehicle/12'); // 12 is owner
    expect(req.request.method).toEqual('POST');
    req.flush(testData); // return data
    httpTestingController.verify(); // no outstandig requests
  });

  it('deleteVehicle should delete vehicle and be a DELETE request)', () => {
    const newVehicle: Vehicle =
      {
        id: 20, comment: 'Test', seats: 2, hold: new Hold(1, 1, 1),
        type: {type: VehicleTypeType.PKW, description: 'ToBe2012'}
      };

    const testData = {message: 'Fahrzeug gelöscht'};

    service.deleteVehicle(newVehicle.id).then(
      res => { // res: new vehicle
        expect(res).toEqual(true); // newly assigned id of created vehicle
      }
    );
    const req = httpTestingController.expectOne('http://localhost:4200/api/vehicle/20'); // 12 is owner
    expect(req.request.method).toEqual('DELETE');
    req.flush(testData); // return data
    httpTestingController.verify(); // no outstandig requests
  });

});
