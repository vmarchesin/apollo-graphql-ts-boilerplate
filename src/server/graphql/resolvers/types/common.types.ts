export interface Node {
  id: string;
}

export interface Records {
  count?: number;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
}

export interface Query {
  node: Node;
}

export interface PaginationInput {
  skip?: number;
  take?: number;
  cursor?: string;
}

export interface FilterInput {
  orderBy?: string;
  sortOrder?: string;
}

export interface Edge {
  pagination?: PaginationInput;
  filter?: FilterInput;
}
