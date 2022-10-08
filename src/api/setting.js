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