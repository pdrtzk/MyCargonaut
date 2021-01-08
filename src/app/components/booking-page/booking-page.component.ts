import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';
import {BookingService} from '../../services/booking.service';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  displayPage = 'inbox';
  inbox: Post[];
  outbox: Post[];
  currentUser: Cargonaut;

  constructor(private bookingService: BookingService, private accountService: AccountService) {
  }

  setDisplayPage(page: string): void {
    this.inbox = this.bookingService.getInboxBookings();
    this.outbox = this.bookingService.getOutboxBookings();
    this.displayPage = page;
  }

  ngOnInit(): void {
    this.currentUser = this.accountService.user;
  }

}
