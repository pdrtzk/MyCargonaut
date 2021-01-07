import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  displayPage = 'inbox';
  inbox: Post[];
  outbox: Post[];

  constructor(private bookingService: BookingService) {
  }

  setDisplayPage(page: string): void {
    this.inbox = this.bookingService.getInboxBookings();
    this.outbox = this.bookingService.getOutboxBookings();
    this.displayPage = page;
  }

  ngOnInit(): void {
  }

}
