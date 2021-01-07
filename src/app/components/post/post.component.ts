import {Component, OnInit, Input} from '@angular/core';
import {Post} from 'src/shared/post.model';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {Vehicle} from '../../../shared/vehicle.model';
import {Rating} from '../../../shared/rating.model';
import {Cargonaut} from '../../../shared/cargonaut.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  relatedPosts: Post[];
  private readonly postId: number;
  currentUser: Cargonaut = {firstname: 'Chrissi', lastname: 'Eberle'}; // todo
  public ratings: Rating[] = [
    {id: 1, ratingStars: 5, comment: 'war super', author: {firstname: 'Max', lastname: 'Mustermann'}}, // todo remove
    {id: 2, ratingStars: 2, comment: 'schlechter Fahrstil', author: {firstname: 'Lisa', lastname: 'Müller'}} // todo remove
  ];

  loggedInUserIsOwner = false; // todo
  editModeOn = false;

  supportedPaymentOptions: string[] = ['Bar', 'Karte'];
  vehicles: Vehicle[];

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.postId = parseInt(route.snapshot.paramMap.get('id'), 10);
    console.log(this.postId); // only for debugging
  }

  async ngOnInit(): Promise<void> {
    this.post = await this.postService.getPostById(this.postId);
    this.relatedPosts = this.postService.getMorePosts(); // todo
  }

  toggleEditMode(): void {
    this.editModeOn = !this.editModeOn;
  }

  saveChanges(): void {
    console.log(this.post);
    this.postService.updatePost(this.post, this.postId).then();
    this.editModeOn = false;
  }

  updatePostProperty(propertyName: string, value: any): void {
    if (this.post[propertyName]) {
      this.post[propertyName] = value;
    }
  }


  setLength(val: any) {
    this.post.hold.length = val;
  }

  setWidth(val: any) {
    this.post.hold.length = val;
  }

  setHeight(val: any) {
    this.post.hold.length = val;
  }

  addRating(rating: Rating): void {
    console.log(rating);
    this.ratings.push(rating);
  }

}
