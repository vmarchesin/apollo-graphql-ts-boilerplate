/* eslint-disable arrow-body-style */
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

import { toBase64 } from 'server/utils/string';

export default {
  Node: {
    __resolveType: (obj: Record<string, unknown>) => {
      // console.log('Node', obj);
      return obj;
    },
  },
  PageInfo: {
    startCursor: ({ startCursor }: { startCursor: string }) => toBase64(startCursor),
    endCursor: ({ endCursor }: { endCursor: string }) => toBase64(endCursor),
  },
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
