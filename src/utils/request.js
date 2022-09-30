import axios from 'axios'
import { showFailToast } from 'vant'
import store from '/@/store/index'
import router from '/@/router/index'
import { getToken, TokenKey } from '/@/utils/auth'

/* import Qs from 'qs' */
/* import { encryption, decryption } from '@/utils/cryption' */

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // // `withCredentials` 表示跨域请求时是否需要使用凭证
  timeout: 60 * 1e3 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken(TokenKey)) {
      config.headers['Authorization'] = 'Bearer ' + getToken(TokenKey)
    }

   /*  config.transformRequest = [function (data) {
      // console.log("🚀 ~ file: request.ts ~ line 38 ~ data", data)
      // 在请求之前对data传参进行格式转换
      data = Qs.stringify({encrypt_content: encryption(data)});
      
      return data
    }] */
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (!([0, 4001, 1008].includes(res.code))) {
      showFailToast(res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    } else if (res.code === 1008) { // 已售罄
      return res
    } else if (res.code === 4001) { // 未登录
      showFailToast(res.msg)
      router.replace({ path: '/login' })
      return Promise.reject(res)
    } else {
       // 解密
       if (!res.data)  {
        res.data = {}
      } else {
        // let result = ['/orders/pay'].includes(response.config.url) ? res.data : decryption(res.data)
        let result = res.data
        res.data = typeof(result) === 'string' && (result.indexOf('[') === 0 || result.indexOf('{') === 0) ? JSON.parse(result) : result
      }
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response && error.response.status === 503) {
      router.replace({ path: '/503' })
    } else if (error.response && error.response.status === 500) { 
      showFailToast('网络错误')
    } else {
      console.log(error.message || error)
      // showFailToast(error.message || error)
    }
    return Promise.reject(error)
  }
)

export default service
