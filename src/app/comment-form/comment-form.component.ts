import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() currentuser: User | undefined;
  @Output() throwEvent: EventEmitter<Comment> = new EventEmitter<Comment>();
  constructor() {}

  comment: string | undefined;
  ngOnInit(): void {}

  addcomment() {
    console.log(this.currentuser?.image.png);
    if (!this.comment) {
      return;
    }
    const newcomment: Comment = {
      score: 0,
      id: Date.now() as number,
      content: this.comment,
      createdAt: 'now',
      user: {
        image: {
          png: '../../assets/images/avatars/image-juliusomo.png',
          webp: '',
        },
        username: `${this.currentuser?.username}`,
      },
      replies: [],
    };

    this.throwEvent.emit(newcomment);
    this.comment = '';
  }
}
