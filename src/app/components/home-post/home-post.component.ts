import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})

export class HomePostComponent implements OnInit {


  @Input() post: Post;

  constructor() {

  }

  ngOnInit(): void {

  }


}
