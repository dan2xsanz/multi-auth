import { ProductListFilterInterfaceValues } from '@/app'
import { FavoritesInterface } from '@/app/home/components/home-tab'
import { ResponseInterface } from '@/config/config'
import { REQUEST_URL } from '@/properties'
import axios, { AxiosError, AxiosResponse } from 'axios'

export const AddToMyFavorites = (
  data: FavoritesInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/favorites/add-favorite`,
        data,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}

export const DeleteMyFavorites = (
  data: FavoritesInterface,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .put<ResponseInterface>(
        `${REQUEST_URL}/master-record/favorites/delete-favorite`,
        data,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}

export const ListOfFavorites = (
  productMasterId: number | undefined,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/favorites/favorites-by-product/${productMasterId}`,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}

export const ListOfFavoritesByAccount = (
  selectedFilter: ProductListFilterInterfaceValues,
): Promise<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    axios
      .post<ResponseInterface>(
        `${REQUEST_URL}/master-record/favorites/favorites-by-account`,
        selectedFilter,
      )
      .then(function (response: AxiosResponse<ResponseInterface>) {
        resolve(response.data)
      })
      .catch(function (error: AxiosError) {
        reject(error)
      })
  })
}
