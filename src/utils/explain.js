import { paraphrase } from '@/filters/index'

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
  { label: '微信', icon: 'wxpay', value: 'wxpay' },
  { label: '银行卡', icon: 'bank', value: 'bank' },
  { label: '云账户', icon: 'sandpay', value: 'sandpay' }
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

export const equityOptions = [
	{ label: '提前购', icon: 'quanyi_icon_tqg', value: 'prior' },
	{ label: '提前赠', icon: 'quanyi_icon_tqz', value: 'give' },
	{ label: `免${paraphrase({ value: 'integral', options: integralOptions })}`, icon: 'quanyi_icon_mjf', value: 'free_integral' },
	{ label: '0元购', icon: 'quanyi_icon_lyg', value: 'free_cny' },
	{ label: '折扣购', icon: 'quanyi_icon_zpzk', value: 'rebate' }
]

export const taskOptions = [
  { icon: 'integral/qd.png', value: 'sign:in' }, // 签到
  { icon: 'integral/fenxiang.png', value: 'share:goods' }, // 分享藏品
  { icon: 'integral/zhuce.png', value: 'register' }, // 注册
  { icon: 'integral/shoucang.png', value: 'collect:goods' }, // 收藏
  { icon: 'integral/xuanyao.png', value: 'show:goods' }, // 炫耀
  { icon: 'integral/rz.png', value: 'real:name:auth' }, // 实名认证
  { icon: 'integral/jfgm.png', value: 'integral:goods' }, // 积分购买
  { icon: 'integral/gmcp.png', value: 'buy:goods' }, // 购买藏品
  { icon: 'integral/yqhy.png', value: 'invite:friend' } // 邀请好友
]
