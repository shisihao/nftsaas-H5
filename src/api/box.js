import request from '@/utils/request'

// 用户盲盒
export function getMyBox(data) {
  return request.post(`/user_box/list`, {
    ...data
  })
}

// 盲盒详情
export function boxDetail(data) {
  return request.post(`/box/detail`, {
    ...data
  })
}

// 我的盲盒详情
export function getMyBoxDetail(data) {
  return request.post(`/user_box/detail`, {
    ...data
  })
}

// 盲盒开启
export function boxOpen(data) {
  return request.post(`/user_box/open`, {
    ...data
  })
}

// 盲盒转赠
export function boxGive(data) {
  return request.post(`/user_box/give`, {
    ...data
  })
}

// 用户盲盒详情
export function getMyBoxDetail(data) {
  return request.post(`/user_box/detail`, {
    ...data
  })
}

