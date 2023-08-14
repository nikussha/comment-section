import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../models/user';
import { Reply } from '../models/reply';
import { Comment } from '../models/comment';
import { CommentsService } from '../comments.service';
import { log } from 'console';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, AfterViewInit {
  @Input() currentuser!: User;
  @Input() replyingto!: Comment | Reply;
  @ViewChild('textarea') inputRef!: ElementRef;
  @Input() reply: boolean | undefined;
  @Output() replyChange = new EventEmitter();

  userinput!: string;
  constructor(private service: CommentsService) {}

  ngAfterViewInit(): void {
    if (this.inputRef.nativeElement) {
      this.inputRef.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    if (this.replyingto) {
      this.userinput = `@${this.replyingto.user.username}`;
    }
  }

  addreply() {
    if (!this.userinput) {
      return;
    }
    const value = {
      id: Math.floor(Math.random() * 1000),
      createdAt: 'now',
      user: this.currentuser,
      content: this.userinput,
      replyingTo: this.replyingto.user.username,
      score: 0,
    };
    this.service.addreply(value, this.replyingto);
    this.userinput = '';
    this.replychange();
  }

  replychange() {
    this.reply = !this.reply;
    this.replyChange.emit(this.reply);
  }
}
