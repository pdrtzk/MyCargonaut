import { Component, OnInit } from '@angular/core';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {Rating} from '../../../shared/rating.model';
import {Address} from '../../../shared/address.model';
import {Vehicle} from '../../../shared/vehicle.model';
import {VehicleType} from '../../../shared/vehicle-type.model';
import {Hold} from '../../../shared/hold.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Cargonaut;
  myuser: Cargonaut;
  ratingsUser: Rating [];
  ratingsMyuser: Rating [];
  vehiclesUser: Vehicle [];

  constructor() {
    let addressUser: Address;
    addressUser = {
      plz: '12345',
      street: 'Musterstraße',
      housenumber: '12a',
      city: 'Musterstadt'
    };
    // user for own profile
    this.myuser = {
      firstname: 'Max',
      lastname: 'Mustermann',
      birthday: new Date(1980, 1, 1),
      email: 'max@mustermann.de',
      password: 'test',
      address: addressUser,
    };
    // user for not own profile
    this.user = {
      firstname: 'Erika',
      lastname: 'Musterfrau',
      birthday: new Date('1994-08-21'),
      email: 'erika@mustermann.de',
      password: 'test',
      address: {},
    };

    let rating1: Rating;
    rating1 = {
      ratingStars: 4,
      comment: 'Guter Preis, aber kam etwas später als vereinbart.',
      author: this.user
    };

    let rating2: Rating;
    rating2 =  {
      ratingStars: 2,
      comment: 'Sitze waren dreckig, Fahrer ungepflegt, aber wir sind angekommen.',
      author: this.user
    };

    let vehicleType1: VehicleType;
    vehicleType1 = {
      type: 'PKW',
      description: 'Audi 5120x'
    };
    let vehicleType2: VehicleType;
    vehicleType2 = {
      type: 'Transporter',
      description: 'Nissan 350z'
    };
    const hold1: Hold = new Hold(3.0, 2.0, 1.5);

    let vehicle1: Vehicle;
    vehicle1 = {
      owner: this.myuser,
      type: vehicleType1,
      comment: 'Sehr verlässlich, unter 2000km.',
      seats: 5,
    };

    let vehicle2: Vehicle;
    vehicle2 = {
      owner: this.myuser,
      type: vehicleType2,
      comment: 'Viel Stauraum.',
      seats: 2,
      hold: hold1
    };

    this.ratingsUser = [rating1, rating2];
    this.vehiclesUser = [vehicle1, vehicle2];
  }

  ngOnInit(): void {
  }

  getStarAverage(): number {
    let result = 0;
    this.ratingsMyuser.forEach(r => result += r.ratingStars);
    return result / this.ratingsMyuser.length;
  }

  getUserName(): string {
    return this.user.firstname + ' ' + this.user.lastname;
  }

  getBirthday(): string {
    return this.user.birthday.toLocaleDateString();
  }

}
