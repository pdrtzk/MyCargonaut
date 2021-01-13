import {Component, Input, OnInit} from '@angular/core';
import {DriveStatus, Post} from '../../../../shared/post.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {AccountService} from '../../../services/account.service';
import {ChatService} from '../../../services/chat.service';
import {Router} from '@angular/router';

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

  constructor(private accountService: AccountService, private chatService: ChatService, private  router: Router) {
  }

  toggleCommentSection(): void {
    this.commentSectionVisible = !this.commentSectionVisible;
  }

  isCommentSectionAvailable(booking: Post) {
    return booking?.status === DriveStatus.ABGESCHLOSSEN;
  }

  async ngOnInit(): Promise<void> {
    this.authorId = this.booking?.author?.id;
    console.log(this.booking);
    this.commentSectionAvailable = this.isCommentSectionAvailable(this.booking);
    if (this.booking?.author?.id) {
      const cargonaut: Cargonaut = await this.accountService.get(this.booking.author.id);
      console.log('cargonaut: ' + cargonaut);
      this.booking.author = cargonaut;
    } else {
      console.log('No author id!');
    }
  }

  async contact() {
    let id;
    id = await this.chatService.getChatIdFromCargonauts(this.authorId, this.accountService?.user?.id);
    const uri = '/chat/' + id.toString();
    await this.router.navigateByUrl(uri);
  }

  goToProfile() {
    console.log(this.booking?.author?.id);
    this.router.navigateByUrl('/profile/' + this.authorId);
  }
}
