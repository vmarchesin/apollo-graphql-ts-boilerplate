import { mergeResolvers } from '@graphql-tools/merge';
import Author from './author';
import Post from './post';
import AppContext from 'server/types/appContext';

export default mergeResolvers<any, AppContext>([
  Author,
  Post,
]);
