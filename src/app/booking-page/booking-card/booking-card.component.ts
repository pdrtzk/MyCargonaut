import { Component, OnInit } from '@angular/core';
import {Post} from '../../../shared/post.model';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {

  //@Input() booking: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
