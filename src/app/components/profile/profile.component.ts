import {Component, OnInit} from '@angular/core';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {Rating} from '../../../shared/rating.model';
import {Vehicle} from '../../../shared/vehicle.model';
import {VehicleType, VehicleTypeType} from '../../../shared/vehicle-type.model';
import {Hold} from '../../../shared/hold.model';
import { DatePipe } from '@angular/common'

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {AddVehicleComponent} from '../profileComponents/add-vehicle/add-vehicle.component';
import {VehicleService} from '../../services/vehicle.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})

export class ProfileComponent implements OnInit {
  user: Cargonaut; // the user to whom the profile belongs to - get through id from service later on
  myuser: Cargonaut; // the logged in user - get from service later
  ratingsUser: Rating [];
  vehiclesUser: Vehicle [];
  ownProfile: boolean;

  picsrc: string | ArrayBuffer = '../../../assets/images/person-placeholder.jpg';
  submitted = false;


  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe, private accountService: AccountService, private vehicleService: VehicleService, private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.myuser = this.accountService.user;
    this.user = this.myuser; // todo: remove
    this.ownProfile = true; // or false, depending on id

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
      type: VehicleTypeType.PKW,
      description: 'Audi 5120x'
    };
    let vehicleType2: VehicleType;
    vehicleType2 = {
      type: VehicleTypeType.LKW,
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


    console.log('Firstname:' + this.user.firstname);
    console.log(this.user.id);

    this.ratingsUser = [rating1, rating2];
    this.vehiclesUser = [vehicle1, vehicle2];

    // todo: get ratings and vehicles for user
  //  this.vehicleService.getAllVehicles(this.user.id);

  }

  getStarAverage(): number {
    let result = 0;
    this.ratingsUser.forEach(r => result += r.ratingStars);
    return result / this.ratingsUser.length;
  }

  getUser(): Cargonaut {
    return this.user;
  }

  getUserName(): string {
    return this.user.firstname + ' ' + this.user.lastname;
  }

  getBirthday(): string {
    return this.datepipe.transform(this.user.birthday, 'yyyy-MM-dd');
  }

  getBirthdayFormat(): string {
    return this.datepipe.transform(this.user.birthday, 'dd.MM.yyyy');
  }

  editProfile(): void {
    document.getElementById('editProfileForm').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
  }

  cancelPic(): void {
    document.getElementById('picButton').style.display = 'block';
    document.getElementById('edit-profile-pic').style.display = 'none';
  }

  editPic(): void {
    document.getElementById('picButton').style.display = 'none';
    document.getElementById('edit-profile-pic').style.display = 'block';
  }

  submitEditUser(user: Cargonaut): void {
    // todo: error
    // todo: send to service
    this.user = user;
    console.log('ok');
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

  addVehicle(): void {
    const test = this.dialog.open(AddVehicleComponent);
    const sub = test.componentInstance.submitCallback.subscribe((result: Vehicle) => {
      console.log(result.seats);
      this.vehiclesUser.push(result);
    });
    test.afterClosed().subscribe(() => {
    });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.picsrc = event.target.result;
      };
    }
  }
}
