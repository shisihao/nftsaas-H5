<template>
	<div class="synthesis-container">
		<div class="title-wrap">
			<div class="title-l">合成藏品</div>
			<div class="title-r" @click="$globleFun.onGoto('/synthesis-record')">合成记录</div>
		</div>
		<van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功">
			<van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
				<div class="list-wrap" v-if="state.list.length > 0">
					<div class="list-item" v-for="(item, index) in state.list" :key="index" @click="$globleFun.onGoto(`/synthesis?id=${item.id}`)">
						<div class="list-item-l">
							<van-image lazy-load fit="cover" :src="item.cover && `${domin}${item.cover.filename}`" />
						</div>
						<div class="list-item-r">
							<div class="list-item-title">{{ item.title }}</div>
							<div class="list-item-tag">
								<div class="tag">
									<div class="tag-name">限量</div>
									<div class="tag-num">{{ item.limit_num }}份</div>
								</div>
								<div class="tag remain">
									<div class="tag-name">剩余</div>
									<div class="tag-num">{{ item.limit_num - item.synthesis_num }}份</div>
								</div>
							</div>
							<div class="list-item-time">{{ item.start_time.substring(0, 10) }}至{{ item.end_time.substring(0, 10) }}</div>
						</div>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script setup>
import { DominKey, getToken } from '@/utils/auth'
import { reactive } from 'vue'
import { dataList } from '@/api/synthesis'
import { pages as commonPages } from '@/utils/explain'

const domin = getToken(DominKey)
const state = reactive({
	loading: false,
	list: [],
	refreshing: false,
	finished: false
})
const pages = { ...commonPages }

// 获取列表数据
const onLoad = () => {
	if (!state.loading) return false
	dataList(pages).then(response => {
		if (state.refreshing) {
			state.list = []
			state.refreshing = false
		}

		let { total, data } = response.data

		state.list.push(...data)
		pages.page++
		state.loading = false

		if (state.list.length >= total) {
			state.finished = true
		}
	})
}

const onRefresh = () => {
	// 清空列表数据
	state.finished = false
	pages.page = 1
	state.list = []
	// 重新加载数据
	// 将 loading 设置为 true，表示处于加载状态
	state.loading = true
	onLoad()
}
</script>

<style lang="scss" scoped>
.synthesis-container {
	padding: 15px 0;
	background-color: var(--root-bg-color1);
	.title-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title-l {
			font-size: 18px;
			padding-left: 15px;
			font-weight: 700;
			color: var(--root-text-color1);
		}

		.title-r {
			padding: 6px 12px 6px 32px;
			font-size: 16px;
			background: url('@/assets/images/synthesis/mine_icon_hecheng_jilu@2x.png') no-repeat;
			background-color: var(--root-bg-color1);
			background-size: 19px;
			background-position: 10px 5px;
			border-radius: 16px 0px 0px 16px;
			color: var(--root-text-color1);
		}
	}

	.list-wrap {
		padding: var(--root-page-spacing);
		margin-top: 12px;

		.list-item {
			display: flex;
			justify-content: space-between;
			padding: 14px 12px;
			background-color: var(--root-bg-color2);
			margin-bottom: 12px;
			border-radius: 8px;

			.list-item-l {
				flex-shrink: 0;
				margin-right: 12px;
				width: 120px;
				height: 120px;

				.van-image {
					border-radius: 8px;
					overflow: hidden;
				}
			}

			.list-item-r {
				.list-item-title {
					font-size: 16px;
					color: var(--root-text-color1);
					line-height: 24px;
					margin-bottom: 10px;
					@include textoverflow(2);
				}

				.list-item-tag {
					display: flex;
					width: 200px;
					margin-bottom: 25px;

					.tag {
						&:not(:last-child) {
							margin-right: 6px;
						}

						.tag-name {
							display: inline-block;
							font-size: 11px;
							padding: 4px 7px 3px;
							border-radius: 3px 0px 0px 3px;
							background-color: var(--root-theme-color);
							color: var(--root-text-color5);
						}

						.tag-num {
							display: inline-block;
							box-shadow: 0 0 0 1px var(--root-theme-color);
							font-size: 11px;
							padding: 3px 5px 2px;
							color: var(--root-theme-color);
							border-radius: 0px 3px 3px 0px;
						}
					}

					.remain {
						.tag-name {
							background-color: var(--root-button-color1);
						}

						.tag-num {
							color: var(--root-text-color3);
							box-shadow: 0 0 0 1px var(--root-button-color1);
						}
					}
				}

				.list-item-time {
					font-size: 12px;
					color: var(--root-text-color3);
				}
			}
		}
	}
}
</style>
