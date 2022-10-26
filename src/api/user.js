import request from '@/utils/request'

// 登录
export function login(data) {
  return request.post(`/user/login`, {
    ...data
  })
}

// 注册
export function register(data) {
  return request.post(`/user/register`, {
    ...data
  })
}

// 重置密码
export function forgetPassword(data) {
  return request.post(`/user/forget-password`, {
    ...data
  })
}

// 修改密码
export function changePassword(data) {
  return request.post(`/user/password`, {
    ...data
  })
}

// 支付密码
export function payPassword(data) {
  return request.post(`/user/paypassword`, {
    ...data
  })
}

// 用户信息
export function getInfo(data) {
  return request.post(`/user`, {
    ...data
  })
}

// 邀请
export function getInvite(data) {
  return request.post(`/invite`, {
    ...data
  })
}

// 昵称，头像
export function putUser(data) {
  return request.post(`/user/update`, {
    ...data
  })
}

// 退出登录
export function logout(data) {
  return request.post(`/user/login`, {
    ...data
  })
}

// 杉德云账户开户
export function sandOpen(data) {
  return request.post(`/user/sand_open`, {
    ...data
  })
}

// 杉德开户支付
export function sandOpenPay(data) {
  return request.post(`/user/sand_open_pay`, {
    ...data
  })
}