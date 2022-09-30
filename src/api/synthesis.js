import request from '/@/utils/request'

// 合成列表
export function dataList(data) {
  return request.post(`/synthesis/list`, {
    ...data
  })
}

//合成记录
export function recordList(data) { 
  return request.post(`/synthesis/record`, {
    ...data
  })
}

//合成详情
export function synthesisDetail(id) { 
  return request.post(`/synthesis/${id}`)
}

//合成
export function synthesis(data) { 
  return request.post(`/synthesis`, {
    ...data
  })
}