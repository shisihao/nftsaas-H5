import request from '/@/utils/request'

// 广告位
export function getAdPos(data) {
  return request.post(`/ad/pos`, {
    ...data
  })
}

// 广告
export function getAdList({ id , ...data }) {
  return request.post(`/ads/${id}/list`, {
    ...data
  })
}
