import {Component, Input, OnInit} from '@angular/core';
import {DriveStatus, Post} from '../../../../shared/post.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {AccountService} from '../../../services/account.service';
import {ChatService} from '../../../services/chat.service';
import {Router} from '@angular/router';
import {BookingService} from '../../../services/booking.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {

  authorId: number;
  @Input() booking: Post;
  @Input() currentUser: Cargonaut;
  commentSectionAvailable = false;
  commentSectionVisible = false;


  constructor(private accountService: AccountService,
              private bookingService: BookingService,
              private chatService: ChatService,
              private  router: Router
  ) {
  }

  toggleCommentSection(): void {
    this.commentSectionVisible = !this.commentSectionVisible;
  }

  isCommentSectionAvailable(booking: Post) {
    return booking?.status === DriveStatus.ABGESCHLOSSEN;
  }

  async ngOnInit(): Promise<void> {
    this.authorId = this.booking?.author?.id;
    this.commentSectionAvailable = this.isCommentSectionAvailable(this.booking);
    if (this.booking?.author?.id) {
      const cargonaut: Cargonaut = await this.accountService.get(this.booking.author.id);
      this.booking.author = cargonaut;
    }
  }

  async contact() {
    let id;
    id = await this.chatService.getChatIdFromCargonauts(this.authorId, this.accountService?.user?.id);
    const uri = '/chat/' + id.toString();
    await this.router.navigateByUrl(uri);
  }

  goToProfile() {
    this.router.navigateByUrl('/profile/' + this.authorId);
  }

  getStatusToString(status: number) {
    switch (status){
      case 0: return 'ausstehend';
      case 1: return 'unterwegs';
      case 2: return 'abgeschlossen';
      default: return 'ausstehend';
    }
  }

  updateStatus(){
    switch (this.booking.status){
      case DriveStatus.AUFGETRAGEN:
        this.booking.status = DriveStatus.UNTERWEGS;
        break;
      case DriveStatus.UNTERWEGS:
        this.booking.status = DriveStatus.ABGESCHLOSSEN;
        break;
    }
    this.bookingService.updateStatus(this.booking).then();
  }

}
