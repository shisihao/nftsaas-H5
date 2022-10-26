import Cookies from 'js-cookie'
import { parseParam } from '@/utils/index'

export const TokenKey = 'Saasnft-h5-Token'
export const OssKey = 'Saasnft-Oss-Token'
export const DominKey = 'Saasnft-Domin-Token'

// 衫德
export const meta_option = { meta_option: '[{"s":"Android","n":"","id":"","sc":""},{"s":"IOS","n":"","id":"","sc":""}]' }

export const sandQuickUrl = `https://sandcash.mixienet.com.cn/pay/h5/quicktopup?${parseParam(meta_option)}&`  // 快捷支付

export function getToken(key = TokenKey) {
  return Cookies.get(key)
}

export function setToken({ key = TokenKey, value = '' } = {}) {
  return Cookies.set(key, value)
}

export function removeToken(key = TokenKey) {
  return Cookies.remove(key)
}
