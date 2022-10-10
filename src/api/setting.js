import request from '@/utils/request'

// 账号换绑
export function userChange(data) {
  return request.post(`/user/change`, {
    ...data
  })
}

//积分流水
export function walletLogs(data) { 
  return request.post(`/user/wallet/logs`, {
    ...data
  })
}

// 任务列表
export function tasksList() { 
  return request.post(`/tasks`)
}

// 提交任务
export function subTasks(data) { 
  return request.post(`/tasks/store`, {
    ...data
  })
}