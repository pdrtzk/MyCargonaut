import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {Rating} from '../../../shared/rating.model';
import {Vehicle} from '../../../shared/vehicle.model';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {AddVehicleComponent} from '../profileComponents/add-vehicle/add-vehicle.component';
import {VehicleService} from '../../services/vehicle.service';
import {RatingService} from '../../services/rating.service';
import {AlertService} from '../alert/alert.service';
import {Router} from '@angular/router';
import {UpdatePasswordComponent} from '../profileComponents/update-password/update-password.component';


@Component({
 // encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})

export class ProfileComponent implements OnInit {
  user: Cargonaut = {}; // the profile owner
  myuser: Cargonaut = {}; // the logged in user
  ratingsUser: Rating [] = [];
  vehiclesUser: Vehicle [] = [];
  ownProfile: boolean;

  picsrc: string | ArrayBuffer = '../../../assets/images/person-placeholder.jpg';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private accountService: AccountService,
    private vehicleService: VehicleService,
    private ratingsService: RatingService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.myuser = value); // get latest user object, in case of update user or logout
    console.log(this.accountService.isLoggedIn()); // get newest user after
    this.myuser = this.accountService.user;
    this.route.paramMap.subscribe( paramMap => {
      this.user.id = parseFloat(paramMap.get('id'));
      this.getProfileUser().then();
      this.getVehiclesForUser().then();
      this.getRatingsForUser().then();
    });
  }

  async getProfileUser(): Promise<void> {
    if (this.user.id === this.myuser.id) {
      this.user = this.myuser;
      this.ownProfile = true;
    } else {
      this.ownProfile = false;
      this.user = await this.accountService.get(this.user.id);
    }
  }

  async getVehiclesForUser(): Promise<void> {
    let tempVehicles: Vehicle[];
    this.vehiclesUser = []; // deletes all elements
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

  async getRatingsForUser(): Promise<void> {
    let tempRatings: Rating[] = [];
    this.ratingsUser.length = 0; // deletes all elements
    await this.ratingsService.getRatingsForUser(this.user.id).then(
      res => {
        tempRatings = res;
      }
    );
    tempRatings.forEach(async elem => {
      const temp = elem.author.id;
      elem.author = await this.accountService.get(elem.author.id).then();
      elem.author.id = temp;
      this.ratingsUser.push(elem);
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
    this.accountService.update(user).then(() => {
      this.user = user;
      document.getElementById('editProfileForm').style.display = 'none';
      document.getElementById('user-info').style.display = 'block';
      this.alertService.success('Profil wurde erfolgreich bearbeitet.');
    }, () => this.alertService.error('Profil konnte nicht bearbeitet werden.'));

  }

  // callback from child form
  submitEditVehicle(car: Vehicle): void {
    this.vehicleService.updateVehicle(car).then(
      res => {
        const index = this.vehiclesUser.findIndex(s => s.id === car.id);
        this.vehiclesUser[index] = car;
        this.alertService.success('Fahrzeug wurde erfolgreich bearbeitet.');
      },
      error => {
        this.alertService.error('Fahrzeug konnte nicht bearbeitet werden.');
      }
    );
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
      reader.readAsDataURL(event.target.files[0]);

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.picsrc = event.target.result;
        console.log(event.target.result);
      };
    }
  }

  deleteUserConfirm() {
    if ( confirm('Soll dieser Account wirklich permanent gelöscht werden?')) {
      this.deleteUser();
    }
  }

  openUpdatePWDialog(){
    const test = this.dialog.open(UpdatePasswordComponent);
    const sub = test.componentInstance.submitCallback.subscribe((result: string) => {
      this.changePassword(result);
    });
    test.afterClosed().subscribe(() => {
    });
  }

  deleteUser() {
    this.accountService.delete(this.myuser).then(() => {
      this.alertService.success('Cargonaut wurde gelöscht.', {keepAfterRouteChange: true});
      this.router.navigate(['/']).then();
    }, error => {
      this.alertService.error('Cargonaut konnte nicht gelöscht werden.');
    });
  }

  changePassword(password: string) {
    this.accountService.updatePassword(this.myuser, password).then(() => {
      this.alertService.success('Passwort erfolgreich geändert.');
    }, error => {
      this.alertService.error('Passwort konnte nicht geändert werden.');
    });
  }

  navigateToChat(){
    this.router.navigate(['/chats']);
  }
}
