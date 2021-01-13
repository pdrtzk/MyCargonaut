import {Component, OnInit, Input} from '@angular/core';
import {Post} from 'src/shared/post.model';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicle} from '../../../shared/vehicle.model';
import {Rating} from '../../../shared/rating.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {VehicleService} from '../../services/vehicle.service';
import {BookingService} from '../../services/booking.service';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {Hold} from '../../../shared/hold.model';
import {ChatService} from '../../services/chat.service';
import {AlertService} from '../alert/alert.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  relatedPosts: Post[];
  private postId: number;

  loggedInUserIsOwner = false; // todo
  editModeOn = false;

  supportedPaymentOptions: string[] = ['Bar', 'Karte'];
  vehicles: Vehicle[];

  averageUserRating = 0;

  constructor(private postService: PostService,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private bookingService: BookingService,
              private vehicleService: VehicleService,
              private chatService: ChatService,
              private alertService: AlertService,
              private router: Router) {
    route.paramMap.subscribe(params => {
      this.postId = parseInt(params.get('id'), 10);
      this.ngOnInit();
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.postId) {
      this.post = await this.postService.getSpecificPost(this.postId);
    }
    const allPosts: Post[] = await this.postService.getMorePosts();
    this.relatedPosts = this.getFirstNPosts(allPosts, 3);

    this.loggedInUserIsOwner = (this.post?.author?.id === this.accountService?.user?.id);

    if (this.post?.author?.id) {
      // get authors user data
      const id = this.post.author.id;
      const userData = this.accountService.get(this.post.author.id);
      this.post.author = await userData;
      this.post.author.id = id;
      // get author's vehicles (for editing)
      if (this.loggedInUserIsOwner) {
        this.vehicles = await this.vehicleService.getAllVehicles(id);
      }
    }
    if (this.post?.vehicle?.id) {
      // get vehicle data
      const vehicleData = await this.vehicleService.getVehicleTypeForVehicle(this.post.vehicle.id);
      console.log(vehicleData);
      console.log('Hold: ' + this.post.hold);
      this.post.vehicle = vehicleData;
    } else if (this.post?.vehicleType) {
      this.post.vehicle = {type: {type: this.vehicleService.getVehicleType(this.post.vehicleType)}};
    }
    if (this.post?.author?.id) {
      // get users average rating
      const averageUserRating = await this.accountService.getAverageUserRating(this.post.author.id);
      this.averageUserRating = Math.round(averageUserRating);
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

  async addBooking(): Promise<void> {
    const currentUser = this.accountService.user;
    if (currentUser.id && this.postId) {
      this.alertService.success('Post wurde erfolgreich gebucht. Du findest ihn jetzt unter Buchungen.');
      await this.bookingService.addBooking(this.postId, currentUser.id);
    }
  }

  getSpace(hold: Hold): number {
    return ((hold?.length / 100) * (hold?.width / 100) * (hold?.height / 100));
  }

  async contact(){
    let id;
    console.log(this.post.author.id, this.accountService?.user?.id);
    id = await this.chatService.getChatIdFromCargonauts(this.post.author.id, this.accountService?.user?.id);
    const uri = '/chat/' + id.toString();
    await this.router.navigateByUrl(uri);
  }

  goToProfile() {
    console.log(this.post.author.id);
    this.router.navigateByUrl('/profile/' + this.post.author.id);
  }
}
