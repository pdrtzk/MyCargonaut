import {Component, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postArray: Post[] = [];
  vehicles: string[] = [];
  cities: string[];
  startCity: string;
  endCity: string;
  currVehicle: string;

  constructor() {
  }

  ngOnInit(): void {
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
}
