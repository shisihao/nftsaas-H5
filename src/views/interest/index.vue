<template>
	<van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
		<div class="interest-section">
			<div class="header">
				<div class="header-l">
					<div class="avatar">
						<default-avatar v-if="info?.avatar" :src="info ? `${domin}${info.avatar}` : ''" />
						<default-avatar v-else />
					</div>
				</div>
				<div class="header-r">
					<div class="name">{{ info?.name }}</div>
					<div class="desc">
						您已累计享受权益<span>{{ data.total }}</span>次
					</div>
				</div>
			</div>
			<div class="content">
				<div class="title-wrap">
					<div class="title">我的权益</div>
					<div class="logs" @click="$globleFun.onGoto(`/interest-logs`)">使用记录</div>
				</div>
				<div class="details">
					<div class="list-item" @click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'prior', used: data.prior?.used ,usable:data.prior?.usable } })">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/quanyi_icon_mzz.png')" alt="" />
							</div>
						</div>
						<div class="list-item-r">
							<div class="list-item-r-hd">
								<div class="num">藏品提前抢购</div>
								<div class="tag">{{ data.prior?.usable }} 次</div>
							</div>
							<div class="use">已享受 {{ data.prior?.used }} 次</div>
						</div>
					</div>
					<div class="list-item" @click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'give', used: data.give?.used,usable:data.give?.usable } })">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/equities_icon_zhuanzeng@2x.png')" alt="" />
							</div>
						</div>
						<div class="list-item-r">
							<div class="list-item-r-hd">
								<div class="num">藏品提前赠送</div>
								<div class="tag">{{ data.give?.usable }} 次</div>
							</div>
							<div class="use">已享受 {{ data.give?.used }} 次</div>
						</div>
					</div>
					<div class="list-item" @click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'free_integral', used: data.free_integral?.used,usable:data.free_integral?.usable } })">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/quanyi_icon_mzz@2x.png')" alt="" />
							</div>
						</div>
						<div class="list-item-r">
							<div class="list-item-r-hd">
								<div class="num">免{{ paraphrase({ value: 'integral', options: integralOptions })}}抢购藏品</div>
								<div class="tag">{{ data.free_integral?.usable }} 次</div>
							</div>
							<div class="use">已享受 {{ data.free_integral?.used }} 次</div>
						</div>
					</div>
					<div class="list-item" @click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'free_cny', used: data.free_cny?.used,usable:data.free_cny?.usable } })">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/quanyi_icon_lyg@2x.png')" alt="" />
							</div>
						</div>
						<div class="list-item-r">
							<div class="list-item-r-hd">
								<div class="num">藏品0元购 1次</div>
								<div class="tag">{{ data.free_cny?.usable }} 次</div>
							</div>
							<div class="use">已享受 {{ data.free_cny?.used }} 次</div>
						</div>
					</div>
					<div class="list-item" @click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'rebate', used: data.rebate?.used ,usable:data.rebate?.usable} })">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/equities_icon_zhekou@2x.png')" alt="" />
							</div>
						</div>
						<div class="list-item-r">
							<div class="list-item-r-hd">
								<div class="num">藏品折扣</div>
								<div class="tag">{{ data.rebate?.usable }} 次</div>
							</div>
							<div class="use">已享受 {{ data.rebate?.used }} 次</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</van-pull-refresh>
</template>

<script setup>
import store from '@/store/index'
import { computed, ref } from 'vue'
import { DominKey, getToken } from '@/utils/auth'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import { interest } from '@/api/interest'
import { getImageUrl } from '@/utils/index'
import { integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'

const domin = getToken(DominKey)
const info = computed(() => store.state.user.info)
const data = ref({})
const loading = ref(false)

// 获取列表数据
const onRefresh = () => {
	interest().then(response => {
		data.value = response.data
		loading.value = false
	})
}

onRefresh()
</script>

<style lang="scss" scoped>
.interest-section {
	padding: var(--root-page-spacing);
	background-color: var(--root-bg-color1);
	min-height: calc(100vh - 46px);
}

.header {
	display: flex;
	align-items: center;
	border-radius: 12px;
	margin: 0 var(--root-page-spacing);
	background: url('@/assets/images/interest/equities_card_bg@2x.png') no-repeat;
	background-color: var(--root-theme-color);
	background-size: 100%;
	padding: 16px 12px;

	.header-l {
		display: flex;
		align-items: center;
		margin-right: 10px;

		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 0 0 0 1px var(--root-bg-color2);
		}
	}

	.header-r {
		height: 40px;
		color: var(--root-text-color5);
		font-size: 12px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.name {
			font-size: 16px;
		}
		.desc {
			color: var(--root-text-color4);
			span {
				font-weight: 700;
				margin: 0 6px;
				font-size: 16px;
				color: var(--root-text-color5);
			}
		}
	}
}

.content {
	background: var(--root-bg-color2);
	border-radius: 12px;
	padding: 15px 12px;
	margin-top: -8px;
	.title-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			padding: 6px 0;
			font-size: 18px;
			font-weight: 700;
		}

		.logs {
			color: var(--root-text-color2);
			font-weight: normal;
			&::before{
				content: '';
				display: inline-block;
				width: 16px;
				height: 16px;
				background: url('@/assets/images/interest/equities_icon_rule@2x.png') no-repeat;
				background-size: 100%;
				vertical-align: bottom;
			}
		}
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		padding: 15px 0;

		.list-item-l {
			height: 44px;
			flex-shrink: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.list-img-box {
				width: 44px;
				height: 44px;
				border-radius: 50%;
				background: var(--root-bg-color1);
				display: flex;
				justify-content: center;
				align-items: center;
			}
			img {
				width: 23px;
				height: 23px;
			}
		}

		.list-item-r {
			flex: 1;
			margin-left: 10px;
			.list-item-r-hd {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.num {
					font-weight: 700;
				}
				.tag {
					padding: 3px 10px;
					border-radius: 11px;
					background-color: rgba(var(--root-theme-color-rgb), 0.1);
					color: var(--root-theme-color);
				}
			}

			.use {
				margin-top: 6px;
				font-size: 12px;
			}
		}
	}
}
</style>
