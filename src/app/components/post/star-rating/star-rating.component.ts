import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() starCount: number;
  @Output() starChange = new EventEmitter<number>();
  @Input() showLabel: boolean;
  @Input() canEdit: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  setStarCount(stars: number) {
    if (this.canEdit) {
      this.starCount = stars;
      this.starChange.emit(this.starCount);
    }
  }

}
