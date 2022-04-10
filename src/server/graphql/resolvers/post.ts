import { getFilterAndPaginationParams, mapEdges } from 'server/utils/graphql';
import { getFirst, getLast } from 'server/utils/array';
import { toBase64 } from 'server/utils/string';
import AppContext from 'server/types/appContext';
import { AddPostMutation, DeletePostMutation, EditPostMutation, PostQuery, Post } from './types/post.types';
import { Edge } from './types/common.types';

export default {
  Query: {
    post: async (_: never, args: PostQuery, { prisma }: AppContext) => {
      const data = await prisma.post.findUnique({
        where: { id: args.id },
      });
      return data;
    },
    allPosts: async (_: never, { pagination = {}, filter = {} }: Edge, { prisma }: AppContext) => {
      const data = await prisma.post.findMany({ ...getFilterAndPaginationParams(pagination, filter) });
      return mapEdges(data);
    },
  },
  Mutation: {
    addPost: async (_: never, { content, authorId }: AddPostMutation, { prisma }: AppContext) => {
      const data = await prisma.post.create({
        data: {
          content,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
      return data;
    },
    deletePost: async (_: never, args: DeletePostMutation, { prisma }: AppContext) => {
      const data = await prisma.post.delete({
        where: { id: args.id },
      });
      return data;
    },
    editPost: async (_: never, { id, ...args }: EditPostMutation, { prisma }: AppContext) => {
      const data = await prisma.post.update({
        where: { id },
        data: args,
      });
      return data;
    },
  },
  Post: {
    author: async (parent: Post, _: never, { prisma }: AppContext) => {
      const data = await prisma.author.findUnique({
        where: { id: parent.authorId },
      });
      return data;
    },
  },
  PostConnection: {
    edges: (parent: any) => parent.edges,
    pageInfo: (parent: any) => ({
      startCursor: getFirst<any>(parent.edges)?.cursor,
      endCursor: getLast<any>(parent.edges)?.cursor,
    }),
  },
  PostEdge: {
    cursor: (parent: any) => toBase64(parent.cursor),
  },
};
