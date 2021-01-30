import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {BookingService} from './booking.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DriveStatus} from '../../shared/post.model';

describe('BookingService', () => {
  let service: BookingService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new BookingService(httpClient);
  });

  it('getBookingsForCargonaut should send GET request', () => {
    const testData = {
      bookings: [
        {id: 1, ladeflaeche: 50, gebucht_von: 32, post: 1},
        {id: 2, post: 2, ladeflaeche: 30, gebucht_von: 2}
      ]
    };

    service.getBookingsForCargonaut(12).then(res => {
      expect(res.length).toEqual(1);
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/buchungen/12');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('addBooking should send PUSH request', async () => {
    service.addBooking(1, 12);
    const req = httpTestingController.expectOne('http://localhost:4200/api/buchung/12');
    expect(req.request.method).toEqual('POST');
    httpTestingController.verify();
  });

  it('updateStatus should update booking status', async () => {
    const testData = {
      bookings: [
        {id: 1, ladeflaeche: 50, gebucht_von: 32, post: 1},
        {id: 2, post: 2, ladeflaeche: 30, gebucht_von: 2}
      ]
    };

    service.updateStatus({id: 2, status: DriveStatus.ABGESCHLOSSEN}).then(res => {
    });
    const req = httpTestingController.expectOne('http://localhost:4200/api/buchungen/2');
    expect(req.request.method).toEqual('PUT');
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
