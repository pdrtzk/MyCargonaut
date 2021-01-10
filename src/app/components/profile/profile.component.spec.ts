import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {MatDialogModule} from '@angular/material/dialog';
import {VehicleService} from '../../services/vehicle.service';
import {RatingService} from '../../services/rating.service';
import {ActivatedRoute} from '@angular/router';
import {of, Subject} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {EditProfileComponent} from '../profileComponents/edit-profile/edit-profile.component';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {Vehicle} from '../../../shared/vehicle.model';
import {VehicleTypeType} from '../../../shared/vehicle-type.model';
import {Hold} from '../../../shared/hold.model';
import {Rating} from '../../../shared/rating.model';
import {AddVehicleComponent} from '../profileComponents/add-vehicle/add-vehicle.component';
import {ProfileVehicleComponent} from '../profileComponents/profile-vehicle/profile-vehicle.component';
import {ProfileRatingComponent} from '../profileComponents/profile-rating/profile-rating.component';


class MockRatingService extends RatingService {

}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let componentAccService: AccountService;
  let accService: AccountService;
  let accStub: Partial<AccountService>;

  let componentVehicleService: VehicleService;
  let vehicleService: VehicleService;
  let vehicleStub: Partial<VehicleService>;

  let componentRatingService: RatingService;
  let ratingService: RatingService;
  let ratingStub: Partial<RatingService>;

  const user: Cargonaut = {
    id: 12,
    firstname: 'Test',
    lastname: 'Cargonaut',
    birthday: new Date('1990-12-12'),
    email: 'test@test.de'
  };

  const userSubject: Subject<Cargonaut> = new Subject<Cargonaut>();

  const vehicle: Vehicle = {
    id: 20,
    comment: '',
    seats: 4,
    type: {
      type:  VehicleTypeType.PKW,
      description: 'A123'
    },
    hold: new Hold(1, 1, 1)
  };

  const rating: Rating = {
    ratingStars: 5,
    comment: 'Alles klasse',
    author: user,
    id: 43
  };

  accStub = {
    userSubject,
    get user() {
      return user;
    },
    isLoggedIn() {
      return Promise.resolve(true);
    },
    update(userC: Cargonaut) {
      return Promise.resolve();
    },
    get(cargonautId: number){
      return Promise.resolve(user);
    }
  };

  vehicleStub = {
    getAllVehicles(cargonautId: number): Promise<Vehicle[]> {
      return Promise.resolve([vehicle]);
    },
    getVehicleHold(ve: Vehicle){
      return Promise.resolve(ve);
    },
    updateVehicle(ve: Vehicle){
      return Promise.resolve('Fahrzeug wurde aktualisiert');
    },
    deleteVehicle(veId: number){
      return Promise.resolve(true);
    },
    addVehicle(cargonautId: number, ve: Vehicle) {
      return Promise.resolve(20);
    }
  };

  ratingStub = {
    getRatingsForUser(cargonautId: number) {
      return Promise.resolve([rating]);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent, EditProfileComponent, AddVehicleComponent, ProfileVehicleComponent, ProfileRatingComponent ],
      imports: [
        FormsModule, ReactiveFormsModule,  MatDialogModule, RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: accStub },
        { provide: VehicleService, useValue: vehicleStub },
        { provide: RatingService, useValue: ratingStub },
        {provide: ActivatedRoute,   useValue: {  paramMap: of({ get: (id) => '12' })
         }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    accService = fixture.debugElement.injector.get(AccountService);
    componentAccService  = accService;
    accService = TestBed.inject(AccountService);

    vehicleService = fixture.debugElement.injector.get(VehicleService);
    componentVehicleService  = vehicleService;
    vehicleService = TestBed.inject(VehicleService);

    ratingService = fixture.debugElement.injector.get(RatingService);
    componentRatingService  = ratingService;
    ratingService = TestBed.inject(RatingService);

    componentAccService.userSubject = new Subject<Cargonaut>();
    componentAccService.userSubject.next(
      {
        id: 12,
        firstname: 'Test',
        lastname: 'Cargonaut',
        birthday: new Date('1990-12-12'),
        email: 'test@test.de'
      }
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if own profile,  contact button should not be rendered', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect( compiled.querySelector('#contact-button')).toBeNull();
  });

  it('if not own profile,  contact button should be rendered', () => {
    component.ownProfile = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect( compiled.querySelector('#contact-button')).not.toBeNull();
  });

  it('name should be displayed either way', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect( compiled.querySelector('.editTitle').innerHTML).toEqual('Test Cargonaut');
  });

  it('#addVehicle-button should call #addVehicle', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'addVehicle');
    const button = compiled.querySelector('#addVehicle-button');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.addVehicle).toHaveBeenCalled();
  }));

  it('#updatePW-button should call openUpdatePWDialog()', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'openUpdatePWDialog');
    const button = compiled.querySelector('#updatePW-button');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.openUpdatePWDialog).toHaveBeenCalled();
  }));

  it('#picButton should call editPic()', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'editPic');
    const button = compiled.querySelector('#picButton');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.editPic).toHaveBeenCalled();
  }));

  it('#deleteuser-button should call deleteUserConfirm()', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(component, 'deleteUserConfirm');
    const button = compiled.querySelector('#deleteuser-button');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.deleteUserConfirm).toHaveBeenCalled();
  }));

  it('on callback from child for editing profile, user should be updated', fakeAsync(() => {
    const newUser: Cargonaut =  {
      id: 12,
      firstname: 'NewFirstname',
      lastname: 'Cargonaut',
      birthday: new Date('1990-12-12'),
      email: 'test@test.de'
    };
    component.submitEditUser(newUser);
    tick();
    fixture.detectChanges();
    const cargo = component.getUser();
    expect(cargo).toEqual(newUser);
  }));

  it('on callback from child for editing vehicle, the given vehicle should be updated', fakeAsync(() => {
    const oldVehicle: Vehicle =  {
      id: 20,
      comment: '',
      seats: 4,
      type: {
        type:  VehicleTypeType.PKW,
        description: 'A123'
      },
      hold: new Hold(1, 1, 1)
    };
    component.vehiclesUser.push(oldVehicle);
    const newVehicle: Vehicle =  {
      id: 20,
      comment: '',
      seats: 4,
      type: {
        type:  VehicleTypeType.PKW,
        description: 'NewMOdell29'
      },
      hold: new Hold(1, 1, 1)
    };
    component.submitEditVehicle(newVehicle);
    tick();
    fixture.detectChanges();
    const cargo = component.vehiclesUser[0];
    expect(cargo).not.toEqual(oldVehicle);
  }));

  it('on callback to delete vehicle, vehicle should be deleted', fakeAsync(() => {
    const oldVehicle: Vehicle =  {
      id: 20,
      comment: '',
      seats: 4,
      type: {
        type:  VehicleTypeType.PKW,
        description: 'A123'
      },
      hold: new Hold(1, 1, 1)
    };
    component.vehiclesUser.push(oldVehicle);
    expect(component.vehiclesUser.length).toEqual(1);
    component.submitDeleteVehicle(oldVehicle);
    tick();
    fixture.detectChanges();
    expect(component.vehiclesUser.length).toEqual(0);
  }));

  it('on callback to add vehicle, vehicle should be added', fakeAsync(() => {
    const newVehicle: Vehicle =  {
      id: null,
      comment: '',
      seats: 4,
      type: {
        type:  VehicleTypeType.PKW,
        description: 'A123'
      },
      hold: new Hold(1, 1, 1)
    };
    expect(component.vehiclesUser.length).toEqual(0);
    component.addVehicleToDatabase(newVehicle);
    tick();
    fixture.detectChanges();
    expect(component.vehiclesUser.length).toEqual(1);
  }));




});
