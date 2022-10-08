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
					您已累计享受权益<span>{{ data.total }}</span>次
				</div>
			</div>
			<div class="content">
				<div class="title-wrap">
					<div class="title">我的权益</div>
					<div class="logs" @click="$globleFun.onGoto(`/interest-logs`)">使用记录</div>
				</div>
				<div class="details">
					<div class="list-item">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/quanyi_icon_tqg.png')" alt="" />
							</div>
							<div class="list-item-text">
								<div class="num">藏品提前抢购</div>
								<div class="use">已经享受 {{  }} 次</div>
							</div>
						</div>
						<div class="list-item-r">
							<span class="list-item-tag">?次</span>
						</div>
					</div>
					<div class="list-item"
						@click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'prior', used: data.prior?.used } })">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/equities_icon_yougou@2x.png')" alt="" />
							</div>
							<div class="list-item-text">
								<div class="num">藏品优购</div>
								<div class="use">已经享受 {{ data.prior?.used }} 次</div>
							</div>
						</div>
						<div class="list-item-r">
							<span class="list-item-tag">?次</span>
						</div>
					</div>
					<div class="list-item">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/quanyi_icon_mzz.png')" alt="" />
							</div>
							<div class="list-item-text">
								<div class="num">免积分抢购藏品</div>
								<div class="use">已经享受 {{  }} 次</div>
							</div>
						</div>
						<div class="list-item-r">
							<span class="list-item-tag">?次</span>
						</div>
					</div>
					<div class="list-item">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/quanyi_icon_lyg.png')" alt="" />
							</div>
							<div class="list-item-text">
								<div class="num">藏品0元购 1次</div>
								<div class="use">已经享受 {{  }} 次</div>
							</div>
						</div>
						<div class="list-item-r">
							<span class="list-item-tag">?次</span>
						</div>
					</div>
					<div class="list-item"
					@click="$globleFun.onGoto({path:'/interest-details', query: { type: 'give', used: data.give?.used }})">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/equities_icon_zhuanzeng@2x.png')" alt="" />
							</div>
							<div class="list-item-text">
								<div class="num">藏品提前转赠</div>
								<div class="use">已经享受 {{ data.give?.used }} 次</div>
							</div>
						</div>
						<div class="list-item-r">
							<span class="list-item-tag">?次</span>
						</div>
					</div>
					<div class="list-item"
					@click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'rebate', used: data.rebate?.used }} )">
						<div class="list-item-l">
							<div class="list-img-box">
								<img :src="getImageUrl('interest/equities_icon_zhekou@2x.png')" alt="" />
							</div>
							<div class="list-item-text">
								<div class="num">藏品折扣</div>
								<div class="use">已经享受 {{ data.rebate?.used }} 次</div>
							</div>
						</div>
						<div class="list-item-r">
							<span class="list-item-tag">?次</span>
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
	min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
	padding: 12px var(--root-page-spacing);
}

.header {
	display: flex;
	align-items: center;
	border-radius: 12px 12px 0 0;
	background-image: url('@/assets/images/user/equities_card_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--root-theme-color);
	padding: 16px 12px;
	margin: 0 15px;

	.header-l {
		display: flex;
		align-items: center;

		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 10px;
		}
	}

	.header-r {
		font-size: 12px;
		color: var(--root-text-color4);
		.name {
			font-size: 16px;
			font-weight: 700;
			color: var(--root-text-color5);
			margin-bottom: 4px;
		}
		span {
			margin: 0 6px;
			font-size: 16px;
			color: var(--root-text-color5);
		}
	}
}

.content {
	background: var(--root-bg-color2);
	border-radius: 12px;
	padding: 12px;

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
			font-size: 14px;
			color: var(--root-text-color2);
			font-weight: normal;
			&::before {
				content: '';
				display: inline-block;
				width: 20px;
				height: 20px;
				background-image: url('@/assets/images/public/equities_icon_rule@2x.png');
				background-size: cover;
				margin-right: 4px;
				transform: translateY(5px);
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
			.list-item-text {
				margin-left: 10px;
				.num {
					font-weight: 700;
				}
				.use {
					margin-top: 6px;
					font-size: 12px;
					color: var(--root-text-color3);
				}
			}
		}

		.list-item-r {
			margin-top: 8px;
			.list-item-tag {
				padding: 4px 10px;
				background: #cde0f5;
				color: var(--root-theme-color);
				border-radius: 22px;
				font-size: 12px;
			}
		}
	}
}
</style>
