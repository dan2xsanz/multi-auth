import { PaginationDefault, PaginationInterface } from '@/app'

export interface ProductListFilterInterfaceValues extends PaginationInterface {
  mainCategory?: number | undefined
  accountId?: number | undefined
  productCategory?: number | undefined
  productCondition?: number | undefined
}

export const ProductListInterfaceValues: ProductListFilterInterfaceValues = {
  mainCategory: undefined,
  accountId: undefined,
  productCategory: undefined,
  productCondition: undefined,
  // PAGINATION FILTERING
  limit: 1,
  offset: 0,
  totalItems: 0,
}
