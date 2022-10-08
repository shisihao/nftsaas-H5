import request from '@/utils/request'

// 用户盲盒
export function getMyBox(data) {
  return request.post(`/user_goods/user_box/list`, {
    ...data
  })
}

// 盲盒详情
export function boxDetail(data) {
  return request.post(`/box/detail`, {
    ...data
  })
}

// 盲盒开启
export function boxOpen(data) {
  return request.post(`/user_goods/user_box/open`, {
    ...data
  })
}
