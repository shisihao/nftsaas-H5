<template>
	<van-pull-refresh v-model="state.loading" @refresh="onRefresh" success-text="刷新成功">
		<div class="interest-section">
			<div class="header">
				<div class="header-l">
					<div class="avatar">
						<default-avatar :src="info?.avatar ? `${domin}${info.avatar}` : ''" />
					</div>
				</div>
				<div class="header-r">
					<div class="name">{{ info?.name }}</div>
					<div class="desc">
						您已累计享受权益<span>{{ state.data.total }}</span>次
					</div>
				</div>
			</div>
			<div class="content">
				<div class="title-wrap">
					<div class="title">我的权益</div>
					<div class="logs" @click="$globleFun.onGoto(`/interest-logs`)">使用记录</div>
				</div>
				<div class="details">
					<div class="list-item" v-for="(item, index) in equityOptions" :key="index" @click="$globleFun.onGoto({ path: '/interest-details', query: { type: item.value, used: state.data[item.value]?.used ,usable:state.data[item.value]?.usable } })">
						<div class="list-item-l">
							<div class="list-img-box">
								<svg-icon :icon-class="item.icon" class-name="icon-interest" />
							</div>
						</div>
						<div class="list-item-r">
							<div class="list-item-r-hd">
								<div class="num">{{ item.label }}</div>
								<div class="tag">{{ state.data[item.value]?.usable }} 次</div>
							</div>
							<div class="use">已享受 {{ state.data[item.value]?.used }} 次</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</van-pull-refresh>
</template>

<script setup>
import { computed, reactive } from 'vue'
import store from '@/store/index'
import { DominKey, getToken } from '@/utils/auth'
import { interest } from '@/api/interest'
import { paraphrase } from '@/filters/index'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'

const domin = getToken(DominKey)
const info = computed(() => store.state.user.info)
const equityOptions = computed(() => store.state.user.equityOptions)

const state = reactive({
	loading: false,

	data: {}
})

// 获取列表数据
const onRefresh = () => {
	interest()
		.then(response => {
			state.data = response.data
		})
		.finally(() => {
			state.loading = false
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
	border-radius: 12px 12px 0 0;
	margin: 0 var(--root-page-spacing);
	background: url('@/assets/images/interest/equities_card_bg@2x.png') no-repeat;
	background-color: var(--root-theme-color);
	background-position: center;
	background-size: 100%;
	padding: 12px 18px;

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
	// margin-top: -4px;
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
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: var(--root-bg-color1);
				.icon-interest {
					font-size: 20px;
					color: var(--root-theme-color);
				}
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
