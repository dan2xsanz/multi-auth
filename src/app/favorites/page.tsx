'use client'
import {
  ProductDetailsModal,
  ProductListFilterInterfaceValues,
  ProductListInterfaceValues,
  UploadProductInterface,
} from '@/index'
import { FavoritesProducts } from './components/favorite-products'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { accountDetailStore, useStore } from '@/app/store'
import { ProductListInterface } from '../home/components/home-tab/data'
import { getAllFavoriteProducts } from './operation'

export default function Favorites() {
  // SAMPLE PAGINATION IMPLEMENTATION
  const lastProductRef = useRef(null)

  // PRODUCT LIST
  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // SELECTED PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState<ProductListInterface>()

  // OPEN PRODUCT DETAIL MODAL
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  // DISPLAY LOAD MORE BUTTON
  const [displayBtn, setDisplayBtn] = useState<boolean>(false)

  // ACCOUNT DETAILS
  const { accountId } = accountDetailStore()

  // SELECTED FILTER
  const [selectedFilter, setSelectedFilter] =
    useState<ProductListFilterInterfaceValues>({
      ...ProductListInterfaceValues,
      accountId: accountId,
    })

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // GET ALL FAVORITES
  useEffect(() => {
    setOpenDetailModal(true)
    getAllFavoriteProducts(setIsLoading, setProductList, selectedFilter)
  }, [productDetails, setIsLoading, selectedFilter])

  // REQUEST TRIGGER FOR PAGINATION REQUEST
  useEffect(() => {
    if (productList?.length === 0) {
      setDisplayBtn(false)
    } else {
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
    }
  }, [productList])

  return (
    <div className='main-profile-container'>
      {productList?.length && (
        <Fragment>
          {productList?.map((product, index) => {
            const isLastProduct = index === productList.length - 1
            return (
              <div key={index} ref={isLastProduct ? lastProductRef : null}>
                <FavoritesProducts
                  key={index}
                  setProductDetails={setProductDetails}
                  productUploadDetailsResponse={product}
                />
              </div>
            )
          })}
        </Fragment>
      )}
      {displayBtn && (
        <div className='load-more-container-style'>
          <div
            className='load-more-label'
            onClick={() => {
              setSelectedFilter((prev) => {
                return {
                  ...prev,
                  limit: prev.limit && prev.limit * 2,
                }
              })
            }}
          >
            Load more items
          </div>
        </div>
      )}
      {productDetails && (
        <ProductDetailsModal
          openDetailModal={openDetailModal}
          productMasterId={productDetails.id}
          setOpenDetailModal={setOpenDetailModal}
        />
      )}
    </div>
  )
}
