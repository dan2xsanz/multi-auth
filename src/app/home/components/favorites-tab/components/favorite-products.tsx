'use client'
import {
  UploadProductInterface,
  productConditionItems,
  productCategoryItems,
  productCurrencyType,
  discountCalculator,
  itemForType,
} from '@/index'
import { useEffect, useState } from 'react'
import { Image as AntdImage } from 'antd'

interface FavoritesProductsInterface {
  productUploadDetailsResponse: UploadProductInterface
}

export const FavoritesProducts = (props: FavoritesProductsInterface) => {
  const { productUploadDetailsResponse } = props
  // PRODUCT UPLOAD DETAILS
  const [productUploadDetails, setProductUploadDetails] =
    useState<UploadProductInterface>(productUploadDetailsResponse)

  // MAIN IMAGE
  const [mainImageSrc, setMainImageSrc] = useState<string | undefined>(
    productUploadDetails.image1,
  )

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
    <div className='uploaded-products-main-container'>
      <div className='images-container'>
        <div className='additional-image-container'>
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image1}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image1)}
          />
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image2}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image2)}
          />
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image3}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image3)}
          />
          <AntdImage
            width={80}
            height={80}
            preview={false}
            className='image-container'
            src={productUploadDetails.image4}
            onMouseEnter={() => setMainImageSrc(productUploadDetails.image4)}
          />
        </div>
        <div className='displayed-image-container'>
          <AntdImage width={340} height={365} src={mainImageSrc} />
        </div>
      </div>
      <div className='image-details'>
        <div className='image-name-availability-container'>
          <div className='image-name-detail'>
            {getProductNameAndCondition(productUploadDetails)}
          </div>
          {productUploadDetails.isSold ? (
            <div className='profile-image-out-stock-container'>
              OUT OF STOCK
            </div>
          ) : (
            <div className='profile-image-on-stock-container'>ON STOCK</div>
          )}
        </div>
        <div className='image-category'>
          {`${getProductItemFor(productUploadDetails)} ${getProductCategory(productUploadDetails)}`}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {productUploadDetails.productDiscount && (
            <div className='image-price'>
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
                ? 'image-price-discounted'
                : 'image-price'
            }
          >
            {getProductCurrencyAndPrice(productUploadDetails)}
          </div>
          {productUploadDetails.productDiscount && (
            <div className='image-price-discount'>{` ${productUploadDetails.productDiscount}% off`}</div>
          )}
        </div>
        <div className='image-description'>
          {productUploadDetails.productDescription}
        </div>
      </div>
    </div>
  )
}
