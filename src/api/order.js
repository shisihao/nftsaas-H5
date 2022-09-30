import request from '/@/utils/request'

// 订单列表
export function dataList(data) {
  return request.post(`/orders`, {
    ...data
  })
}

// 订单详情
export function orderDetail(data) {
  return request.post(`/orders/detail`, {
    ...data
  })
}

// 藏品下单
export function orderPlace(data) {
  return request.post(`/orders/goods`, {
    ...data
  })
}

// 盲盒下单
export function boxPlace(data) {
  return request.post(`/orders/box`, {
    ...data
  })
}


// 订单支付
export function orderPay(data) {
  return request.post(`/orders/pay`, {
    ...data
  })
}

// 取消订单
export function orderClose(data) {
  return request.post(`/orders/close`, {
    ...data
  })
}
