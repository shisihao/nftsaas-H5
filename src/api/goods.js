import request from '@/utils/request'

// 藏品列表
export function dataList(data) {
  return request.post(`/goods/list`, {
    ...data
  })
}

// 我的藏品（旧）
export function myGoodsList(data) {
  return request.post(`/user_goods/list`, {
    ...data
  })
}

// 藏品详情
export function goodsDetail(data) {
  return request.post(`/goods/detail`, {
    ...data
  })
}

// 用户藏品详情
export function getMyGoodsDetail(data) {
  return request.post(`/user_goods/detail`, {
    ...data
  })
}

// 转赠目标用户
export function giveAccount(data) {
  return request.post(`/user_goods/check_user`, {
    ...data
  })
}

// 用户藏品转赠
export function goodGive(data) {
  return request.post(`/user_goods/give`, {
    ...data
  })
}

// 藏品交易
export function getGoodsTrade(data) {
  return request.post(`/user_goods/collect/trade`, {
    ...data
  })
}

// 转赠记录
export function getGoodsTransfer(data) {
  return request.post(`/user_goods/give/log`, {
    ...data
  })
}

// 藏品列表（新）
export function getGoodsList(data) {
  return request.post(`/user_goods/by_time`, {
    ...data
  })
}

// 标签
export function getGoodsTags(data) {
  return request.post(`/user_goods/tags`, {
    ...data
  })
}

// 标签列表
export function getGoodsTagsList(data) {
  return request.post(`/user_goods/by_tags`, {
    ...data
  })
}