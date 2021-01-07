import {Component, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewPostModalComponent} from "../new-post-modal/new-post-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postArray: Post[] = [];
  vehicles: string[] = [];
  cities: string[] = [];
  startCity: string;
  endCity: string;
  currVehicle: string;
  filteredPostArray: Post[] = []
  currPostType: string;

  constructor(private modalService: NgbModal) {
    this.postArray = this.usePosts();
  }

  ngOnInit(): void {

    this.cities = undefined;
    this.startCity = undefined;
    this.endCity = undefined;
    this.currVehicle = undefined;
    this.postArray = this.usePosts();
    this.currPostType = undefined;

    this.getAllVehicleTypes();
    this.getAllCitis();

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

  showModal() {
    const modalReference = this.modalService.open(NewPostModalComponent, {size: 'lg'});
    modalReference.result.then((result: any) => {
      console.log('success');
      // hier die posts neu laden
      this.postArray.push(result);
    }).catch((error) => {
      console.log('Windowclosed: ' + error);
    });
  }

  /* filter() {
    this.filteredPostArray = this.postArray;

    if (this.startCity && this.startCity.trim().length){
      this.filteredPostArray = this.filteredPostArray.filter(
        post => post.startlocation
      )
    }
    if (this.currVehicle && this.currVehicle.trim().length){
      this.filteredPostArray = this.filterSpec(this.currVehicle, 'vehicle.type.type', this.filteredPostArray);
    }
    if (this.startCity && this.startCity.trim().length){
      this.filteredPostArray = this.filterSpec(this.startCity, 'startlocation.city', this.filteredPostArray);
    }

  } */

  usePosts(): Post[] {
    return [
      {
        author: {
          firstname: 'Max',
          lastname: 'Mustermann'
        },
        type: 'Angebot',
        start_time: new Date(2021, 1, 6, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        /*        startlocation: {
                  city: 'Gießen'
                },
                endlocation: {
                  city: 'Frankfurt'
                },*/
        vehicle: {
          type: {
            type: 'PKW'
          },
        },
        seats: 3,
      }, {
        author: {
          firstname: 'Lisa',
          lastname: 'Müller'
        },
        type: 'Gesuch',
        start_time: new Date(2021, 1, 8, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        /*startlocation: {
           city: 'Gießen'
         },
         endlocation: {
           city: 'München'
         },*/
        vehicle: {
          type: {
            type: 'PLANE'
          }
        },
        seats: 7,
      }, {
        author: {
          firstname: 'Angela',
          lastname: 'Merkel'
        },
        start_time: new Date(2021, 1, 11, 5, 30),
        end_time: new Date(2020, 12, 32, 10, 30),
        /*        startlocation: {
                  city: 'Linden'
                },
                endlocation: {
                  city: 'Nürnberg'
                },*/
        vehicle: {
          type: {
            type: 'LKW',
          }
        },
        seats: 2,
      }
    ];
  }

  getAllCitis() {
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
  }

}
