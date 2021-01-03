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
  private readonly postId: number;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.postId = parseInt(route.snapshot.paramMap.get('id'), 10);
    console.log(this.postId); // only for debugging
  }

  ngOnInit(): void {
    this.post = this.postService.getPostById(1); // TODO: use this.postId as id
    this.relatedPosts = this.postService.getMorePosts();
  }
}
