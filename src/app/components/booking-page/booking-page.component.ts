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
    this.inbox = await this.bookingService.getInboxBookings(this.currentUser?.id);
    this.outbox = this.bookingService.getOutboxBookings();
  }

}
