import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() starCount: number;
  @Input() onEdit: (stars: number) => void;
  @Input() showLabel: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  setStarCount(stars: number) {
    if (this.onEdit) {
      this.starCount = stars;
      this.onEdit(stars);
    }
  }

}
