import {Component, Input, OnInit} from '@angular/core';
import {Rating} from '../../../../shared/rating.model';


@Component({
  selector: 'app-profile-rating',
  templateUrl: './profile-rating.component.html',
  styleUrls: ['./profile-rating.component.css']
})
export class ProfileRatingComponent implements OnInit {

  @Input() rating: Rating;

  constructor() { }

  ngOnInit(): void {
    console.log('in post-rating:' + this.rating.author.id);
  }

}
