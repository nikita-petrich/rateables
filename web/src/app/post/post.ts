import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-post',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post {
  @Input() id: number = 0;
  @Input() username: string = '';
  @Input() avatarUrl: string = '';
  @Input() imageUrl: string = '';
  @Input() likes: number = 0;
  @Input() isLiked: boolean = false;
  @Output() like = new EventEmitter<void>();
  @Output() hide = new EventEmitter<void>();
  readonly math = Math;
}
