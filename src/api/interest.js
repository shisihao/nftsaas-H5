import request from '@/utils/request'

// 权益中心
export function interest() {
  return request.post(`/interest`)
}

// 权益中心列表
export function interestList(data) {
  return request.post(`/interest/list`, {
    ...data
  })
}

// 权益记录

export function interestLogs(data) {
  return request.post(`/interest/logs`, {
    ...data
  })
}

