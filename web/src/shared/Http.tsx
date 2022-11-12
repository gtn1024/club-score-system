import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>) {
    return this.instance.request<R>({ url, params: query, method: 'GET', ...config })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({ url, data, method: 'POST', ...config })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({ url, data, method: 'PATCH', ...config })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>) {
    return this.instance.request<R>({ url, params: query, method: 'DELETE', ...config })
  }
}

export const http = new Http('/api')
// http.instance.interceptors.response.use(response => {
//   console.log('response')
//   return response
// }, error => {
//   if (error.response) {
//     const axiosError = error as AxiosError
//     if (axiosError.response?.status === 429) {
//       alert('你太频繁了')
//     }
//   }
//   throw error
// })