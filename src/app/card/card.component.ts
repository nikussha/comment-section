import { CommentsService } from './../comments.service';
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
import { Comment } from '../models/comment';
import { Reply } from '../models/reply';
import { User } from '../models/user';
import { commentorreply } from '../models/commentorreply';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() comment!: Comment | Reply;
  @Input() currentuser!: User;
  @ViewChild('editmode') inputRef!: ElementRef;

  @Output() updateEvent = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() scoreEvent = new EventEmitter<void>();

  iseditMode: boolean = false;
  isreplying: boolean = false;
  updatecontent!: string;

  constructor(private service: CommentsService) {}
  reply() {
    this.isreplying = !this.isreplying;
  }

  toggleedit() {
    this.iseditMode = !this.iseditMode;
    this.updatecontent = this.comment.content;
  }

  update(comment: Comment | Reply) {
    if (this.updatecontent === '' && this.updatecontent === undefined) {
      return;
    }
    comment.content = this.updatecontent.trim();
    this.updateEvent.emit(comment);
    this.iseditMode = false;
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.iseditMode) {
      this.focusState();
    }
  }

  focusState() {
    if (this.inputRef) {
      this.inputRef.nativeElement.focus();
    }
  }

  deletecontent(comment: Comment | Reply) {
    this.delete.emit(comment);
  }

  decreaseScore(comment: Comment | Reply) {
    if (
      comment.user.username !== this.currentuser.username &&
      comment.score > 0
    ) {
      comment.score--;
      this.scoreEvent.emit();
    }
  }
  increaseScore(comment: Comment | Reply) {
    if (comment.user.username !== this.currentuser.username) {
      comment.score++;
      this.scoreEvent.emit();
    }
  }
}
