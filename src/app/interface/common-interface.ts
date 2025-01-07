export interface PaginationInterface {
  limit?: number
  offset?: number
  totalItems?: number
}

export const PaginationDefault: PaginationInterface = {
  // PAGINATION FILTERING
  limit: 1,
  offset: 0,
  totalItems: 0,
}
