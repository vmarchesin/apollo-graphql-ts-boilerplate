import { FilterInput, Node, PaginationInput } from 'server/graphql/resolvers/types/common.types';
import { fromBase64 } from 'server/utils/string';

export function mapEdges<T extends Node>(data: T[]) {
  return {
    edges: data.map((item: T) => ({
      node: item,
      cursor: item.id,
    })),
  };
}

export function getFilterAndPaginationParams(pagination: PaginationInput, filter: FilterInput) {
  const orderBy: Record<string, string>[] = [
    {
      createdAt: 'asc',
    },
    {
      id: 'asc',
    },
  ];

  if (filter.orderBy && filter.sortOrder) {
    orderBy.unshift({
      [filter.orderBy as string]: filter.sortOrder,
    });
  }

  const MAX_RESULT_SIZE = 5000;
  return {
    skip: pagination?.skip,
    take: Math.min(pagination?.take ?? MAX_RESULT_SIZE, MAX_RESULT_SIZE),
    ...(pagination.cursor && {
      cursor: {
        id: fromBase64(pagination.cursor),
      },
    }),
    orderBy,
  };
}
