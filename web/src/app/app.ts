import { Component, OnInit, inject, signal } from '@angular/core';
import { Header } from './header/header';
import { Post } from './post/post';
import { PostService, PostItem } from './api/post.service';

@Component({
  selector: 'app-root',
  imports: [Header, Post],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly postService = inject(PostService);

  protected readonly title = signal('web');

  protected readonly posts = signal<PostItem[]>([]);

  ngOnInit(): void {
    this.postService.getPosts().subscribe((items) => this.posts.set(items));
  }

  protected readonly onLike = (id: string): void => {
    // Optimistic UI update
    const current = this.posts();
    const idx = current.findIndex((p) => p.id === id);
    if (idx >= 0) {
      const post = current[idx];
      const isLiked = !post.isLiked;
      const likes = Math.max(0, post.likes + (isLiked ? 1 : -1));
      const likedBy = isLiked ? [...post.likedBy, 'you'] : post.likedBy.filter((u) => u !== 'you');
      const updated = { ...post, isLiked, likes, likedBy };
      this.posts.set([...current.slice(0, idx), updated, ...current.slice(idx + 1)]);
    }
    this.postService.likePost(id, 'you').subscribe();
  };
}
