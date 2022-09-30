<template>
	<div class="section-container" :class="{ isSynthetic: !isSynthetic }">
		<three-model :item="threeItem" />
		<div class="synthetic-container">
			<div class="header">
				<div class="synthetic-title">{{ data.title }}</div>
				<div class="synthetic-tag">
					<div class="tag">
						<div class="tag-name">限量</div>
						<div class="tag-num">{{ data.limit_num }}份</div>
					</div>
					<div class="tag remain">
						<div class="tag-name">剩余</div>
						<div class="tag-num">{{residue}}份</div>
					</div>
				</div>
				<div class="user-limit-num">每人限量{{ data.user_limit_num }}份</div>
				<div class="date-time">{{ data.start_time }}至{{ data.end_time }}</div>
			</div>
			<div class="material">
				<div class="material-title">合成所需材料</div>
				<div class="material-list">
					<div class="material-item" @click="showPopup(item, index,1)" v-for="(item, index) in showList" :key="index">
						<div class="material-item-img" :class="{ gray: item.count === 0 }" v-if="item?.goods">
							<van-image lazy-load fit="cover" :src="item?.goods&& `${domin}${item.goods.images[0]}`" />
							<div class="material-item-num" v-show="item.num > 0">x{{ item.num }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="details">
				<div class="detail-title">合成攻略</div>
				<div class="detail-content" v-html="data.intro"></div>
			</div>
			<div class="btn-bottom">
				<div class="notice" v-if="!isSynthetic && activeFlag === 1">合成材料不足，无法进行合成操作</div>
				<van-button block class="btn" @click="showPopup(data,'', 2)" v-if="activeFlag === 1&&residue!==0" :disabled="activeStatus">立即合成</van-button>
				<van-button block class="btn btn-no-active" v-if="activeFlag === 2||residue===0" :disabled="activeFlag !== 1||residue===0">活动已结束</van-button>
				<van-button block class="btn btn-no-active" v-if="activeFlag === 0" :disabled="activeFlag !== 1">活动未开始</van-button>
			</div>
		</div>
		<material-popup ref="materialRef" :item="state" :materials="material" :data="data" @success="success" />
		<success-popup ref="successRef" />
	</div>
</template>

<script setup>
import { ref, reactive, computed,provide } from 'vue'
import ThreeModel from '/@/components/ThreeModel/index.vue'
import { useRoute } from 'vue-router'
import { synthesisDetail } from '/@/api/synthesis'
import { DominKey, getToken } from '/@/utils/auth'
import materialPopup from './components/material-popup.vue'
import successPopup from './components/success-popup.vue'
import { parseDate } from '/@/utils/index.js'

const domin = getToken(DominKey)
const route = useRoute()
const data = ref({})
const threeItem = ref([])
const material = ref({})
const isSynthetic = ref(false) // 是否可以合成
const isMaterial = ref(false) // 是否已选择材料
const type = ref(1) // 合成类型
const showList = ref([])//显示的材料数据
const successRef = ref(null)
const materialRef = ref(null)
const state = reactive({
	id: 0,
	type: 1,
	count: 0,
	num: 0
})

// 初始化默认数据
const init = data => {
	data.gathers.forEach(v => {
		if (v.num > 0 && v.count >= v.num) {
			v.chooseGoods = []
			for (let i = 0; i < v.num; i++) {
				v.goods[i].flag = true
				v.goods[i].oldFlag = true
				v.chooseGoods.push(v.goods[i])
			}
			isMaterial.value = data.gathers.some(v => v.chooseGoods?.length > 0)
		}
	})
}

synthesisDetail(route.query.id).then(response => {
	threeItem.value = response.data.goods
	// 根据所需材料默认初始数据
	init(response.data)
	showList.value=response.data.gathers.map(v=>{
		return {
			goods: v.goods[0],
			num: v.num,
			count: v.count
		}
	})
	data.value = response.data
	state.id = response.data.id
	getSynStatus(response.data)
})

// 活动剩余
const residue= computed(() => {
	return data.value.limit_num - data.value.synthesis_num
})

// 活动状态
const activeStatus= computed(() => {
	return !isSynthetic.value || !isMaterial.value || activeFlag.value !== 1|| data.value.user_synthesis_num===data.value.user_limit_num
})

// 活动时间判断
const activeFlag = computed(() => {
	const start = new Date(data.value.start_time && parseDate(data.value.start_time)).getTime()
	const end = new Date(data.value.start_time && parseDate(data.value.end_time)).getTime()
	const now = new Date().getTime()
	if (start < now && now < end) {
		return 1
	} else if (now < start) {
		return 0
	} else {
		return 2
	}
})

const showPopup = (item, index,type) => {
	if (item.count === 0) return
	if (type === 1) {
		// 材料
		material.value = data.value.gathers[index]
	} else {
		materialRef?.value.getChooseAllGoods()
	}
	state.type = type
	materialRef.value.show = true
}

// 合成成功
const success = val => {
	successRef?.value.init(val)
}
// 拥有材料状态
const getSynStatus = (data) => {
	isSynthetic.value = data.gathers.every(item => item.count >= item.num)
}
provide('isSynthetic', getSynStatus)
provide('init',init)
</script>

<style lang="scss" scoped>
.section-container {
	padding-bottom:calc(50px + env(safe-area-inset-bottom)) ;
}
.synthetic-container {
	position: relative;
	margin-top: -30px;
	padding: 0 16px 16px 16px;
}
.isSynthetic {
	padding-bottom: calc(80px + env(safe-area-inset-bottom));
}

.material,
.details,
.header {
	padding: 21px 11px;
	background-color: var(--root-bg-color1);
	border-radius: 8px;
	margin-bottom: 12px;
}

.synthetic-tag {
	display: flex;
	margin-bottom: 12px;

	.tag {
		margin-right: 11px;

		.tag-name {
			display: inline-block;
			font-size: 11px;
			padding: 4px 7px 3px;
			border-radius: 10px 0px 0px 10px;
			background-color: var(--root-theme-color);
			color: var(--root-text-color1);
		}

		.tag-num {
			display: inline-block;
			border: 1px solid var(--root-theme-color);
			margin-left: -1px;
			font-size: 11px;
			padding: 3px 5px 2px;
			color: var(--root-text-color1);
			border-radius: 0px 10px 10px 0px;
		}
	}

	.remain {
		.tag-name {
			background-color: var(--root-button-color2);
		}

		.tag-num {
			border: 1px solid var(--root-button-color2);
		}
	}
}

.user-limit-num {
	font-size: 13px;
	color: var(--root-auxiliary-color);
	margin-bottom: 10px;
}

.date-time {
	font-size: 13px;
	color: var(--root-text-color);
}

.synthetic-title,
.details-title,
.material-title {
	font-size: 18px;
	color: var(--root-text-color1);
	margin-bottom: 12px;
}

.material-list {
	display: flex;
	overflow-y: hidden;
	overflow-x: auto;
	white-space: nowrap;

	&::-webkit-scrollbar {
		display: none;
	}

	.material-item-img {
		position: relative;
		width: 120px;
		height: 120px;
		border-radius: 6px;
		overflow: hidden;
		margin-right: 8px;

		.material-item-num {
			position: absolute;
			top: 0;
			left: 0;
			color: var(--root-text-color1);
			background-color: var(--root-bg-color2);
			padding: 2px 11px;
			font-size: 14px;
		}
	}

	.gray {
		-webkit-filter: grayscale(85%);
		filter: grayscale(85%);
	}
}

.detail-content {
	margin-top: 16px;

	:deep(img),:deep(video) {
		max-width: 100%;
	}
}

.notice {
	background-color: var(--root-bg-color4);
	opacity: 0.7;
	color: var(--root-auxiliary-color);
	font-size: 13px;
	height: 32px;
	line-height: 32px;
	margin-top: 8px;
	text-align: center;
}

.btn-bottom {
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: var(--root-bg-color2);
	margin: 0 auto;
	max-width: 375px;
	padding-bottom: env(safe-area-inset-bottom);
}

.btn {
	height: 44px;
	width: 100%;
	margin: 8px 0;
	background: var(--root-button-color1);
	border-radius: 24px;
	color: var(--root-text-color1);
	font-size: 18px;
}

.btn-no-active {
	background: var(--root-text-color4);
	color: var(--root-text-color2);
}

.no-active {
	background: var(--root-dividing-color1);
	color: var(--root-text-color2);
}
</style>
