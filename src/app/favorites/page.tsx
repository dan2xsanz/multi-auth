'use client'
import { ProductDetailsModal, UploadProductInterface } from '@/index'
import { FavoritesProducts } from './components/favorite-products'
import React, { Fragment, useEffect, useState } from 'react'
import { accountDetailStore, useStore } from '@/app/store'
import { ProductListInterface } from '../home/components/home-tab/data'
import { getAllFavoriteProducts } from './operation'

export default function Favorites() {
  // PRODUCT LIST
  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // SELECTED PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState<ProductListInterface>()

  // OPEN PRODUCT DETAIL MODAL
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  // ACCOUNT DETAILS
  const { accountId } = accountDetailStore()

  // LOADING SCREEN STORE
  const { setIsLoading } = useStore()

  // GET ALL FAVORITES
  useEffect(() => {
    setOpenDetailModal(true)
    getAllFavoriteProducts(accountId, setIsLoading, setProductList)
  }, [accountId, productDetails, setIsLoading])

  return (
    <div className='main-profile-container'>
      {productList?.length && (
        <Fragment>
          {productList?.map((product, index) => (
            <FavoritesProducts
              key={index}
              setProductDetails={setProductDetails}
              productUploadDetailsResponse={product}
            />
          ))}
        </Fragment>
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
