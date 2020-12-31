import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../shared/post.model';

@Component({
  selector: 'app-post-display-card',
  templateUrl: './post-display-card.component.html',
  styleUrls: ['./post-display-card.component.css']
})
export class PostDisplayCardComponent implements OnInit {

  @Input() relPost: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
