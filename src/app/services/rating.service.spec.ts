import { TestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';
import {HttpClientModule} from '@angular/common/http';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
