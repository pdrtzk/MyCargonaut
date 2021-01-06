import {Component, OnInit, Input} from '@angular/core';
import {Post} from 'src/shared/post.model';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {Vehicle} from '../../../shared/vehicle.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  relatedPosts: Post[];
  private readonly postId: number;

  loggedInUserIsOwner = true; // todo
  editModeOn = false;

  supportedPaymentOptions: string[] = ['Bar', 'Karte'];
  vehicles: Vehicle[];

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.postId = parseInt(route.snapshot.paramMap.get('id'), 10);
    console.log(this.postId); // only for debugging
  }

  async ngOnInit(): Promise<void> {
    this.post = await this.postService.getSpecificPost(this.postId);
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

}
