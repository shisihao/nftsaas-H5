import request from '@/utils/request'

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

// 获取OSSKEY
export function getOssKey() {
  return request.post(`/upload/token`)
}

// 转赠下单
export function orderGoodBox(data) {
  return request.post(`/user_goods/give_order`, {
    ...data
  })
}

// 转赠支付
export function payGoodBox(data) {
  return request.post(`/user_goods/give_order/pay`, {
    ...data
  })
}
