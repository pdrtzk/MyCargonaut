import {TestBed} from '@angular/core/testing';

import {RatingService} from './rating.service';
import {HttpClientModule} from '@angular/common/http';
import {Rating} from '../../shared/rating.model';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(RatingService);
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

    // todo
    // await service.addRating(testRating);

    // const ratings: Rating[] = await service.getRatingsForUser(32);

    // expect(ratings).toContain(testRating);

  });
});
