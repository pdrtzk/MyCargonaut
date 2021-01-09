import {Component, OnInit, Input} from '@angular/core';
import {Post} from 'src/shared/post.model';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  relatedPosts: Post[];
  private postId: number;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
     this.postId = params.id;
     console.log(this.postId); // only for debugging
    });
    console.log('after');
  }

  ngOnInit(): void {
    console.log('ngOnInit here');
    this.post = this.postService.getPostById(1); // TODO: use this.postId as id
    this.relatedPosts = this.postService.getMorePosts();
  }
}
