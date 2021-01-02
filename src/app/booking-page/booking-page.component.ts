import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../shared/post.model';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  displayPage = 'inbox';
  @Input() inbox: Post[];
  @Input() outbox: Post[];

  constructor() {
  }

  setDisplayPage(page: string): void {
    this.displayPage = page;
  }

  ngOnInit(): void {
  }

}
