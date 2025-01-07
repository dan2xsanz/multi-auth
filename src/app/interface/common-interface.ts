export interface PaginationInterface {
  limit?: number
  offset?: number
  totalItems?: number
}

export const PaginationDefault: PaginationInterface = {
  // PAGINATION FILTERING
  limit: 10,
  offset: 0,
  totalItems: 0,
}
