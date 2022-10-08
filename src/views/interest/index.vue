<template>
	<van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
		<div class="interest-section">
			<div class="header">
				<div class="header-l">
					<div class="avatar">
						<default-avatar v-if="info?.avatar" :src="info ? `${domin}${info.avatar}` : ''" />
						<default-avatar v-else />
					</div>
					<div class="name">{{ info?.name }}</div>
				</div>
				<div class="header-r">您已累计享受权益<span>{{ data.total }}</span>次</div>
			</div>
			<div class="content">
				<div class="title-wrap">
					<div class="title">我的权益</div>
					<div class="logs" @click="$globleFun.onGoto(`/interest-logs`)">使用记录</div>
				</div>
				<div class="details">
					<div class="list-item"
						@click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'prior', used: data.prior?.used } })">
						<div class="list-item-l">
							<img :src="getImageUrl('interest/equities_icon_yougou@2x.png')" alt="" />
						</div>
						<div class="list-item-r">
							<div class="num">藏品优购</div>
							<div class="use">已经享受 {{ data.prior?.used }} 次</div>
						</div>
					</div>
					<div class="list-item"
					@click="$globleFun.onGoto({path:'/interest-details', query: { type: 'give', used: data.give?.used }})">
						<div class="list-item-l">
							<img :src="getImageUrl('interest/equities_icon_zhuanzeng@2x.png')" alt="" />
						</div>
						<div class="list-item-r">
							<div class="num">藏品提前转赠</div>
							<div class="use">已经享受 {{ data.give?.used }} 次</div>
						</div>
					</div>
					<div class="list-item"
					@click="$globleFun.onGoto({ path: '/interest-details', query: { type: 'rebate', used: data.rebate?.used }} )">
						<div class="list-item-l">
							<img :src="getImageUrl('interest/equities_icon_zhekou@2x.png')" alt="" />
						</div>
						<div class="list-item-r">
							<div class="num">藏品折扣</div>
							<div class="use">已经享受 {{ data.rebate?.used }} 次</div>
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
	padding: 12px var(--root-page-spacing);
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 12px;
	background-color: var(--root-bg-color1);
	padding: 16px 12px;
	margin-bottom: 12px;

	.header-l {
		display: flex;
		align-items: center;

		.avatar {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 8px;
		}

		.name {
			font-weight: 700;
		}
	}

	.header-r {
		font-size: 12px;
		color: var(--root-text-color3);

		span {
			margin: 0 6px;
			color: var(--root-theme-color);
		}
	}
}

.content {
	background: var(--root-bg-color1);
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

			&::before {
				content: '';
				display: inline-block;
				width: 16px;
				height: 16px;
				background-color: var(--root-theme-color);
				opacity: 0.3;
				border-radius: 50%;
				margin-right: -16px;
			}
		}

		.logs {
			color: var(--root-text-color2);
			font-weight: normal;
		}
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 0;

		.list-item-l {
			width: 44px;
			height: 44px;
			flex-shrink: 0;

			img {
				width: 100%;
			}
		}

		.list-item-r {
			flex: 1;
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
}
</style>
