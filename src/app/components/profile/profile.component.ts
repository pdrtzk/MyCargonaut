import { Component, OnInit } from '@angular/core';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {Rating} from '../../../shared/rating.model';
import {Address} from '../../../shared/address.model';
import {Vehicle} from '../../../shared/vehicle.model';
import {VehicleType} from '../../../shared/vehicle-type.model';
import {Hold} from '../../../shared/hold.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Cargonaut; // the user to whom the profile belongs to - get through id from service later on
  myuser: Cargonaut; // the logged in user - get from service later
  ratingsUser: Rating [];
  vehiclesUser: Vehicle [];
  ownProfile: boolean;

  editProfileForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
    let addressUser: Address;
    addressUser = {
      plz: '12345',
      street: 'Musterstraße',
      housenumber: '12a',
      city: 'Musterstadt'
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
      type: 'pkw',
      description: 'Audi 5120x'
    };
    let vehicleType2: VehicleType;
    vehicleType2 = {
      type: 'bus',
      description: 'Nissan 350z'
    };
    const hold1: Hold = new Hold(3.0, 2.0, 1.5);

    let vehicle1: Vehicle;
    vehicle1 = {
      id: 1,
      owner: this.myuser,
      type: vehicleType1,
      comment: 'Sehr verlässlich, unter 2000km.',
      seats: 5,
    };

    let vehicle2: Vehicle;
    vehicle2 = {
      id: 2,
      owner: this.myuser,
      type: vehicleType2,
      comment: 'Viel Stauraum.',
      seats: 2,
      hold: hold1
    };

    // to test own profile
  //  this.user = this.myuser;

    this.ratingsUser = [rating1, rating2];
    this.vehiclesUser = [vehicle1, vehicle2];

    // todo: get user, ratings and vehicles for user
    this.myuser = this.accountService.user;
    console.log('???');
    console.log(this.myuser.firstname);
    console.log(this.myuser.lastname);
    this.user = this.myuser;

    this.editProfileForm = this.formBuilder.group({
      firstName: [this.user.firstname, Validators.required],
      lastName: [this.user.lastname, Validators.required],
      birthday: [this.user.birthday, Validators.required],
      street: [this.user.address.street, Validators.required],
      housenumber: [this.user.address.housenumber, Validators.required],
      plz: [this.user.address.plz, Validators.required],
      city: [this.user.address.city, Validators.required],
    });

  }

  ngOnInit(): void {

    this.ownProfile = true; // or false, depending on id
  }

  getStarAverage(): number {
    let result = 0;
    this.ratingsUser.forEach(r => result += r.ratingStars);
    return result / this.ratingsUser.length;
  }

  getUserName(): string {
    return this.user.firstname + ' ' + this.user.lastname;
  }

  getBirthday(): string {
    return this.user.birthday.toLocaleDateString();
  }

  editProfile(): void {
    document.getElementById('editProfileForm').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid) {
      return;
    }
    // todo: send to service
    this.user.firstname = this.editProfileForm.controls.firstName.value;
    this.user.lastname = this.editProfileForm.controls.lastName.value;
    this.user.birthday = this.editProfileForm.controls.birthday.value;
    this.user.address.street = this.editProfileForm.controls.street.value;
    this.user.address.housenumber = this.editProfileForm.controls.housenumber.value;
    this.user.address.plz = this.editProfileForm.controls.plz.value;
    this.user.address.city = this.editProfileForm.controls.city.value;
    document.getElementById('editProfileForm').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
  }

  cancelEditProfile(): void {
    document.getElementById('editProfileForm').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
  }

  // callback from child form
  submitEditVehicle(car: Vehicle): void {
    const index = this.vehiclesUser.findIndex(s => s.id === car.id);
    this.vehiclesUser[index] = car;
    // todo: submit car via service
  }

  submitDeleteVehicle(car: Vehicle): void {
    const index = this.vehiclesUser.findIndex(s => s.id === car.id);
    // todo: submit car via service
    if (index > -1) {
      this.vehiclesUser.splice(index, 1);
    }
  }

}
