import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post {
  @Input() id: string = '';
  @Input() username: string = '';
  @Input() avatarUrl: string = '';
  @Input() imageUrl: string = '';
  @Input() likedBy: string[] = [];
  @Input() likes: number = 0;
  @Input() caption: string = '';
  @Input() timeAgo: string = '';
  @Input() isLiked: boolean = false;
  @Output() like = new EventEmitter<void>();
  readonly math = Math;
}
