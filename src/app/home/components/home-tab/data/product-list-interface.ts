import { PaginationInterface } from '@/app'

export interface ProductListInterface extends PaginationInterface {
  id?: number | undefined
  image1?: string | undefined
  image2?: string | undefined
  image3?: string | undefined
  image4?: string | undefined
  isSold?: boolean
  isDeleted?: boolean
  productName?: string | undefined
  productCurrency?: number | string | undefined
  productPrice?: string | undefined
  productDiscount?: string | undefined
  itemFor?: string | undefined
  productCategory?: number | string | undefined
  productCondition?: number | string | undefined
  productDescription?: string | undefined
  productLocation?: string | undefined
  accountMasterId?: number | undefined
  justIn?: boolean
}

export const ProductListValues: ProductListInterface = {
  id: undefined,
  image1: '',
  image2: '',
  image3: '',
  image4: '',
  isSold: false,
  isDeleted: false,
  productName: '',
  productPrice: '0.00',
  productDiscount: '',
  itemFor: '',
  productCurrency: '1',
  productCategory: '1',
  productCondition: '1',
  productDescription: '',
  productLocation: '',
  accountMasterId: undefined,
  justIn: false,
  // PAGINATION FILTERING
  limit: 1,
  offset: 0,
  totalItems: 0,
}
