import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type PostItem = {
  id: string;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  likes: number;
  isLiked: boolean;
};

@Injectable({ providedIn: 'root' })
export class PostService {
  // For local dev; consider moving to environment config later
  private readonly baseUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  public readonly getPosts = (): Observable<PostItem[]> => {
    return this.http.get<PostItem[]>(`${this.baseUrl}/posts`);
  };

  public readonly likePost = (id: string, user: string = 'you'): Observable<PostItem> => {
    return this.http.post<PostItem>(`${this.baseUrl}/posts/${id}/like`, { user });
  };
}
