import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../../shared/post.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {

  @Input() booking: Post;
  @Input() currentUser: Cargonaut;
  commentSectionVisible = false;

  constructor() {
  }

  toggleCommentSection(): void {
    this.commentSectionVisible = !this.commentSectionVisible;
  }

  ngOnInit(): void {
  }

}
