'use client'
import { NotificationInterface } from '@/app/service/web-socket-service/web-socket-service-interface'
import webSocketServiceInstance from '@/app/service/web-socket-service/web-socket-service'
import { ProductListInterface } from '../../home/components/home-tab/data'
import React, { Fragment, useEffect, useState } from 'react'
import { accountDetailStore, useStore } from '@/app/store'
import { CommonModal } from '@/app/common/modal/modal'
import { Image as AntdImage, Carousel } from 'antd'
import './product-details-modal.css'
import {
  getProductPriceAndCurrency,
  getProductNameAndCondition,
  HighlightedFavoriteIcon,
  HighlightedHeartIcon,
  getProductCategory,
  TypographySizeEnum,
  discountCalculator,
  getProductItemFor,
  CommonTypography,
  WebSocketTopic,
  CommentSection,
  FavoriteIcon,
  CommentsIcon,
  HeartIcon,
  HighlightedCommentsIcon,
} from '@/index'
import {
  HeartReactStateDefaultValue,
  FavoritesStateDefaultValue,
  HeartReactStateInterface,
  FavoritesStateInterface,
} from './data'
import {
  addToMyHeartedProductOperation,
  listOfHeartedProductOperation,
  deleteHeartedProductOperation,
  deleteMyFavoritesOperation,
  addToMyFavoritesOperation,
  listOfFavoritesOperation,
  getAllCommentsOperation,
  getProductMasterId,
} from './operations'

interface ProductDetailsModalProps {
  productMasterId: number | undefined
  openDetailModal: boolean
  setOpenDetailModal: (data: boolean) => void
}

