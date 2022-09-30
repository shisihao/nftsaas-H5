import request from '/@/utils/request'

// 发送验证码
export function verificationCode(data) {
  return request.post(`/verification-codes`, {
    ...data
  })
}

// 验证验证码
export function verificationCodeCheck(data) {
  return request.post(`/verification-codes/check`, {
    ...data
  })
}

// 配置信息
export function getConfig(data) {
  return request.post(`/config`, {
    ...data
  })
}
