<template>
	<div class="logs-section">
		<van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功">
			<van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
				<van-tabs v-model:active="active" shrink @change="onTabChange">
					<van-tab v-for="(item, index) in activeOptions" :key="index" :title="item.label" :name="item.value"></van-tab>
				</van-tabs>
        <div class="content">
          <div class="list-item" v-for="(item, index) in state.list" :key="index">
            <div class="title">{{item.title}}</div>
            <div class="desc">藏品信息：{{item.goods?.name}}</div>
            <div class="time">{{item.created_at}}</div>
          </div>
        </div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { pages as commonPages } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import { interestLogs } from '@/api/interest'

const state = reactive({
	loading: false,
	list: [],
	refreshing: false,
	finished: false,
	total: 0
})
const active = ref('')
const pages = { ...commonPages }
const activeOptions = [
	{ label: '藏品优购', value: 'prior' },
	{ label: '提前转赠', value: 'give' },
	{ label: '折扣', value: 'rebate' }
]

// 获取消息列表
const onLoad = () => {
	interestLogs({ label: active.value, ...pages }).then(res => {
		if (state.refreshing) {
			state.refreshing = false
		}
		state.list.push(...res.data.data)
		state.total = res.data.total
		state.loading = false
		pages.page++
		if (state.list.length >= state.total) {
			state.finished = true
		}
	})
}

const onRefresh = () => {
	state.refreshing = true
	pages.page = 1
	state.list = []
	state.finished = false
	// 将 loading 设置为 true，表示处于加载状态
	state.loading = true
	onLoad()
}

const onTabChange = val => {
	onRefresh()
}
</script>

<style lang="scss" scoped>
.logs-section{
  padding: 0 var(--root-page-spacing);
}
:deep(.van-tabs__line) {
	background: var(--root-theme-color);
	width: 24px;
	bottom: 22px;
}
:deep(.van-tabs__nav) {
	background: transparent;
}
:deep(.van-tab) {
	color: var(--root-text-color3);
}
:deep(.van-tab--active) {
	color: var(--root-text-color1);
}

.list-item{
background: var(--root-bg-color1);
padding: 15px 12px;
border-radius: 12px;
margin-bottom: 12px;
.title{
  font-size: 16px;
  margin-bottom: 8px;
    @include textoverflow()
}
.desc,.time{
  font-size: 12px;
  color: var(--root-text-color3);
  margin-bottom: 8px;
  @include textoverflow()
}
.time{
  margin-bottom: 0;
}
}
</style>
