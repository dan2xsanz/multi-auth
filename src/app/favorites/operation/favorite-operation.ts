import { ListOfFavoritesByAccount } from '@/app/service/axios-favorites'
import { ResponseInterface } from '@/config/config'
import {
  openErrorNotification,
  UploadProductInterface,
} from '@/index'

// GET ALL FAVORITE PRODUCTS
export const getAllFavoriteProducts = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  setProductList: (data: UploadProductInterface[]) => void,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface =
      await ListOfFavoritesByAccount(accountId)
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
