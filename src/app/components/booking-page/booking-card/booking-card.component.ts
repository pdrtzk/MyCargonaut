import {Component, Input, OnInit} from '@angular/core';
import {DriveStatus, Post} from '../../../../shared/post.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {

  @Input() booking: Post;
  @Input() currentUser: Cargonaut;
  commentSectionAvailable = false;
  commentSectionVisible = false;

  constructor(private accountService: AccountService) {
  }

  toggleCommentSection(): void {
    this.commentSectionVisible = !this.commentSectionVisible;
  }

  isCommentSectionAvailable(booking: Post) {
    return booking?.status === DriveStatus.ABGESCHLOSSEN;
  }

  async ngOnInit(): Promise<void> {
    console.log(this.booking);
    this.commentSectionAvailable = this.isCommentSectionAvailable(this.booking);
    if (this.booking?.author?.id) {
      const cargonaut = await this.accountService.get(this.booking.author.id);
      this.booking.author = cargonaut;
    } else {
      console.log('No author id!');
    }
  }

}
