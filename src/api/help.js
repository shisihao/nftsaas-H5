import request from '/@/utils/request'

// 消息列表
export function dataList(data) {
  return request.post(`/help`, {
    ...data
  })
}