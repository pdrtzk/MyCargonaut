import {Component, OnInit} from '@angular/core';
import {Post, PostType} from 'src/shared/post.model';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Vehicle} from '../../../shared/vehicle.model';
import {AccountService} from '../../services/account.service';
import {VehicleService} from '../../services/vehicle.service';
import {BookingService} from '../../services/booking.service';
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
  updatedPost: Post;

  loggedInUserIsOwner = false; // todo
  editModeOn = false;

  supportedPaymentOptions: string[] = ['Bar', 'Kreditkarte', 'EC-Karte', 'PayPal'];
  vehicles: Vehicle[] | string[];

  averageUserRating = 0;
  endtime;
  enddate;
  starttime;
  startdate;

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
        this.updatedPost = JSON.parse(JSON.stringify(this.post)); // easy deep copy for not too large objects
        this.startdate = this.post.start_time.toISOString().split('T')[0];
        this.enddate = this.post.end_time.toISOString().split('T')[0];
        this.starttime = this.post.start_time.toLocaleTimeString();
        this.endtime = this.post.end_time.toLocaleTimeString();
        if (this.updatedPost.description === 'no description') {
          this.updatedPost.description = '';
        }
        if (this.post.type === PostType.OFFER) {
          this.vehicles = await this.vehicleService.getAllVehicles(id);
        } else {
          this.vehicles = await this.vehicleService.getAllVehicleTypes();
        }
      }
    }
    if (this.post?.vehicle?.id) {
      // get vehicle data
      const vehicleData = await this.vehicleService.getVehicleTypeForVehicle(this.post.vehicle.id);
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
    this.updatedPost.start_time = new Date(this.startdate + ' ' + this.starttime);
    this.updatedPost.end_time = new Date(this.enddate + ' ' + this.endtime);
    this.postService.updatePost(this.updatedPost, this.postId).then(() => {
      this.post = this.updatedPost;
      this.post.vehicleType = this.updatedPost.vehicleType;
      this.alertService.success('Post wurde erfolgreich bearbeitet.');
      this.editModeOn = false;
    }, error => {
      if (this.updatedPost.description === 'no description') {
        this.updatedPost.description = '';
      }
      this.alertService.error('Post konnte nicht bearbeitet werden.');
    });
  }

  updatePostProperty(propertyName: string, value: any): void {
    if (this.post[propertyName]) {
      this.post[propertyName] = value;
    }
  }

  async addBooking(): Promise<void> {
    const currentUser = this.accountService.user;
    if (currentUser.id && this.postId) {
      await this.bookingService.addBooking(this.postId, currentUser.id).then(() => {
        this.alertService.success('Post wurde erfolgreich gebucht. Du findest ihn jetzt unter Buchungen.');
      }, error => {
        this.alertService.error('Buchung konnte nicht abgeschlossen werden.');
      });
    }
  }

  getSpace(hold: Hold): number {
    return ((hold?.length / 100) * (hold?.width / 100) * (hold?.height / 100));
  }

  async contact() {
    let id;
    id = await this.chatService.getChatIdFromCargonauts(this.post.author.id, this.accountService?.user?.id);
    const uri = '/chat/' + id.toString();
    await this.router.navigateByUrl(uri);
  }

  goToProfile() {
    this.router.navigateByUrl('/profile/' + this.post.author.id).then();
  }

  abort() {
    this.toggleEditMode();
  }
}
