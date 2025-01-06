import { PaginationDefault, PaginationInterface } from "@/app/interface/common-interface"


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
  ...PaginationDefault,
}
