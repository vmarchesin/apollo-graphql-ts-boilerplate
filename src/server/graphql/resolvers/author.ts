import { getFilterAndPaginationParams, mapEdges } from 'server/utils/graphql';
import { getFirst, getLast } from 'server/utils/array';
import { toBase64 } from 'server/utils/string';
import AppContext from 'server/types/appContext';
import { AddAuthorMutation, DeleteAuthorMUtation, EditAuthorMutation, AuthorQuery } from './types/author.types';
import { Edge } from './types/common.types';

export default {
  Query: {
    author: async (_: never, args: AuthorQuery, { prisma }: AppContext) => {
      const data = await prisma.author.findUnique({
        where: { id: args.id },
      });
      return data;
    },
    allAuthors: async (_: never, { pagination = {}, filter = {} }: Edge, { prisma }: AppContext) => {
      const data = await prisma.author.findMany({ ...getFilterAndPaginationParams(pagination, filter) });
      return mapEdges(data);
    },
  },
  Mutation: {
    addAuthor: async (_: never, args: AddAuthorMutation, { prisma }: AppContext) => {
      const data = await prisma.author.create({ data: args });
      return data;
    },
    deleteAuthor: async (_: never, args: DeleteAuthorMUtation, { prisma }: AppContext) => {
      const data = await prisma.author.delete({
        where: { id: args.id },
      });
      return data;
    },
    editAuthor: async (_: never, { id, ...args }: EditAuthorMutation, { prisma }: AppContext) => {
      const data = await prisma.author.update({
        where: { id },
        data: args,
      });
      return data;
    },
  },
  Author: {
    posts: async (parent: AuthorQuery, { pagination = {}, filter = {} }, { prisma }: AppContext) => {
      const data = await prisma.post.findMany({
        ...getFilterAndPaginationParams(pagination, filter),
        where: {
          author: {
            id: parent.id,
          },
        },
      });
      return mapEdges(data);
    },
  },
  AuthorConnection: {
    edges: (parent: any) => parent.edges,
    pageInfo: (parent: any) => ({
      startCursor: getFirst<any>(parent.edges)?.cursor,
      endCursor: getLast<any>(parent.edges)?.cursor,
    }),
  },
  AuthorEdge: {
    cursor: (parent: any) => toBase64(parent.cursor),
  },
};
