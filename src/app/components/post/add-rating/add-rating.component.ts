import {Component, Input, OnInit, Output} from '@angular/core';
import {Rating} from '../../../../shared/rating.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {Post} from '../../../../shared/post.model';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {

  @Output() submitRating = new EventEmitter<Rating>();
  @Input() author: Cargonaut;
  @Input() post: Post;

  rating: Rating;

  constructor() {}

  refresh(): void {
    this.rating = {
      author: this.author,
      trip: this.post,
      ratingStars: 0,
      comment: ''
    };
  }

  updateStars(stars: number) {
    this.rating.ratingStars = stars;
  }

  updateComment(comment: string) {
    this.rating.comment = comment;
  }

  submit(): void {
    console.log(this.author);
    this.submitRating.emit(this.rating);
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }

}
