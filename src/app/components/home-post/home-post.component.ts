import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {VehicleService} from '../../services/vehicle.service';
import {VehicleTypeType} from '../../../shared/vehicle-type.model';
import {Hold} from '../../../shared/hold.model';

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
        console.log('Error: ', err);
      }
    );
  }

  getVehicles(authorID: number): Promise<void> {
    return this.vehicleService.getAllVehicles(authorID).then(result => {
      this.post.vehicle = result.filter(ve => ve.id === this.post.vehicle.id)[0];
    }).catch(
      err => {
        console.log('Error: ', err);
      }
    );
  }

  public getSpace(hold: Hold): number {
    return ((hold.length / 100) * (hold.width / 100) * (hold.height / 100));
  }
}
