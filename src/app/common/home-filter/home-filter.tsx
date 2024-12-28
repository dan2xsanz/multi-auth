import {
  productCategoryItems,
  productConditionItems,
  ProductListFilterInterfaceValues,
  ProductListInterfaceValues,
} from '@/app'
import React, { useEffect, useState } from 'react'
import { CommonModal } from '../modal/modal'

import './home-filter-style.css'

interface HomeFilterInteface {
  displayFilter: boolean
  setDisplayFilter: (data: boolean) => void
  selectedFilter: ProductListFilterInterfaceValues
  setSelectedFilter: (data: ProductListFilterInterfaceValues) => void
}

export const HomeFilter = ({
  setSelectedFilter,
  setDisplayFilter,
  selectedFilter,
  displayFilter,
}: HomeFilterInteface) => {
  // CURRENT SELECTED FILTER HANDLER
  const [currentFilterSelected, setCurrentFilterSelected] =
    useState<ProductListFilterInterfaceValues>(selectedFilter)

  // ON CLICK PRODUCT CATEGORY ITEM
  const onClickProductCategoryItem = (item: { value: number | undefined }) => {
    setCurrentFilterSelected({
      ...currentFilterSelected,
      productCategory:
        item.value === currentFilterSelected.productCategory
          ? undefined
          : item.value,
    })
  }

  // ON CLICK PRODUCT CONDITION ITEM
  const onClickProductConditionItem = (item: {
    value: number | undefined
  }): void => {
    setCurrentFilterSelected({
      ...currentFilterSelected,
      productCondition:
        item.value === currentFilterSelected.productCondition
          ? undefined
          : item.value,
    })
  }

  return (
    <CommonModal
      isShowLogo
      height='480px'
      width='800px'
      onOkayText='Apply Filter'
      isShowFooterButtons
      onCancelText='Cancel'
      title={`Search Filter`}
      isOpen={displayFilter}
      onOkay={() => {
        setDisplayFilter(false)
        setSelectedFilter(currentFilterSelected)
        setCurrentFilterSelected(currentFilterSelected)
      }}
      onCancel={() => {
        setDisplayFilter(false)
        setSelectedFilter(selectedFilter)
        setCurrentFilterSelected(selectedFilter)
      }}
    >
      <div>
        <div className='market-place-product-categories-container'>
          <div style={{ width: '100%', height: '100%' }}>
            {/* PRODUCT CATEGORIES */}
            <div className='product-categories-container'>
              {/* PRODUCT CONDITION */}
              <ul>
                {productConditionItems.map((item, index) => (
                  <li
                    key={index}
                    className={
                      currentFilterSelected.productCondition === item.value
                        ? 'category-selected-item-style'
                        : 'category-option-item-style'
                    }
                    onClick={() => onClickProductConditionItem(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className='product-category-divider' />
              <ul>
                {productCategoryItems.map((item, index) => (
                  <li
                    key={index}
                    className={
                      currentFilterSelected.productCategory === item.value
                        ? 'category-selected-item-style'
                        : 'category-option-item-style'
                    }
                    onClick={() => onClickProductCategoryItem(item)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div style={{ width: '100%' }}>SAMPLE</div> */}
        </div>
      </div>
    </CommonModal>
  )
}
