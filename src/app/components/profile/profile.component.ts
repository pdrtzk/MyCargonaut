import {Component, OnInit} from '@angular/core';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {Rating} from '../../../shared/rating.model';
import {Vehicle} from '../../../shared/vehicle.model';
import {VehicleType, VehicleTypeType} from '../../../shared/vehicle-type.model';
import {Hold} from '../../../shared/hold.model';
import { DatePipe } from '@angular/common';

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
  ratingsUser: Rating [] = [];
  vehiclesUser: Vehicle [] = [];
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
    this.getVehiclesForUser();

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

    console.log('Firstname:' + this.user.firstname);
    console.log(this.user.id);

    this.ratingsUser = [rating1, rating2];
    // todo: get ratings and vehicles for user
  }

  async getVehiclesForUser(): Promise<void> {
    let tempVehicles: Vehicle[];
    await this.vehicleService.getAllVehicles(this.user.id).then(
      res => {
        tempVehicles = res;
      }
    );
    tempVehicles.forEach(async elem => {
      await this.vehicleService.getVehicleHold(elem).then(
        res => {
          this.vehiclesUser.push(res);
        });
      });
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

  async submitDeleteVehicle(car: Vehicle): Promise<void> {
    await this.vehicleService.deleteVehicle(car.id).then(
      res => {
        const index = this.vehiclesUser.findIndex(s => s.id === car.id);
        if (index > -1) {
          this.vehiclesUser.splice(index, 1);
        }
      }
    );
  }

  async addVehicleToDatabase(vehicle: Vehicle): Promise<void> {
    await this.vehicleService.addVehicle(this.user.id, vehicle).then(
      res => {
        vehicle.id = res;
        this.vehiclesUser.push(vehicle);
      },
      error => {
        const errorMsg = 'Fahrzeug konnte nicht hinzugefügt werden.' + error;
        document.getElementById('profileErrorAdd').innerHTML = errorMsg;
      }
    );
  }

  addVehicle(): void {
    const test = this.dialog.open(AddVehicleComponent);
    const sub = test.componentInstance.submitCallback.subscribe((result: Vehicle) => {
      this.addVehicleToDatabase(result);
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
