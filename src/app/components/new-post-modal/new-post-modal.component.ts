import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.css']
})
export class NewPostModalComponent implements OnInit {


  posttype: string;

  ngOnInit(): void {
    this.posttype = '';

  }


}
