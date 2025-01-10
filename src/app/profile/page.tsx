'use client'
import { GetProductByFilterRequest, UpdateProductRequest } from '@/app/service'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { openErrorNotification } from '@/app/common/pop-up'
import { accountDetailStore, useStore } from '@/app/store'
import { ProductListInterface } from '../home/components/home-tab/data'
import { ResponseInterface } from '@/config/config'
import { AddIcon } from '@/app/common/icons'
import { Image } from '@nextui-org/react'
import './profile-tab.css'
import {
  ProductDetailsModal,
  ButtonColorTypeEnum,
  ButtonTypeEnum,
  CommonButon,
  SizeEnum,
  DEFAULT_PROFILE,
  UploadProductInterface,
  UploadProductValues,
  ProductListFilterInterfaceValues,
  ProductListInterfaceValues,
} from '@/index'
import { UploadedProducts } from './components/uploaded-products'
import { UploadProduct } from './components/upload-products'
import { EditProfile } from './components/edit-profile'
import { useRouter } from 'next/navigation'

export default function Profile() {
  // ROUTER
  const router = useRouter()

  // SAMPLE PAGINATION IMPLEMENTATION
  const lastProductRef = useRef(null)

  // LOADING SCREEN STORE
  const { setIsLoading, isLoading } = useStore()

  // ACCOUNT DETAILS
  const accountStoreProperties = accountDetailStore()

  // PRODUCT UPLOAD DETAILS
  const [productUploadDetails, setProductUploadDetails] =
    useState<UploadProductInterface>(UploadProductValues)

  // OPEN PRODUCT MODAL
  const [openAddNewProduct, setOpendAddNewProduct] = useState<boolean>(false)

  // PRODUCT LIST
  const [productList, setProductList] = useState<UploadProductInterface[]>()

  // SELECTED PRODUCT DETAILS
  const [productDetails, setProductDetails] = useState<ProductListInterface>()

  // OPEN PRODUCT DETAIL MODAL
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  // EDIT PROFILE MODAL
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false)

  // REFRESH LIST HANDLER
  const [refreshList, setRefreshList] = useState<boolean>(false)

  // SELECTED FILTER
  const [selectedFilter, setSelectedFilter] =
    useState<ProductListFilterInterfaceValues>({
      ...ProductListInterfaceValues,
      accountId: accountStoreProperties.accountId,
    })

  // DISPLAY LOAD MORE BUTTON
  const [displayBtn, setDisplayBtn] = useState<boolean>(false)

  // REFRESH LIST OF PRODUCTS
  const getAllProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const response: ResponseInterface = await GetProductByFilterRequest({
        ...selectedFilter,
        limit: selectedFilter.limit,
        offset: selectedFilter.offset,
      })
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
      setRefreshList(false)
    }
  }, [accountStoreProperties.accountId, setIsLoading, selectedFilter])

  // UDPATE SPEFIC PRODUCT HANDLER
  const updateSpecificProduct = async (
    currentProductDetails: UploadProductInterface,
  ) => {
    if (currentProductDetails.id !== undefined) {
      setIsLoading(true)
      try {
        await UpdateProductRequest({
          ...currentProductDetails,
          accountMasterId: accountStoreProperties.accountId,
        })
      } catch (error: any) {
        // RETURN ERROR MESSAGE
        openErrorNotification({
          description: error.response?.data?.message || 'An error occurred',
          placement: 'bottomRight',
        })
      } finally {
        setRefreshList(true)
        setIsLoading(false)
      }
    }
  }

  const coverRef = useRef(null)
  const [editPosition, setEditPosition] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState(false)
  const [initialMouseY, setInitialMouseY] = useState(0)
  const [backgroundPositionY, setBackgroundPositionY] = useState(0)

  const handleMouseDown = (e: any) => {
    if (editPosition) {
      setIsDragging(true)
      setInitialMouseY(e.clientY)
    }
  }

  const handleMouseMove = (e: any) => {
    if (isDragging && editPosition) {
      const deltaY = e.clientY - initialMouseY
      setBackgroundPositionY((prev) => prev + deltaY)
      setInitialMouseY(e.clientY)
    }
  }

  const handleMouseUp = () => {
    if (editPosition) {
      setIsDragging(false)
    }
  }

  // REFRESH LIST EVENT HANDLER
  useEffect(() => {
    getAllProducts()
  }, [getAllProducts, refreshList, selectedFilter])

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
      <div
        ref={coverRef}
        className={
          editPosition
            ? 'main-profile-container-cover-image-name main-profile-container-cover-image-name-dragging'
            : 'main-profile-container-cover-image-name'
        }
        style={{
          backgroundImage: accountStoreProperties.coverImg
            ? accountStoreProperties.coverImg
            : 'none',
          backgroundPosition: `center ${backgroundPositionY}px`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className='main-profile-button-container'>
          {!editPosition && (
            <Fragment>
              {/* <CommonButon
                size={SizeEnum.small}
                buttonTxt={'Reposition'}
                type={ButtonTypeEnum.submit}
                onClick={() => setEditPosition(true)}
              /> */}
              <CommonButon
                size={SizeEnum.small}
                buttonTxt={'Logout'}
                type={ButtonTypeEnum.submit}
                onClick={() => router.push('/login')}
              />
              <CommonButon
                size={SizeEnum.small}
                buttonTxt={'Edit Profile'}
                type={ButtonTypeEnum.submit}
                onClick={() => setOpenEditProfile(true)}
                buttonColorType={ButtonColorTypeEnum.primary}
              />
            </Fragment>
          )}
          {editPosition && (
            <CommonButon
              size={SizeEnum.small}
              buttonTxt={'Save'}
              type={ButtonTypeEnum.submit}
              onClick={() => setEditPosition(false)}
              buttonColorType={ButtonColorTypeEnum.primary}
            />
          )}
        </div>
      </div>
      <div className='main-profile-image-details-container'>
        <div className='main-profile-image-container'>
          <Image
            isZoomed
            radius='full'
            className='main-profile-image'
            alt='NextUI Fruit Image with Zoom'
            src={
              accountStoreProperties.profileImg !== 'data:image/png;base64,null'
                ? accountStoreProperties.profileImg
                : DEFAULT_PROFILE
            }
          />
        </div>
        <div className='main-profile-name-membership'>
          <div className='main-profile-name-container'>{`${accountStoreProperties.firstName} ${accountStoreProperties.lastName}`}</div>
          <div className='main-profile-membership'>
            SNZ. Member Since October 2024
          </div>
        </div>
      </div>
      {productList?.length && (
        <div className='selling-title-container'>
          <div>Selling Products</div>
          <CommonButon
            size={SizeEnum.small}
            type={ButtonTypeEnum.submit}
            buttonTxt={'+ Add New Product'}
            onClick={() => setOpendAddNewProduct(true)}
            buttonColorType={ButtonColorTypeEnum.primary}
          />
        </div>
      )}
      <div className='listing-container'>
        {!productList?.length && !isLoading && (
          <div
            className='add-new-listing-container'
            onClick={() => setOpendAddNewProduct(true)}
          >
            <AddIcon style={{ marginLeft: '20px' }} />
            <div style={{ textAlign: 'center' }}>
              When you start selling, your listings will appear here.
            </div>
          </div>
        )}
        {productList?.length && (
          <div style={{ width: '100%' }}>
            {productList?.map((product, index) => {
              const isLastProduct = index === productList.length - 1
              return (
                <div key={index} ref={isLastProduct ? lastProductRef : null}>
                  <UploadedProducts
                    key={index}
                    setOpenDetailModal={setOpenDetailModal}
                    setProductDetails={setProductDetails}
                    productUploadDetailsResponse={product}
                    onClickEditProduct={(data: UploadProductInterface) => {
                      setProductUploadDetails(data)
                      setOpendAddNewProduct(true)
                    }}
                    onClickMarkAsSold={(data: UploadProductInterface) => {
                      updateSpecificProduct(data)
                    }}
                    onClickDeleteProduct={(data: UploadProductInterface) => {
                      updateSpecificProduct(data)
                    }}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
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
      <UploadProduct
        setRefreshList={setRefreshList}
        openAddNewProduct={openAddNewProduct}
        productUploadDetails={productUploadDetails}
        setOpendAddNewProduct={setOpendAddNewProduct}
        setProductUploadDetails={setProductUploadDetails}
      />
      {productDetails && (
        <ProductDetailsModal
          openDetailModal={openDetailModal}
          productMasterId={productDetails.id}
          setOpenDetailModal={setOpenDetailModal}
        />
      )}
      {openEditProfile && (
        <EditProfile
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
        />
      )}
    </div>
  )
}
