import { Component, OnInit, inject, signal } from '@angular/core';
import { Header } from './header/header';
import { Post } from './post/post';
import { PostService, PostItem, LikeType } from './api/post.service';

@Component({
  selector: 'app-root',
  imports: [Header, Post],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly postService = inject(PostService);

  protected readonly posts = signal<PostItem[]>([]);

  ngOnInit(): void {
    this.postService.getPosts().subscribe((items) => this.posts.set(items));
  }

  protected readonly onLike = (id: number): void => {
    const current = this.posts();
    const idx = current.findIndex((p) => p.id === id);
    const post = current[idx];
    const newIsLikedValue = !post.isLiked;

    if (idx >= 0) {
      const likes = newIsLikedValue ? post.likes + 1 : post.likes - 1;
      const updated = { ...post, isLiked: newIsLikedValue, likes };
      this.posts.set([...current.slice(0, idx), updated, ...current.slice(idx + 1)]);
    }

    const action: LikeType = newIsLikedValue ? 'like' : 'unlike';
    this.postService.likePost(id, action).subscribe();
  };

  protected readonly onHide = (id: number): void => {
    const current = this.posts();
    this.posts.set(current.filter((p) => p.id !== id));
  };
}
