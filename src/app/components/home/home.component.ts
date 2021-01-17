import {Component, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewPostModalComponent} from '../new-post-modal/new-post-modal.component';
import {PostService} from '../../services/post.service';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleTypeType} from '../../../shared/vehicle-type.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {AlertService} from '../alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postArray: Post[] = [];
  vehicles: VehicleTypeType[] = [];
  cities: string[] = [];
  startCity: string;
  endCity: string;
  currVehicle: string;
  filteredPostArray: Post[] = [];
  currPostType: string;
  testCargo: Cargonaut;
  currSearchString: string;

  constructor(private modalService: NgbModal, private postService: PostService,
              private vehicleService: VehicleService,
              private accountService: AccountService,
              private alertService: AlertService) {
    // this.getAllPosts();
    this.testCargo = {
      id: 20,
      firstname: 'Maxine',
      lastname: 'Musterfrau',
      password: 'test',
      email: 'maxine@musterfrau.de',
    };
  }

  async ngOnInit(): Promise<void> {

    this.cities = undefined;
    this.startCity = undefined;
    this.endCity = undefined;
    this.currVehicle = undefined;
    this.postArray = [];
    this.currPostType = undefined;
    this.currSearchString = undefined;

    await this.getAllVehicleTypes();
    await this.getAllCitis();

    await this.getAllPosts();
  }

  // Holt alle Posts
  async getAllPosts(): Promise<void> {
    this.postService.getAllPosts().then(result => {
        this.postArray = result;
        this.filteredPostArray = this.postArray;
      }
    ).catch(err => {
        console.log('Error: ' + err);
      }
    );
  }

  // Holt alle Fahrzeugtypen
  getAllVehicleTypes(): void {
    this.vehicles = this.vehicleService.getAllVehicleTypes();
  }

  // Öffnet das Modal
  showModal() {
    const authUser = this.accountService.user;
    if (this.accountService.user) {
      const modalReference = this.modalService.open(NewPostModalComponent, {size: 'xl'});
      modalReference.result.then(async (result: Post) => {
        this.addNewPost(result, authUser);
      }).catch((error) => {
        console.log('Error: ' + error);
      });
    } else {
      this.alertService.error('Um einen eigenen Post erstellen zu können, müssen Sie sich zuerst registrieren oder anmelden.');
    }
  }

  addNewPost(post: Post, cargo: Cargonaut): void {
    this.postService.createPost(cargo, post).then(async () => {
        await this.getAllPosts();
        this.alertService.success('Sie haben erfolgreich einen neuen Post angelegt.');
      }
    ).catch(err => {
        this.alertService.error('Es konnte kein neuer Post angelegt werden.');
      }
    );
  }

  filter() {
    this.filteredPostArray = this.postArray;

    // Nach Stadt filtern
    if (this.startCity && this.startCity?.trim().length) {
      this.filteredPostArray = this.filteredPostArray.filter(
        post => post.startlocation === this.startCity
      );
    }

    // Nach Art des Angebots filtern
    if (this.currPostType && this.currPostType?.trim().length) {
      this.filteredPostArray = this.filteredPostArray.filter(post => post.type === this.currPostType);
    }

    // Nach Art des Autos filtern
    if (this.currVehicle && this.currVehicle.trim().length) {
      this.filteredPostArray = this.filteredPostArray.filter(post => post.vehicleType === this.currVehicle);
    }

    // Allgemein nach Wort filtern
    if (this.currSearchString && this.currSearchString.trim().length) {
      const filterSearchArr = this.currSearchString.trim().split(/(\s+)/).filter(e => e.trim().length > 0);
      for (const search of filterSearchArr) {

        // Missing: Author, Endlocation, Preis
        this.filteredPostArray = this.filteredPostArray.filter(
          post => post.seats.toString().includes(search)
            || post.startlocation.toLowerCase().includes(search.toLowerCase())
            || post.endlocation.toLowerCase().includes(search.toLowerCase())
            || post.payment.toLowerCase().includes(search.toLowerCase())
            || post.price.toString().includes(search));


        /* this.filteredPostArray = this.filteredPostArray.filter(
          post => post.seats.toString().includes(filterSearchArr[i])
          || post.startlocation.toLowerCase().includes(filterSearchArr[i].toLowerCase())
            || post.endlocation.toLowerCase().includes(filterSearchArr[i])
            || post.payment.toLowerCase().includes(filterSearchArr[i].toLowerCase())
            || post.author.firstname.toLowerCase().includes(filterSearchArr[i])
            || post.author.lastname.toLowerCase().includes(filterSearchArr[i])
            || post.price.toString().includes(filterSearchArr[i])
        ) */
      }

    }

    if (this.filteredPostArray.length === 0) {
      this.alertService.info('Zu ihren Sucheinstellungen gibt es leider keine passenden Posts!', {autoClose: true});
    }

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
