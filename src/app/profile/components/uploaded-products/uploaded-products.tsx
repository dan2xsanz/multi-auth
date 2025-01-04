import { ProductListInterface } from '../../../home-tab/data'
import { useEffect, useState } from 'react'
import { Image as AntdImage } from 'antd'
import './uploaded-products-style.css'
import {
  UploadProductInterface,
  productConditionItems,
  productCategoryItems,
  productCurrencyType,
  discountCalculator,
  itemForType,
} from '@/index'

interface UploadedProductsProps {
  id?: number | undefined
  key?: number | undefined
  setOpenDetailModal: (data: boolean) => void
  productUploadDetailsResponse: UploadProductInterface
  setProductDetails: (data: ProductListInterface) => void
  onClickMarkAsSold: (data: UploadProductInterface) => void
  onClickEditProduct: (data: UploadProductInterface) => void
  onClickDeleteProduct: (data: UploadProductInterface) => void
}

export const UploadedProducts = (props: UploadedProductsProps) => {
  const {
    onClickMarkAsSold,
    setProductDetails,
    setOpenDetailModal,
    onClickEditProduct,
    onClickDeleteProduct,
    productUploadDetailsResponse,
  } = props

  // PRODUCT UPLOAD DETAILS
  const [productUploadDetails, setProductUploadDetails] =
    useState<UploadProductInterface>(productUploadDetailsResponse)

  // IS ON STPCK HANDLER
  const [onStockProduct, setOnStockProduct] = useState<boolean | undefined>(
    productUploadDetails?.isSold,
  )

  // MAIN IMAGE
  const [mainImageSrc, setMainImageSrc] = useState<string | undefined>(
    productUploadDetails.image1,
  )

  // ON CLICK MARK AS SOLD
  const onClickMarkAsSoldHandler = () => {
    let maskAsSoldProductDetails: UploadProductInterface = {
      ...productUploadDetails,
      isSold: !productUploadDetails.isSold,
    }
    onClickMarkAsSold(maskAsSoldProductDetails)
    setOnStockProduct(!onStockProduct)
  }

  // ON CLICK DELETE BUTTON
  const onClickMarkAsDeletedHandler = () => {
    let maskAsDeletedProductDetails: UploadProductInterface = {
      ...productUploadDetails,
      isDeleted: true,
    }
    onClickDeleteProduct(maskAsDeletedProductDetails)
  }

  // ON CLICK EDIT BUTTON
  const onClickEditHandler = () => {
    onClickEditProduct(productUploadDetails)
  }

  // FIND PRODUCT NAME AND CONDITION
  const getProductNameAndCondition = (
    productUploadDetails: UploadProductInterface,
  ): string => {
    return `${productConditionItems
      .map((data) => {
        if (data.key === productUploadDetails.productCondition?.toString())
          return data.label
      })
      .filter((label) => label)
      .join('|')} | ${productUploadDetails.productName}`
  }

  // FIND PRODUCT CATEGORY CONDITION
  const getProductItemFor = (
    productDetails: UploadProductInterface,
  ): string => {
    const itemForKey = productDetails.itemFor?.toString()
    const itemFor = itemForType.find((data) => data.key === itemForKey)
    return itemFor ? itemFor.label : ''
  }

  // FIND PRODUCT CATEGORY CONDITION
  const getProductCategory = (
    productDetails: UploadProductInterface,
  ): string => {
    const categoryKey = productDetails.productCategory?.toString()
    const category = productCategoryItems.find(
      (data) => data.key === categoryKey,
    )

    return category ? category.label : ''
  }

  // FIND IMAGE CURRENCY AND PRICE
  const getProductCurrencyAndPrice = (
    productUploadDetails: UploadProductInterface,
  ): string => {
    return ` ${productCurrencyType
      .map((data) => {
        if (
          data.value.toString() ===
          productUploadDetails.productCurrency?.toString()
        )
          return data.display
      })
      .filter(
        (label) => label,
      )} ${productUploadDetails.productPrice && Number(productUploadDetails.productPrice).toLocaleString()}`
  }

  useEffect(() => {
    setProductUploadDetails({
      ...productUploadDetailsResponse,
      image1: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image1}`,
      image2: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image2}`,
      image3: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image3}`,
      image4: `${`data:image/jpeg;base64,`}${productUploadDetailsResponse.image4}`,
      productCategory: productUploadDetailsResponse.productCategory?.toString(),
      productCondition:
        productUploadDetailsResponse.productCondition?.toString(),
    })
  }, [productUploadDetailsResponse])

  useEffect(() => {
    setMainImageSrc(productUploadDetails.image1)
  }, [productUploadDetails.image1])

  return (
    <div style={{ display: 'grid' }}>
      <div className='uploaded-products-main-container'>
        <div className='images-container'>
          <div className='uploaded-additional-image-container'>
            <AntdImage
              preview={false}
              className='image-list-container'
              src={productUploadDetails.image1}
              onMouseEnter={() => setMainImageSrc(productUploadDetails.image1)}
            />
            <AntdImage
              preview={false}
              className='image-list-container'
              src={productUploadDetails.image2}
              onMouseEnter={() => setMainImageSrc(productUploadDetails.image2)}
            />
            <AntdImage
              preview={false}
              className='image-list-container'
              src={productUploadDetails.image3}
              onMouseEnter={() => setMainImageSrc(productUploadDetails.image3)}
            />
            <AntdImage
              preview={false}
              className='image-list-container'
              src={productUploadDetails.image4}
              onMouseEnter={() => setMainImageSrc(productUploadDetails.image4)}
            />
          </div>
          <div className='uploaded-displayed-image-container'>
            <AntdImage
              className='uploaded-displayed-image-container'
              src={mainImageSrc}
            />
          </div>
        </div>
        <div
          className='image-details'
          onClick={() => {
            let productDetails: ProductListInterface = JSON.parse(
              JSON.stringify(productUploadDetailsResponse),
            )
            setOpenDetailModal(true)
            setProductDetails(productDetails)
          }}
        >
          <div className='image-name-availability-container'>
            <div className='uploaded-image-name-detail'>
              {getProductNameAndCondition(productUploadDetails)}
            </div>
            {onStockProduct ? (
              <div className='uploaded-profile-image-out-stock-container'>
                OUT OF STOCK
              </div>
            ) : (
              <div className='uploaded-profile-image-on-stock-container'>
                ON STOCK
              </div>
            )}
          </div>
          <div className='uploaded-image-category'>
            {`${getProductItemFor(productUploadDetails)} ${getProductCategory(productUploadDetails)}`}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {productUploadDetails.productDiscount && (
              <div className='uploaded-image-price'>
                {discountCalculator(
                  productUploadDetails.productPrice,
                  productUploadDetails.productDiscount,
                  productUploadDetails.productCurrency,
                )}
              </div>
            )}
            <div
              className={
                productUploadDetails.productDiscount
                  ? 'uploaded-image-price-discounted'
                  : 'uploaded-image-price'
              }
            >
              {getProductCurrencyAndPrice(productUploadDetails)}
            </div>
            {productUploadDetails.productDiscount && (
              <div className='uploaded-image-price-discount'>{` ${productUploadDetails.productDiscount}% off`}</div>
            )}
          </div>
          <div className='uploaded-image-description'>
            {productUploadDetails.productDescription}
          </div>
        </div>
      </div>
      <div className='action-buttons-container'>
        <div className='action-button-style' onClick={onClickMarkAsSoldHandler}>
          {`${productUploadDetails.isSold ? 'Mark as On Stock' : 'Mark as Out of Stock'} `}
        </div>
        <div className='action-button-style' onClick={onClickEditHandler}>
          Edit
        </div>
        <div
          className='action-button-style'
          onClick={onClickMarkAsDeletedHandler}
        >
          Delete
        </div>
      </div>
    </div>
  )
}
