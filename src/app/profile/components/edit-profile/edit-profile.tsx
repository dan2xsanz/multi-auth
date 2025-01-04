import { updateAccountRequestOperation } from './operation/edit-profile-operation'
import { CreateAccountInterface } from '@/app/login/components'
import { accountDetailStore, useStore } from '@/app/store'
import { CommonModal } from '@/app/common/modal/modal'
import React, { useRef, useState } from 'react'
import { Image } from '@nextui-org/react'
import {
  ButtonColorTypeEnum,
  TypographySizeEnum,
  CommonInputField,
  CommonTypography,
  ButtonTypeEnum,
  CommonButon,
  SizeEnum,
  DEFAULT_PROFILE,
} from '@/app'

import './edit-profile.css'

interface EditProfileProps {
  openEditProfile: boolean
  setOpenEditProfile: (data: boolean) => void
}

export const EditProfile = ({
  openEditProfile,
  setOpenEditProfile,
}: EditProfileProps) => {
  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // ACCOUNT DETAILS
  const accountStoreProperties = accountDetailStore()

  // ERROR KEY FIEDLS HANDLER
  const [errorFields, setErrorFields] = useState<string[]>([])

  // UPLOAD IMAGE REF
  const profileImgInputRef = useRef<HTMLInputElement>(null)

  // UPLOAD IMAGE REF
  const coverImgInputRef = useRef<HTMLInputElement>(null)

  // CREATE ACCOUNT DETAILS
  const [accountDetails, setAccountDetails] = useState<CreateAccountInterface>(
    accountStoreProperties,
  )

  // UPLOAD COVER IMAGE HANDLER
  const uploadCoverImageHandler = (e: any) => {
    const selectedImage = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const imageData = reader.result
      let newDetails: CreateAccountInterface = {
        ...accountDetails,
        coverImg: imageData,
      }
      setAccountDetails(newDetails)
    }
    if (selectedImage) {
      reader.readAsDataURL(selectedImage)
    }
    e.target.value = null
  }

  // UPLOAD PROFILE IMAGE HANDLER
  const uploadProfileImageHandler = (e: any) => {
    const selectedImage = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const imageData = reader.result
      let newDetails: CreateAccountInterface = {
        ...accountDetails,
        profileImg: imageData,
      }
      setAccountDetails(newDetails)
    }
    if (selectedImage) {
      reader.readAsDataURL(selectedImage)
    }
    e.target.value = null
  }

  // VALIDATE REQUIRED FIELDS BEFORE SELLING
  const onClickSaveChanges = () => {
    let errorFields: string[] = []
    if (!accountDetails.firstName) {
      errorFields.push('firstName')
    }
    if (!accountDetails.lastName) {
      errorFields.push('lastName')
    }
    setErrorFields(errorFields)
    if (errorFields.length === 0) {
      updateAccountRequestOperation(
        accountStoreProperties,
        setIsLoading,
        accountDetails,
      ).then(() => setOpenEditProfile(false))
    }
  }

  // ON CHANGE FIELDS
  const onChangeFields = (data: CreateAccountInterface) => {
    setAccountDetails({ ...accountDetails, ...data })
  }

  // OPEN FILE EXPLORER TO SELECT PROFILE IMAGE
  const openProfileFileExplorerButton = () => {
    if (profileImgInputRef.current) {
      profileImgInputRef.current.click()
    }
  }

  // OPEN FILE EXPLORER TO SELECT COVER PHOTO IMAGE
  const openCoverFileExplorerButton = () => {
    if (coverImgInputRef.current) {
      coverImgInputRef.current.click()
    }
  }

  return (
    <CommonModal
      isShowLogo
      onOkayText='Save'
      isShowFooterButtons
      onCancelText='Cancel'
      title={`Edit Profile`}
      isOpen={openEditProfile}
      onOkay={onClickSaveChanges}
      onCancel={() => setOpenEditProfile(!openEditProfile)}
    >
      <div className='edit-profile-main-container'>
        <div className='edit-button-container'>
          <CommonTypography label={'Profile'} size={TypographySizeEnum.large} />
          <CommonButon
            buttonTxt={'Edit'}
            size={SizeEnum.small}
            type={ButtonTypeEnum.submit}
            onClick={openProfileFileExplorerButton}
            buttonColorType={ButtonColorTypeEnum.primary}
          />
          <input
            type='file'
            accept='image/*'
            ref={profileImgInputRef}
            style={{ display: 'none' }}
            onChange={uploadProfileImageHandler}
          />
        </div>
        <div className='edit-pict-container'>
          <Image
            isZoomed
            radius='full'
            alt='Profile'
            src={
              accountStoreProperties.profileImg !== 'data:image/png;base64,null'
                ? accountStoreProperties.profileImg
                : DEFAULT_PROFILE
            }
            style={{ height: '150px', width: '150px' }}
          />
        </div>
        <div className='edit-button-container'>
          <CommonTypography
            label={'Cover Photo'}
            size={TypographySizeEnum.large}
          />
          <CommonButon
            buttonTxt={'Edit'}
            size={SizeEnum.small}
            type={ButtonTypeEnum.submit}
            onClick={openCoverFileExplorerButton}
            buttonColorType={ButtonColorTypeEnum.primary}
          />
          <input
            type='file'
            accept='image/*'
            ref={coverImgInputRef}
            style={{ display: 'none' }}
            onChange={uploadCoverImageHandler}
          />
        </div>
        <div className='edit-pict-container'>
          <Image
            height={150}
            width={300}
            radius='lg'
            alt='Cover Photo'
            src={
              accountDetails.coverImg &&
              accountDetails.coverImg.replace(/^url\((.*)\)$/, '$1')
            }
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <CommonInputField
            key={'firstName'}
            type={'firstName'}
            required={true}
            label={'First Name'}
            size={SizeEnum.small}
            value={accountDetails?.firstName}
            isError={errorFields.includes('firstName')}
            onChange={(data) => {
              onChangeFields({
                ...accountDetails,
                firstName: data.target.value,
              })
            }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <CommonInputField
            key={'lastName'}
            type={'lastName'}
            required={true}
            label={'Last Name'}
            size={SizeEnum.small}
            value={accountDetails.lastName}
            isError={errorFields.includes('lastName')}
            onChange={(data) => {
              onChangeFields({
                ...accountDetails,
                lastName: data.target.value,
              })
            }}
          />
        </div>
      </div>
    </CommonModal>
  )
}
