export interface PaginationInterface {
  limit?: number
  offset?: number
  totalItems?: number
}

export const PaginationDefault: PaginationInterface = {
  // PAGINATION FILTERING
  limit: 100,
  offset: 0,
  totalItems: 0,
}
