import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {PostService} from './post.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Post, PostType} from '../../shared/post.model';
import {Hold} from '../../shared/hold.model';
import {Vehicle} from '../../shared/vehicle.model';
import {Cargonaut} from '../../shared/cargonaut.model';

describe('PostService', () => {
  let service: PostService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(PostService);
  });

  afterEach(() => {
    // no pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

function getPosts() {
  const testPost: Post[] = [
    {
      startlocation: 'Berlin',
      endlocation: 'Potsdam',
      start_time: new Date(2021, 1, 2, 12, 12, 12, 12),
      end_time: new Date(2021, 1, 2, 12, 12, 12, 12),
      payment: 'EC',
      hold: new Hold(1, 2, 3),
      vehicle: new Vehicle(),
      seats: 2,
      vehicleType: 'PKW',
      type: PostType.SEARCHING,
      author: {
        id: 1
      },
      price: 10,
      description: 'Eine Description'
    },
    {
      startlocation: 'Hamburg',
      endlocation: 'Kiel',
      start_time: new Date(2021, 1, 10, 12, 12, 12, 12),
      end_time: new Date(2021, 1, 11, 12, 12, 12, 12),
      payment: 'PayPal',
      hold: new Hold(3, 2, 1),
      vehicle: new Vehicle(),
      seats: 2,
      vehicleType: 'PKW',
      type: PostType.OFFER,
      author: {
        id: 1
      },
      price: 20,
      description: 'Eine weitere Description'
    }
  ];
}

