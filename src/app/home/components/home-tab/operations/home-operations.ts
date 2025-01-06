import { ResponseInterface } from '@/config/config'
import { ProductListInterface } from '../data'
import {
  ProductListFilterInterfaceValues,
  GetProductByFilterRequest,
  openErrorNotification,
} from '@/index'

export const getAllProductsOperations = async (
  setIsLoading: (data: boolean) => void,
  setProductList: (data: ProductListInterface[]) => void,
  selectedFilter: ProductListFilterInterfaceValues,
  productList: ProductListInterface[],
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface =
      await GetProductByFilterRequest(selectedFilter)
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess && response.resultData) {
      setProductList(response.resultData)
    }
  } catch (error: any) {
    // RETURN ERROR MESSAGE
    openErrorNotification({
      description: error.response?.data?.message || 'An error occurred',
      placement: 'bottomRight',
    })
  } finally {
    setIsLoading(false)
  }
}
