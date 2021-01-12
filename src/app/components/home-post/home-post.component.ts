import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})

export class HomePostComponent implements OnInit {


  @Input() post: Post;
  author: Cargonaut;

  constructor(private accountService: AccountService, private vehicleService: VehicleService) {
  }

  async ngOnInit(): Promise<void> {
    if (this.post) {
      this.post.start_time = new Date(this.post?.start_time);
      this.post.end_time = new Date(this.post?.end_time);
      await this.getVehicles(this.post.author.id);
      await this.getAuthor(this.post.author.id);
    }
  }

  getAuthor(id: number): Promise<void> {
    return this.accountService.get(id).then(result => {
        this.post.author = result;
        this.post.author.firstname = result.firstname;
        this.post.author.lastname = result.lastname;
      }
    ).catch(
      err => {
        console.log('getAuthor');
        console.log(err);
      }
    );
  }

  getVehicles(authorID: number): Promise<void> {
    return this.vehicleService.getAllVehicles(authorID).then(result => {
      this.post.vehicle = result.filter(ve => ve.id === this.post.vehicle.id)[0];
      console.log(this.post.vehicle);
    }).catch(
      err => {
        console.log('getVehicle HomePost');
        console.log(err);
      }
    );
  }
}
