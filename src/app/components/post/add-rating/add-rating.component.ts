import {Component, Input, OnInit} from '@angular/core';
import {Rating} from '../../../../shared/rating.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {Post} from '../../../../shared/post.model';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {

  @Input() onAddRating: (rating: Rating) => void;
  @Input() author: Cargonaut;
  @Input() post: Post;

  rating: Rating;

  constructor() {
    this.rating = {
      author: this.author,
      trip: this.post,
      ratingStars: 0,
      comment: ''
    };
  }

  updateStars(stars: string) {
    this.rating.ratingStars = Number(stars);
  }

  updateComment(comment: string) {
    this.rating.comment = comment;
  }

  ngOnInit(): void {
  }

}
