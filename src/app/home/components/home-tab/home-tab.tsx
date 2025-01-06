'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { getAllProductsOperations } from './operations'
import { ProductListInterface } from './data'
import { Image } from '@nextui-org/react'
import { useStore } from '@/app/store'
import './home-tab.css'
import {
  ProductListFilterInterfaceValues,
  getProductPriceAndCurrency,
  getProductNameAndCondition,
  ProductListInterfaceValues,
  FilterHiglightedIcon,
  ProductDetailsModal,
  discountCalculator,
  FilterIcon,
  HomeFilter,
  PaginationInterface,
  PaginationDefault,
  CommonButon,
  ButtonTypeEnum,
  SizeEnum,
} from '@/index'

export const HomeTab = () => {
  // PRODUCT LIST
  const [productList, setProductList] = useState<ProductListInterface[]>([])

  // SELECTED FILTER
  const [selectedFilter, setSelectedFilter] =
    useState<ProductListFilterInterfaceValues>(ProductListInterfaceValues)

  // SELECTED PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState<ProductListInterface>()

  // OPEN PRODUCT DETAIL MODAL
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  // DISPLAY FILTER
  const [displayFilter, setDisplayFilter] = useState<boolean>(false)

  // DISPLAY LOAD MORE BUTTON
  const [displayBtn, setDisplayBtn] = useState<boolean>(false)

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // ON CLICK MAIN CATEGIRY ITEM
  const onClickMainCategory = (item: number | undefined) => {
    setSelectedFilter({
      ...selectedFilter,
      mainCategory: item,
    })
  }

  // SAMPLE PAGINATION IMPLEMENTATION
  const lastProductRef = useRef(null)

  const getAllProducts = async () => {
    getAllProductsOperations(
      setIsLoading,
      setProductList,
      {
        ...selectedFilter,
        limit: selectedFilter.limit,
        offset: selectedFilter.offset,
      },
      productList,
    )
  }

  // REFRESH LIST EVENT HANDLER
  useEffect(() => {
    getAllProducts()
  }, [selectedFilter])

  // REQUEST TRIGGER FOR PAGINATION REQUEST
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (
            productList &&
            productList.length != 0 &&
            productList[0].totalItems
          ) {
            if (productList.length < productList[0].totalItems) {
              setDisplayBtn(true)
            } else {
              setDisplayBtn(false)
            }
          }
        }
      },
      { root: null, threshold: 1.0 }, // Fully visible
    )

    if (lastProductRef.current) {
      observer.observe(lastProductRef.current)
    }

    return () => {
      if (lastProductRef.current) {
        observer.unobserve(lastProductRef.current)
      }
    }
  }, [productList])

  return (
    <div className='body-container'>
      <Fragment>
        <Fragment>
          <div className='market-place-center-container'>
            <div className='title-container-2-link'>
              <div
                className={
                  selectedFilter.mainCategory === undefined
                    ? 'title-category-selected-style'
                    : 'title-category-style'
                }
                onClick={() => onClickMainCategory(undefined)}
              >
                All Items
              </div>
              <div
                className={
                  selectedFilter.mainCategory === 1
                    ? 'title-category-selected-style'
                    : 'title-category-style'
                }
                onClick={() => onClickMainCategory(1)}
              >
                Men
              </div>
              <div
                className={
                  selectedFilter.mainCategory === 2
                    ? 'title-category-selected-style'
                    : 'title-category-style'
                }
                onClick={() => onClickMainCategory(2)}
              >
                Women
              </div>
              <div
                className={
                  selectedFilter.mainCategory === 3
                    ? 'title-category-selected-style'
                    : 'title-category-style'
                }
                onClick={() => onClickMainCategory(3)}
              >
                Kids
              </div>
              <div
                className={
                  selectedFilter.mainCategory === 4
                    ? 'title-category-selected-style'
                    : 'title-category-style'
                }
                onClick={() => onClickMainCategory(4)}
              >
                Sale
              </div>
              <div
                className={
                  selectedFilter.mainCategory === 5
                    ? 'title-category-selected-style'
                    : 'title-category-style'
                }
                onClick={() => onClickMainCategory(5)}
              >
                Best Sellers
              </div>
              <div
                className={
                  selectedFilter.mainCategory === 6
                    ? 'title-category-selected-style'
                    : 'title-category-style'
                }
                onClick={() => onClickMainCategory(6)}
              >
                New & Featured
              </div>
              {displayFilter && (
                <FilterHiglightedIcon onClick={() => setDisplayFilter(false)} />
              )}
              {!displayFilter && (
                <FilterIcon onClick={() => setDisplayFilter(true)} />
              )}
            </div>
            <div className='scrollable-center-container'>
              {productList?.map((product, index) => {
                const isLastProduct = index === productList.length - 1
                return (
                  <div
                    key={index}
                    className='image-main-container'
                    ref={isLastProduct ? lastProductRef : null}
                  >
                    <div className='image-just-style-container'>
                      {product.justIn && (
                        <div className='image-just-in-container'>JUST IN</div>
                      )}
                    </div>
                    <div
                      className='image-container'
                      onClick={() => {
                        setProductDetails(product)
                        setOpenDetailModal(true)
                      }}
                    >
                      <Image
                        radius='none'
                        isZoomed
                        className='image-style'
                        alt={`Product ${product.productName} Image`}
                        src={`${`data:image/jpeg;base64,`}${product.image1}`}
                      />
                    </div>
                    <div className='image-detail-container'>
                      <div className='image-price-on-stock-container'>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {product.productDiscount && (
                            <div className='image-price-label-container'>
                              {discountCalculator(
                                product.productPrice,
                                product.productDiscount,
                                product.productCurrency,
                              )}
                            </div>
                          )}
                          <div
                            className={
                              product.productDiscount
                                ? 'image-price-label-container-discounted'
                                : 'image-price-label-container'
                            }
                          >
                            {getProductPriceAndCurrency(product)}
                          </div>
                          {product.productDiscount && (
                            <div className='image-discount-label-container'>
                              {`${product.productDiscount}%`}
                            </div>
                          )}
                        </div>
                        {product.isSold ? (
                          <div className='image-out-of-stock-container'>
                            OUT OF STOCK
                          </div>
                        ) : (
                          <div className='image-on-stock-container'>
                            ON STOCK
                          </div>
                        )}
                      </div>
                      <div className='image-name-label-container'>
                        {getProductNameAndCondition(product).length >= 50
                          ? getProductNameAndCondition(product).substring(
                              0,
                              50,
                            ) + '...'
                          : getProductNameAndCondition(product)}
                      </div>
                      <div className='image-name-label-container'>
                        {product.productLocation}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {displayBtn && (
              <div
                style={{
                  width: '100%',
                  backgroundColor: 'green',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  onClick={() => {
                    setSelectedFilter((prev) => {
                      return {
                        ...prev,
                        limit: prev.limit * 2,
                      }
                    })
                  }}
                >
                  Load more items
                </div>
              </div>
            )}
          </div>
        </Fragment>
        {productDetails && (
          <ProductDetailsModal
            openDetailModal={openDetailModal}
            productMasterId={productDetails.id}
            setOpenDetailModal={setOpenDetailModal}
          />
        )}
        <HomeFilter
          displayFilter={displayFilter}
          selectedFilter={selectedFilter}
          setDisplayFilter={setDisplayFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </Fragment>
    </div>
  )
}
