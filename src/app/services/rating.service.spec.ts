import {TestBed} from '@angular/core/testing';

import {RatingService} from './rating.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Rating} from '../../shared/rating.model';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('RatingService', () => {
  let service: RatingService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const rating: Rating = {
    comment: 'This is a test rating.',
    ratingStars: 4,
    author: {
      id: 12
    },
    trip: {
      id: 1
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new RatingService(httpClient);
  });

  afterEach(() => {
    // no pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save rating', async () => {
    const testRating: Rating = {
      comment: 'test',
      ratingStars: 4,
      author: {
        id: 32
      },
      trip: {
        id: 1
      }
    };

    const result = {message: 'Bewertung abgegben'};
    service.addRating(testRating).then(
      res => {
      }
    );
    const req = httpTestingController.expectOne(' https://mycargonaut.herokuapp.com/api/bewertung/32');
    expect(req.request.method).toEqual('POST');
    req.flush(result);
    httpTestingController.verify();
  });

  it('getRatingsForUser should be a GET request and return the expected ratings', () =>
  {
    const testData = { ratings: [{ comment: 'This is a test rating.', ratingStars: 4, author: {id: 12 },
          trip: {id: 1}}]};
    service.getRatingsForUser(12).then(
      res => {
        expect(res.length).toEqual(1);
        expect(res[0].ratingStars).toEqual(4);
      }
    );
    const req = httpTestingController.expectOne(' https://mycargonaut.herokuapp.com/api/bewertungen/12');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

});
