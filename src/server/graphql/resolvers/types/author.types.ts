export { Author } from '@prisma/client';

export interface AuthorQuery {
  id: string;
}

export interface AddAuthorMutation {
  name: string;
}

export interface DeleteAuthorMUtation {
  id: string;
}

export interface EditAuthorMutation {
  id: string;
  name: string;
  bio: string;
  profilePicture: string;
}
