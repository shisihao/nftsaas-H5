import Cookies from 'js-cookie'

export const TokenKey = 'Dcnft-h5-Token'
export const OssKey = 'Dc-Oss-Token'
export const DominKey = 'Dc-Domin-Token'

export function getToken(key = TokenKey) {
  return Cookies.get(key)
}

export function setToken({ key = TokenKey, value = '' } = {}) {
  return Cookies.set(key, value)
}

export function removeToken(key = TokenKey) {
  return Cookies.remove(key)
}
