import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type PostItem = {
  id: number;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  likes: number;
  isLiked: boolean;
};

export type LikeType = 'like' | 'unlike';

@Injectable({ providedIn: 'root' })
export class PostService {
  // For local dev; consider moving to environment config later
  private readonly baseUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  public readonly getPosts = (): Observable<PostItem[]> => {
    return this.http.get<PostItem[]>(`${this.baseUrl}/posts`);
  };

  public readonly likePost = (id: number, action: LikeType): Observable<PostItem> => {
    return this.http.post<PostItem>(`${this.baseUrl}/posts/${id}/like`, { action });
  };
}
