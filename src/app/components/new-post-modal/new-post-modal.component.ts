import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {Post} from "../../../shared/post.model";

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.css'],
})
export class NewPostModalComponent implements OnInit {


  posttype: boolean; // Angebot: false, Gesuch: true
  vehicles: string [];
  cities: string[];
  startCity: string;
  endCity: string;
  currVehicle: string;
  startDate: any;
  endDate: any;
  description: string;
  filledForm: boolean;
  newPost: Post;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal) {
  }


  ngOnInit(): void {
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
    this.startCity = undefined;
    this.endCity = undefined;
    this.currVehicle = undefined;
    this.startDate = this.calendar.getToday();
    this.endDate = this.calendar.getToday();
    this.filledForm = true;

    this.getAllVehicleTypes();

  }

  getAllVehicleTypes(): void {
    // use vehicle-Service to get Vehicletypes
    this.vehicles = [
      'PKW',
      'LKW',
      'Fahrrad',
      'Anhänger'
    ];
  }

  savePost(): void {

    const todayDate = this.calendar.getToday();

    if (this.posttype && this.currVehicle && this.startDate && this.startDate >= todayDate && this.endDate
      && this.endDate >= this.startDate && this.startCity && this.endCity) {

      this.filledForm = true;
      // Post erstellen mit werten

      console.log('Posttype: ' + this.posttype);
      console.log('Vehicletype: ' + this.currVehicle);
      console.log('Startdate: ' + JSON.stringify(this.startDate));
      console.log('Enddate: ' + JSON.stringify(this.endDate));
      console.log('StartCity: ' + this.startCity);
      console.log('EndCity: ' + this.endCity);
      console.log('Description: ' + this.description);

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
      type: this.returnType(this.posttype),
      vehicle: {
        type: {
          type: this.currVehicle
        }
      },
      start_time: this.startDate,
      end_time: this.endDate,
      author: {
        firstname: 'Tina',
        lastname: 'Turner'
      }
    }
    this.activeModal.close(this.newPost);
  }

  returnType(type: boolean): string {
    return type == true ? 'Gesuch' : 'Angebot'
  }

}
