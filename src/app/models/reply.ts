import { User } from './user';

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  replyingTo: string;
  user: User;
  score: number;
}
