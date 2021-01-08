import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../../shared/post.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  @Input() bookings: Post[];
  @Input() currentUser: Cargonaut;

  constructor() { }

  ngOnInit(): void {
  }

}
