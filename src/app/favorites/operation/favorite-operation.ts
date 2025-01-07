import { ListOfFavoritesByAccount } from '@/app/service/axios-favorites'
import { ResponseInterface } from '@/config/config'
import {
  openErrorNotification,
  ProductListFilterInterfaceValues,
  UploadProductInterface,
} from '@/index'

// GET ALL FAVORITE PRODUCTS
export const getAllFavoriteProducts = async (
  setIsLoading: (data: boolean) => void,
  setProductList: (data: UploadProductInterface[]) => void,
  selectedFilter: ProductListFilterInterfaceValues,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await ListOfFavoritesByAccount({
      ...selectedFilter,
      limit: selectedFilter.limit,
      offset: selectedFilter.offset,
    })
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
