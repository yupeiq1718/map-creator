import axios, { AxiosResponse, AxiosError } from 'axios'

const useApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  timeout: 10000
})

useApi.interceptors.request.use(request => {
  console.log(request)
  return Promise.resolve(request)
}, error => {
  return Promise.reject(error)
})

useApi.interceptors.response.use((response:AxiosResponse) => {
  console.log(response)
  return Promise.resolve(response)
}, (error:AxiosError) => {
  return Promise.reject(error)
})

export {
  useApi
}
