import axios, { AxiosError } from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { code, message } = response.data
  if (code !== 0) {
    ElMessage.error(message)
    return Promise.reject(message)
  }
  return response.data
}, (error: AxiosError) => {
  const res = error?.response
  // 401 未登录 token失效
  if (res && +res.status === 401) {
    store.dispatch('user/resetToken').then(() => {
      window.location.reload()
    })
  }
  ElMessage.error(error.message)
  return Promise.reject(error)
})

export default service
