import request from '/@/utils/request'

// 消息列表
export function dataList(data) {
  return request.post(`/messages`, {
    ...data
  })
}

// 未读消息
export function getMsgCount(data) {
  return request.post(`/messages/message-count`, {
    ...data
  })
}
