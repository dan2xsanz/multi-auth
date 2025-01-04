import { ResponseInterface } from '@/config/config'
import {
  CreateProductRequest,
  UpdateProductRequest,
  UploadProductInterface,
  openErrorNotification,
  openSuccessNotification,
} from '@/index'

export const startSellingItemsOperation = async (
  accountId: number | undefined,
  setIsLoading: (data: boolean) => void,
  setRefreshList: (data: boolean) => void,
  productUploadDetails: UploadProductInterface,
  onClickCancelSellingItems: () => void,
) => {
  if (productUploadDetails.id === undefined) {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await CreateProductRequest({
        ...productUploadDetails,
        accountMasterId: accountId,
      })
      // RETURN SUCCESS MESSAGE
      if (response.isSuccess && response.resultData) {
        openSuccessNotification({
          description: 'Product uploaded successfully.',
          placement: 'bottomRight',
        })
      }
    } catch (error: any) {
      // RETURN ERROR MESSAGE
      openErrorNotification({
        description: error.response?.data?.message || 'An error occurred',
        placement: 'bottomRight',
      })
    } finally {
      setRefreshList(true)
      setIsLoading(false)
      onClickCancelSellingItems()
    }
  } else {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await UpdateProductRequest({
        ...productUploadDetails,
        accountMasterId: accountId,
      })
      // RETURN SUCCESS MESSAGE
      if (response.isSuccess && response.resultData) {
        openSuccessNotification({
          description: 'Product updated successfully.',
          placement: 'bottomRight',
        })
      }
    } catch (error: any) {
      // RETURN ERROR MESSAGE
      openErrorNotification({
        description: error.response?.data?.message || 'An error occurred',
        placement: 'bottomRight',
      })
    } finally {
      setRefreshList(true)
      setIsLoading(false)
      onClickCancelSellingItems()
    }
  }
}
