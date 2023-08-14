import { Reply } from './reply';
import { User } from './user';

export interface Comment {
  score: number;
  id: number;
  content: string;
  createdAt: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Reply[];
}
