import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';
import {BookingService} from '../../services/booking.service';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {PostService} from '../../services/post.service';

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
    this.displayPage = page;
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.accountService.user;
    if (this.currentUser?.id) {
      const bookings = await this.bookingService.getBookingsForCargonaut(this.currentUser?.id);
      this.inbox = this.filterInboxBookings(bookings, this.currentUser.id);
      this.outbox = this.filterOutboxBookings(bookings, this.currentUser.id);
    } else {
      console.log('no current user!');
    }
  }

  filterInboxBookings(bookings: Post[], customerId): Post[] {
    return bookings.filter(booking => booking.author.id !== customerId);
  }

  filterOutboxBookings(bookings: Post[], authorId: number): Post[] {
    return bookings.filter(booking => booking.author.id === authorId);
  }

}
