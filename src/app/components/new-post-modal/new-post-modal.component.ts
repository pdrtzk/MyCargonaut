import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {DriveStatus, Post, PostType} from '../../../shared/post.model';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleTypeType} from '../../../shared/vehicle-type.model';
import {AccountService} from '../../services/account.service';
import {Vehicle} from '../../../shared/vehicle.model';
import {Hold} from '../../../shared/hold.model';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.css'],
})
export class NewPostModalComponent implements OnInit {


  posttype: boolean; // Angebot: false, Gesuch: true
  vehicles: Vehicle[];
  cities: string[];
  startCity: string;
  endCity: string;
  currVehicle: Vehicle;
  startDate: any;
  startTime: any;
  endDate: any;
  endTime: any;
  description: string;
  filledForm: boolean;
  newPost: Post;
  payment: string[];
  currPayment: string;
  price: number;
  currHold: any;
  currSeats: number;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,
              private vehicleService: VehicleService, private accountService: AccountService) {
  }


  async ngOnInit(): Promise<void> {
    this.posttype = false;

    this.cities = [
      'Stuttgart',
      'München',
      'Berlin',
      'Potsdam',
      'Bremen',
      'Hamburg',
      'Frankfurt am Main',
      'Rostock',
      'Hannover',
      'Köln',
      'Mainz',
      'Saarbrücken',
      'Halle (Saale)',
      'Leipzig',
      'Kiel',
      'Erfurt'
    ];
    this.payment = [
      'EC-Karte',
      'Kreditkarte',
      'PayPal',
      'Bar'
    ];
    this.startCity = undefined;
    this.endCity = undefined;
    this.currVehicle = undefined;
    this.startDate = this.calendar.getToday();
    this.endDate = this.calendar.getToday();
    this.filledForm = true;
    this.posttype = false;
    this.currHold = {
      height: undefined,
      length: undefined,
      width: undefined
    };
    await this.getVehicles();
  }

  getVehicles(): void {
    const currUser = this.accountService.user;
    this.vehicleService.getAllVehicles(currUser.id).then(
      result => {
        this.vehicles = result;
      }
    ).catch(err => {
      console.log('NewPostModal GetVehicles Err');
      console.log(err);
    });
  }

  savePost(): void {

    const todayDate = this.calendar.getToday();

    if (this.posttype && this.currVehicle && this.startDate && this.startDate >= todayDate && this.endDate
      && this.endDate >= this.startDate && this.startCity && this.endCity && this.startTime && this.endTime
      && this.currHold.height && this.currHold.width && this.currHold.length && this.currSeats && this.currPayment
      && this.price) {

      this.filledForm = true;
      // Post erstellen mit werten

      this.closeModal();
    } else {
      this.filledForm = false;
    }

    this.startCity = undefined;
    this.endCity = undefined;
    this.currVehicle = undefined;
  }

  closeModal() {
    this.newPost = {
      startlocation: this.startCity,
      endlocation: this.endCity,
      start_time: this.startDate + this.startTime,
      end_time: this.endDate + this.endTime,
      payment: this.currPayment,
      hold: {
        length: this.currHold.length,
        width: this.currHold.width,
        height: this.currHold.height,
        getSpace(): number {
          return this.length * this.width * this.height;
        }
      },
      vehicle: {
        id: this.currVehicle.id,
        type: this.currVehicle.type,
        seats: this.currSeats,
        comment: this.currVehicle.comment,
      },
      type: (this.returnType(this.posttype)),
      price: this.price,

      description: this.description,
    };
    this.activeModal.close(this.newPost);
  }

  returnType(type: boolean): PostType {
    return type === true ? PostType.OFFER : PostType.SEARCHING;
  }

}
