import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../comments.service';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Reply } from '../models/reply';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  comments!: Comment[];
  currentuser!: User;
  showModal: boolean = false;
  commentToDelete!: Comment | Reply;

  constructor(private service: CommentsService) {}

  updateEvent(comment: Comment) {
    this.service.updateEvent(comment);
  }

  ngOnInit(): void {
    this.comments = this.service.getComments();
    this.currentuser = this.service.getUser();
  }

  getComment(comment: Comment) {
    this.service.addComment(comment);
  }

  deletecontent(comment: Comment | Reply) {
    this.commentToDelete = comment;
    this.showModal = true;
  }

  cancelEvent() {
    this.showModal = false;
  }

  deleteUser() {
    this.service.deleteContent(this.commentToDelete);
    this.comments = this.service.commentsArray;
    this.showModal = false;
  }

  updateArray() {
    this.comments = this.service.getComments();
  }
}
