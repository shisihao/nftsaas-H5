import { getImageUrl } from '@/utils/index'

export const pages = {
  page: 1,
  limit: 10
}

// 默认主题色
export const themeColor = '#1275E4'

export const salesOptions = [
  { label: '开售', class: 'sales-default', value: 1 },
  { label: '即将开售', class: 'sales-primary', value: 2 },
  { label: '售卖中', class: 'sales-warning', value: 3 },
  { label: '期待下次销售', class: 'sales-info', value: 4 },
  { label: '已售罄', class: 'sales-info', value: 5 }
]

export const attestationOptions = [
  { label: '未认证', value: -1 },
  { label: '已认证', value: 1 },
  { label: '认证失败', value: 2 }
]

export const orderOptions = [
  { label: '全部', icon: '', value: -1 },
  { label: '待付款', icon: 'clock', value: 0 },
  { label: '发放中', icon: 'underway', value: 1 },
  { label: '已完成', icon: 'checked', value: 2 },
  { label: '已取消', icon: 'clear', value: 3 }
]

export const payTypeOptions = [
  { label: '支付宝', icon: 'alipay', value: 'alipay' },
  { label: '微信', icon: 'wxpay', value: 'wxpay' }
]

export const integralOptions = [
  { label: '积分', icon: 'integral', value: 'integral' }
]

export const actionTransferOptions = [
  { label: '全部', value: '' },
  { label: '转出', value: 'expend' },
  { label: '转入', value: 'income' }
]

export const avatarActions = [
	{ name: '相册', color: 'var(--root-theme-color)' }
]

export const taskOptions = [
  { icon: getImageUrl('integral/qd.png'), value: 'sign:in' }, // 签到
  { icon: getImageUrl('integral/fenxiang.png'), value: 'share:goods' }, // 分享藏品
  { icon: getImageUrl('integral/zhuce.png'), value: 'register' }, // 注册
  { icon: getImageUrl('integral/shoucang.png'), value: 'collect:goods' }, // 收藏
  { icon: getImageUrl('integral/xuanyao.png'), value: 'show:goods' }, // 炫耀
  { icon: getImageUrl('integral/rz.png'), value: 'real:name:auth' }, // 实名认证
  { icon: getImageUrl('integral/jfgm.png'), value: 'integral:goods' }, // 积分购买
  { icon: getImageUrl('integral/gmcp.png'), value: 'buy:goods' }, // 购买藏品
  { icon: getImageUrl('integral/yqhy.png'), value: 'invite:friend' }, // 邀请好友
]
