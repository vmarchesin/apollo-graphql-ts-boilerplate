export { Post } from '@prisma/client';

export interface PostQuery {
  id: string;
}

export interface AddPostMutation {
  content: string;
  authorId: string;
}

export interface DeletePostMutation {
  id: string;
}

export interface EditPostMutation {
  id: string;
  content: string;
}
