import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {BookingPageComponent} from './booking-page.component';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../shared/post.model';

describe('BookingPageComponent', () => {
  let component: BookingPageComponent;
  let fixture: ComponentFixture<BookingPageComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BookingPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly filter Outbox Bookings', () => {
    const testBookings: Post[] = [{author: {id: 1}}, {author: {id: 2}}];
    expect(component.filterOutboxBookings(testBookings, 1)).toContain(testBookings[0]);
    expect(component.filterOutboxBookings(testBookings, 1)).not.toContain(testBookings[1]);
  });
});
