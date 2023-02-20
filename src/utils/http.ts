import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constant/httpStatusCode.enum'
import path from 'src/constant/path'
import { AuthResponse } from 'src/types/auth.type'
import {
  clearAccessTokenFromLocalStorage,
  clearUserProfileFromLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setUserProfileToLocalStorage
} from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10 * 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccessTokenToLocalStorage(this.accessToken)
          setUserProfileToLocalStorage(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearAccessTokenFromLocalStorage()
          clearUserProfileFromLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
