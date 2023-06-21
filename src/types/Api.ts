import { AxiosRequestConfig } from 'axios'

export type Request = AxiosRequestConfig & {
  type?: 'form' | 'csv' | 'multipart'
  token?: string
  payload?: any
}

export type ResponseError = {}

export type Response<T = any> = {
  data: T
}
