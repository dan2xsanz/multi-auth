import { openErrorNotification, openSuccessNotification } from '@/app'
import { CreateAccountInterface } from '@/app/login/components'
import { UpdateAccountRequest } from '@/app/service'
import { ResponseInterface } from '@/config/config'

export const updateAccountRequestOperation = async (
  accountStoreProperties: any,
  setIsLoading: (data: boolean) => void,
  accountDetails: CreateAccountInterface,
) => {
  setIsLoading(true)
  try {
    const response: ResponseInterface = await UpdateAccountRequest({
      ...accountDetails,
      coverImg: accountDetails.coverImg.replace(/^url\((.*)\)$/, '$1'),
      id: accountStoreProperties.accountId,
    })
    // RETURN SUCCESS MESSAGE
    if (response.isSuccess && response.resultData) {
      accountStoreProperties.setCoverImg(
        `url(data:image/png;base64,${response.resultData.coverImg})`,
      )
      accountStoreProperties.setProfileImg(
        `data:image/png;base64,${response.resultData.profileImg}`,
      )
      accountStoreProperties.setFirstName(response.resultData.firstName)
      accountStoreProperties.setLastName(response.resultData.lastName)
      openSuccessNotification({
        description: 'Updated successfully.',
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
    setIsLoading(false)
  }
}
