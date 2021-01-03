import {Component, OnInit, Input} from '@angular/core';
import {Post} from 'src/shared/post.model';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  relatedPosts: Post[];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.post = this.postService.getPostById(1);
    this.relatedPosts = this.postService.getMorePosts();
  }
}
