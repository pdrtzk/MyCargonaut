import {Component, OnInit, Input} from '@angular/core';
import {Post} from 'src/shared/post.model';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {Vehicle} from '../../../shared/vehicle.model';
import {Rating} from '../../../shared/rating.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  relatedPosts: Post[];
  private readonly postId: number;

  loggedInUserIsOwner = false; // todo
  editModeOn = false;

  supportedPaymentOptions: string[] = ['Bar', 'Karte'];
  vehicles: Vehicle[];

  constructor(private postService: PostService,
              private accoutService: AccountService,
              private route: ActivatedRoute,
              private vehicleService: VehicleService) {
    this.postId = parseInt(route.snapshot.paramMap.get('id'), 10);
    console.log(this.postId); // only for debugging
  }

  async ngOnInit(): Promise<void> {
    this.post = await this.postService.getSpecificPost(this.postId);
    const allPosts: Post[] = await this.postService.getMorePosts();
    this.relatedPosts = this.getFirstNPosts(allPosts, 3);
    if (this.post?.author?.id) {
      const userData = this.accoutService.getUser(this.post.author.id);
      this.post.author = await userData;
    }
    if (this.post?.vehicle?.id) {
      const vehicleData = await this.vehicleService.getVehicleTypeForVehicle(this.post.vehicle.id);
      this.post.vehicle = vehicleData;
    }
  }

  getFirstNPosts(allPosts: Post[], n: number): Post[] {
    const posts: Post[] = [];
    for (let i = 0; i < n; i++) {
      if (allPosts.length > i) {
        posts.push(allPosts[i]);
      }
    }
    return posts;
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