export const ProductDetailsModal = (props: ProductDetailsModalProps) => {
  // PRODUCT DETAILS PROPS
  const { productMasterId, openDetailModal, setOpenDetailModal } = props

  // PRODUCT DETAILS STATE
  const [productDetails, setProductDetails] = useState<
    ProductListInterface | undefined
  >()

  // INPITTED VALUE STATE
  const [inputedValue, setInputtedValue] = useState<string>('')

  // UPLOADED PRODUCT IMAGES
  const [productImages, setProductImages] = useState<any[]>([null])

  // FAVORITE STATE
  const [favoriteState, setFavoriteState] = useState<FavoritesStateInterface>(
    FavoritesStateDefaultValue,
  )

  // HEART REACT STATE
  const [heartReactState, setHeartReactState] =
    useState<HeartReactStateInterface>(HeartReactStateDefaultValue)

  // TOTAL COMMENTS STATE
  const [totalCommentsState, setTotalCommentState] = useState<number>(0)

  // COMMENT SECTION STATE
  const [commentSection, openCommentSection] = useState<boolean>(false)

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // ACCOUNT DETAILS
  const { accountId, firstName, lastName } = accountDetailStore()

  // REMOVE PRODUCT TO MY FAVORITES
  const removeToMyFavorites = () => {
    setFavoriteState({
      ...favoriteState,
      isFavorite: !favoriteState.isFavorite,
    })
    deleteMyFavoritesOperation(accountId, setIsLoading, productDetails)
  }

  // ADD PRODUCT BTO MY FAVORITES
  const addToMyFavorites = () => {
    setFavoriteState({
      ...favoriteState,
      isFavorite: !favoriteState.isFavorite,
    })
    addToMyFavoritesOperation(accountId, setIsLoading, productDetails)
  }

  // ADD PRODUCT AS HEARTED
  const addToMyHearted = () => {
    let notification: NotificationInterface = {
      senderId: accountId,
      subject: productDetails?.productName,
      notificationTopic: WebSocketTopic.HeartReact,
      receiverId: productDetails?.accountMasterId,
      message: `${firstName} ${lastName} Loves your Product`,
    }
    webSocketServiceInstance.sendNotificationMessage(notification)
    setHeartReactState({
      ...heartReactState,
      isHearted: !heartReactState.isHearted,
    })
    addToMyHeartedProductOperation(accountId, setIsLoading, productDetails)
  }

  // REMOVE PRODUUCT AS HEARTED
  const removeToMyHeartedProduct = () => {
    setHeartReactState({
      ...heartReactState,
      isHearted: !heartReactState.isHearted,
    })
    deleteHeartedProductOperation(accountId, setIsLoading, productDetails)
  }

  // SET PRODUCT DETAIL IMAGES
  useEffect(() => {
    let productImagesEdit = [
      `${`data:image/jpeg;base64,`}${productDetails?.image1}`,
      `${`data:image/jpeg;base64,`}${productDetails?.image2}`,
      `${`data:image/jpeg;base64,`}${productDetails?.image3}`,
      `${`data:image/jpeg;base64,`}${productDetails?.image4}`,
    ]
    setProductImages(productImagesEdit)
  }, [productDetails])

  // COUNT THE NUMBER OF REACTS, COMMENTS
  useEffect(() => {
    if (productDetails?.id) {
      listOfFavoritesOperation(
        accountId,
        setIsLoading,
        setFavoriteState,
        productDetails?.id,
      )
      listOfHeartedProductOperation(
        accountId,
        setIsLoading,
        setHeartReactState,
        productDetails?.id,
      )
      getAllCommentsOperation(
        setIsLoading,
        productDetails?.id,
        setTotalCommentState,
      )
    }
  }, [
    accountId,
    inputedValue,
    setIsLoading,
    openDetailModal,
    productDetails?.id,
    favoriteState.isFavorite,
    heartReactState.isHearted,
  ])

  // GET PRODUCT BY PRODUCT MASTER ID
  useEffect(() => {
    getProductMasterId(setIsLoading, productMasterId, setProductDetails)
  }, [productMasterId])

  useEffect(() => {
    openCommentSection(false)
    setTotalCommentState(0)
    setHeartReactState(HeartReactStateDefaultValue)
    setFavoriteState(FavoritesStateDefaultValue)
  }, [openDetailModal])

  return (
    <CommonModal
      height='480px'
      width='1000px'
      isShowFooterButtons={false}
      isOpen={openDetailModal}
      onCancel={() => setOpenDetailModal(!openDetailModal)}
      title={`${productDetails?.productName} Details`}
    >
      <div className='modal-body-container'>
        <div className='modal-image-container'>
          <Carousel autoplay>
            {productImages.map((image, index) => (
              <div key={index} className='carousel-content-container'>
                {image ? (
                  <AntdImage src={image} />
                ) : (
                  <h3 className='snz-logo-container'>SNZ.</h3>
                )}
              </div>
            ))}
          </Carousel>
        </div>
        <div className='product-detail-main-container'>
          <div className='product-detail-container'>
            <CommonTypography
              style={{ fontWeight: 'bolder' }}
              size={TypographySizeEnum.large}
              label={getProductNameAndCondition(productDetails)}
            />
            <CommonTypography
              style={{ marginTop: '-10px' }}
              size={TypographySizeEnum.medium}
              label={`${getProductItemFor(productDetails)} ${getProductCategory(productDetails)}`}
            />
            {!commentSection && (
              <div className='image-details'>
                <div
                  style={{ display: 'flex', gap: '10px', marginTop: '10px' }}
                >
                  {productDetails?.productDiscount && (
                    <div className='image-price'>
                      {discountCalculator(
                        productDetails.productPrice,
                        productDetails.productDiscount,
                        productDetails.productCurrency,
                      )}
                    </div>
                  )}
                  <div
                    className={
                      productDetails?.productDiscount
                        ? 'image-price-discounted'
                        : 'image-price'
                    }
                  >
                    {getProductPriceAndCurrency(productDetails)}
                  </div>
                  {productDetails?.productDiscount && (
                    <div className='image-price-discount'>{` ${productDetails.productDiscount}% off`}</div>
                  )}
                </div>
                <div className='product-details-image-description'>
                  {productDetails?.productDescription}
                </div>
              </div>
            )}
            {commentSection && (
              <CommentSection
                inputedValue={inputedValue}
                setInputtedValue={setInputtedValue}
                productMasterId={productDetails?.id}
                productDetails={productDetails}
              />
            )}
          </div>
          <div className='product-details-reaction-container'>
            <div className='product-number-reaction-container'>
              {favoriteState.isFavorite ? (
                <HighlightedFavoriteIcon onClick={removeToMyFavorites} />
              ) : (
                <FavoriteIcon onClick={addToMyFavorites} />
              )}
            </div>
            <div className='product-number-reaction-container'>
              {heartReactState.isHearted ? (
                <HighlightedHeartIcon onClick={removeToMyHeartedProduct} />
              ) : (
                <HeartIcon onClick={addToMyHearted} />
              )}
              <label>{heartReactState.totalHeartReact}</label>
            </div>
            <div className='product-number-reaction-container'>
              {commentSection ? (
                <HighlightedCommentsIcon
                  onClick={() => openCommentSection(!commentSection)}
                />
              ) : (
                <CommentsIcon
                  onClick={() => openCommentSection(!commentSection)}
                />
              )}
              <label>{totalCommentsState}</label>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
