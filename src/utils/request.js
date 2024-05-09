import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import message from 'element-ui/packages/message'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use((config) => {
  console.log(config)
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
},
(err) => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, success, message } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    // token超时
    await store.dispatch('user/logout')
    router.push('/login')
  }
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
