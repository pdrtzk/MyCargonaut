import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbModule, NgbDatepicker, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {Post} from '../../../shared/post.model';
import {FormsModule} from '@angular/forms';

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

  constructor(private calendar: NgbCalendar) {
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

      // Modal schließen
    } else {
      this.filledForm = false;
    }

    this.startCity = undefined;
    this.endCity = undefined;
    this.currVehicle = undefined;
  }


}
