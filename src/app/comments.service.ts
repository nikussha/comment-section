import { Injectable } from '@angular/core';
import * as commentsData from '../../data.json';
import { Comment } from '../app/models/comment';
import { User } from './models/user';
import { Reply } from './models/reply';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  initialData = commentsData;
  commentsArray: Comment[] = [...this.initialData.comments];
  currentUser: User = this.initialData.currentUser;

  getComments() {
    const sortedArr = this.commentsArray.sort((a, b) => b.score - a.score);
    return sortedArr;
  }

  getUser() {
    const user = this.currentUser;
    return user;
  }

  addComment(comment: Comment) {
    this.commentsArray.push(comment);
  }

  addreply(newcontent: Reply, replyingto: Reply | Comment) {
    if ('replyingTo' in replyingto!) {
      const arr = this.commentsArray.find((comment: Comment) => {
        return comment.replies.find(
          (reply: Reply) => reply.id === replyingto.id
        );
      });
      let index = this.commentsArray.indexOf(arr!);
      this.commentsArray[index].replies.push(newcontent);
    } else {
      const comment: Comment = replyingto;
      const index = this.commentsArray.indexOf(comment);
      this.commentsArray[index].replies.unshift(newcontent);
    }
  }

  updateEvent(comment: Comment | Reply) {
    if ('replyingTo' in comment) {
      for (let com of this.commentsArray) {
        for (let reply of com.replies) {
          if (reply.id === comment.id) {
            reply = { ...reply, content: comment.content };
          }
        }
      }
    } else {
      let index = this.commentsArray.indexOf(comment);
      this.commentsArray[index] = comment;
    }
  }

  deleteContent(comment: Comment | Reply) {
    if ('replyingTo' in comment) {
      for (let singlecomment of this.commentsArray) {
        const replies = singlecomment.replies;
        for (let j = 0; j < replies.length; j++) {
          if (replies[j].id === comment.id) {
            replies.splice(j, 1);
            break;
          }
        }
      }
    } else {
      this.commentsArray = this.commentsArray.filter(
        (item: Comment) => item.id !== comment.id
      );
    }
  }
}
