import request from '@/utils/request'
// 三要素
// 发起认证请求
export function certifyInfo(data) {
  return request.post(`/certification/certify_info`, {
    ...data
  })
}

// 提交实人认证
export function certifyAli(data) {
  return request.post(`/certification/ali`, {
    ...data
  })
}

// 实名认证信息
export function getCertify(data) {
  return request.post(`/certification/info`, {
    ...data
  })
}

// 二要素
// 发起认证请求
export function postCertify(data) {
  return request.post(`/certification`, {
    ...data
  })
}