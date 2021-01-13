import {Component, Input, OnInit, Output} from '@angular/core';
import {Rating} from '../../../../shared/rating.model';
import {Cargonaut} from '../../../../shared/cargonaut.model';
import {Post} from '../../../../shared/post.model';
import {EventEmitter} from '@angular/core';
import {RatingService} from '../../../services/rating.service';
import {AlertService} from '../../alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {

  @Output() submitRating = new EventEmitter<Rating>();
  @Input() author: Cargonaut;
  @Input() post: Post;
  @Input() postAuthorId: number;

  rating: Rating;

  constructor(private ratingService: RatingService, private alertService: AlertService, private router: Router) {
  }

  refresh(): void {
    this.rating = {
      author: this.author,
      trip: this.post,
      ratingStars: 1,
      comment: ''
    };
  }

  updateStars(stars: number) {
    this.rating.ratingStars = stars;
  }

  updateComment(comment: string) {
    this.rating.comment = comment;
  }

  ngOnInit(): void {
    this.refresh();
  }

  onSubmitRating(): void {
    this.ratingService.addRating(this.rating).then(() => {
      this.alertService.success('Cargonaut hat Bewertung erfolgreich erhalten.', {keepAfterRouteChange: true});
      this.router.navigateByUrl('/profile/' + this.postAuthorId);
    });
  }

}
