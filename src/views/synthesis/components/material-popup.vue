<template>
	<div>
		<van-popup v-model:show="show" position="bottom" round safe-area-inset-bottom>
			<div class="container">
				<template v-if="props.item.type === 1">
					<div class="popup-content-header">
						<div class="popup-title-header">
							<div class="popup-title">选择将哪个藏品用于合成用途</div>
							<div class="popup-close" @click="show = !show"></div>
						</div>
						<div class="popup-notice" v-if="props.materials.is_destroy">
							确认合成后<br />
							该藏品将<span class="popup-notice-rgb">进行销毁/不可再次进行合成</span>操作
						</div>
					</div>
					<div class="popup-content">
						<div class="popup-contnt-title">
							<div>所需材料 {{ props.materials.num }}</div>
							<div class="popup-content-num">已拥有x{{ props.materials.count }}</div>
						</div>
						<div class="popup-content-list">
							<div class="list-item" v-for="(goodsItem, index) in props.materials.goods" :key="index">
								<div class="list-item-img" v-if="goodsItem?.images">
									<van-image lazy-load fit="cover"
										:src="Array.isArray(goodsItem?.images) && `${domin}${goodsItem?.images[0]}`" />
									<div class="check-btn" :class="{ active: goodsItem?.oldFlag }" @click="selectGoods(goodsItem, index)">
									</div>
								</div>
								<div class="list-item-name">{{ goodsItem?.name }}</div>
								<div class="list-item-num">
									{{ `${goodsItem?.serial}#${goodsItem?.user_goods?.num}/${goodsItem?.cast_goods_stock}`}}
								</div>
							</div>
						</div>
						<div class="popup-btn">
							<van-button class="popup-btn-l" @click="show = !show">稍后再说</van-button>
							<van-button class="popup-btn-r" @click="onChooseSubmit">确认选择</van-button>
						</div>
					</div>
				</template>
				<template v-if="props.item.type === 2">
					<div class="popup-content-header">
						<div class="popup-title-header">
							<div class="popup-title">合成后您获得藏品“{{ props.data.goods.name }}”</div>
							<div class="popup-close" @click="show = !show"></div>
						</div>
					</div>
					<div class="popup-content">
						<div class="popup-contnt-title">
							<div>所需材料 {{ props.item.num }}</div>
							<div class="popup-content-num">已拥有x{{ props.item.count }}</div>
						</div>
						<div class="synthetic-list">
							<div class="list-item" v-for="(goodsItem, index) in chooseAllGoods" :key="index">
								<div class="list-item-img" v-if="goodsItem?.images">
									<van-image lazy-load fit="cover"
										:src="Array.isArray(goodsItem?.images) && `${domin}${goodsItem?.images[0]}`" />
								</div>
								<div class="list-item-name">{{ goodsItem.name }}</div>
								<div class="list-item-num">{{
										`${goodsItem?.serial}#${goodsItem?.user_goods?.num}/${goodsItem?.cast_goods_stock}`
								}}</div>
							</div>
						</div>
					</div>
					<div class="popup-sys">
						<van-button class="popup-sys-btn" @click="onChooseSubmit"
							:disabled="chooseAllGoods?.length !== props.item.num"> 立即合成 </van-button>
					</div>
				</template>
			</div>
		</van-popup>
	</div>
</template>

<script setup>
import { DominKey, getToken } from '/@/utils/auth'
import { ref, reactive, computed, watch, nextTick,inject} from 'vue'
import { synthesis } from '/@/api/synthesis'
import { showLoadingToast, allowMultipleToast } from 'vant'

const loading=ref(false)
const show = ref(false)
const isSynthetic = inject('isSynthetic')
const init = inject('init')
const emits = defineEmits(['success'])
const props = defineProps({
	data: {
		type: Object,
		default: () => { }
	},
	item: {
		type: Object,
		default: () => { }
	},
	materials: {
		type: Object,
		default: () => { }
	}
})
// 所需总材料和已拥有总材料
watch(() => props.data,() => {
		props.item.count = props.data.gathers
			.map(v => {
				return v.count
			})
			.reduce((a, b) => a + b, 0)
		props.item.num = props.data.gathers
			.map(v => {
				return v.num
			})
		.reduce((a, b) => a + b, 0)
	},{deep: true}
)

const domin = getToken(DominKey)
const chooseAllGoods = ref([])
const btnLoading = ref(false)
const showPopup = () => {
	show.value = true
}

// 已选择的材料ID
const getIsFlag = () => {
	const arr = props.materials.goods?.filter(v => {
		if (v.oldFlag) {
			return v.user_goods.id
		}
	})
	return arr
}

// 选择合成藏品
const selectGoods = (item, index) => {
	if (props.materials.count > 0) {
		if (item.oldFlag) {
			item.oldFlag = false
		} else {
			// 第一次选择
			if (getIsFlag().length === 0) {
				item.oldFlag = true
			} else {
				// 已选择的材料数量小于所拥有的材料数量且不大于所需的材料数量
				if (getIsFlag().length < props.materials.count && getIsFlag().length < props.materials.num) {
					item.oldFlag = true
				}
			}
		}
	}
}

// 获取所有已选择的材料项
const getChooseAllGoods = () => {
	chooseAllGoods.value = []
	props.data.gathers?.forEach(v => {
		if (v.chooseGoods?.length) {
			chooseAllGoods.value.push(...v.chooseGoods)
		}
	})
}
const onChooseSubmit = () => {
	if (props.item.type === 1) {
		props.materials.chooseGoods = getIsFlag()
		props.materials.goods?.forEach(v => {
			if (v.oldFlag) {
				v.flag = true
			} else if (!v.oldFlag && v.flag) {
				v.flag = false
			}
		})
		getChooseAllGoods()
		show.value = false
		return
	}
	const idList = chooseAllGoods.value.map(v => {
		return v.user_goods.id
	})

	if (loading.value) return
	loading.value = true
	allowMultipleToast()
	const toast = showLoadingToast({
		duration: 0,
		forbidClick: true,
		message: '请求中...'
	})
	synthesis({ user_goods_ids: idList, synthesis_id: props.data.id })
		.then(res => {
			show.value = false
			props.data.gathers.forEach(v => {
				for (let i = 0; i < idList.length; i++) {
					const index = v.goods.findIndex(item => item.user_goods.id === idList[i])
					if (index !== -1) {
						v.goods.splice(index, 1)
					}
				}
				v.count--
			})
			props.data.user_synthesis_num++
			props.data.synthesis_num++
			init(props.data)
			isSynthetic(props.data)
			props.item.type=1
			chooseAllGoods.value = []
			emits('success', res.data)
		})
		.finally(() => {
			toast.close()
			loading.value = false
		})
}

defineExpose({ chooseAllGoods, getChooseAllGoods, show })
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
	max-width: 375px;
	left: 0;
	right: 0;
	margin: 0 auto;
}

.container {
	position: relative;
	height: 100%;
	overflow: hidden;
	padding-bottom: 70px;
}

.popup-content-header {
	padding: 24px 16px 0;
}

.popup-title-header {
	position: relative;

	.popup-title {
		color: var(--root-text-color1);
		font-size: 20px;
		font-weight: 600;
		@include textoverflow();
	}

	.popup-close {
		position: absolute;
		right: 0;
		bottom: 1px;
		width: 20px;
		height: 20px;
		border: 1px solid var(--root-bg-color1);
		background: url('/@/assets/images/synthesis/mine_icon_hecheng_close@2x.png') no-repeat;
		background-size: contain;
	}
}

.popup-notice {
	font-size: 14px;
	line-height: 24px;
	color: var(--root-text-color3);

	.popup-notice-rgb {
		color: var(--root-auxiliary-color);
	}
}

.popup-content {
	background-color: var(--root-bg-color1);
	padding: 18px 16px;

	.popup-contnt-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 18px;
		font-weight: 600;
		padding-bottom: 20px;
		color: var(--root-text-color2);

		.popup-content-num {
			background-color: var(--root-button-color2);
			height: 24px;
			line-height: 24px;
			font-weight: normal;
			font-size: 13px;
			padding: 0 11px;
			color: var(--root-text-color2);
			border-radius: 15px;
		}
	}

	.popup-content-list {
		display: flex;
		overflow-y: hidden;
		overflow-x: auto;
		white-space: nowrap;

		&::-webkit-scrollbar {
			display: none;
		}
	}
}

.list-item {
	margin-right: 19px;
	max-width: 158px;
	margin-bottom: 10px;

	.list-item-img {
		position: relative;
		width: 158px;
		height: 158px;
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 8px;

		.check-btn {
			position: absolute;
			bottom: 5px;
			right: 5px;
			width: 22px;
			height: 22px;
			background: url('/@/assets/images/synthesis/mine_icon_hecheng_weixuan@2x.png') no-repeat;
			background-size: contain;
			border-radius: 50%;
			cursor: pointer;

			&.active {
				background: url('/@/assets/images/synthesis/mine_icon_hecheng_xuanze@2x.png') no-repeat;
				background-size: contain;
			}
		}
	}

	.list-item-name {
		font-size: 14px;
		color: var(--root-text-color3);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10px;
	}

	.list-item-num {
		position: relative;
		color: var(--root-text-color3);
		padding-left: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		&::before {
			content: '';
			position: absolute;
			width: 12px;
			height: 12px;
			background: url('/@/assets/images/public/common_icon_number.png') no-repeat center;
			background-size: 100%;
			left: 0;
			top: 0;
		}
	}
}

.popup-btn {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	height: 70px;
	align-items: center;
	padding: 0 16px;
	justify-content: space-between;
	background-color: var(--root-bg-color1);

	.popup-btn-l,
	.popup-btn-r {
		padding: 10px 45px;
		color: var(--root-text-color2);
		font-size: 16px;
		background-color: var(--root-button-color4);
		border-radius: 24px;
	}

	.popup-btn-r {
		color: var(--root-text-color1);
		background: var(--root-button-color1);
		margin-left: 16px;
	}
}

.popup-content {
	.synthetic-list {
		display: flex;
		max-height: 330px;
		overflow-y: auto;
		flex-wrap: wrap;

		&::-webkit-scrollbar {
			// display: none;
		}

		.list-item {
			margin-left: 5px;
			margin-right: 8px;
		}
	}
}

.popup-sys {
	position: absolute;
	display: flex;
	align-items: center;
	height: 70px;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: var(--root-bg-color1);

	.popup-sys-btn {
		width: 335px;
		margin: 13px 20px;
		font-size: 18px;
		border-radius: 24px;
		color: var(--root-text-color1);
		background: var(--root-button-color1);
	}
}

.conten1 {
	// padding-bottom: 70px;
}
</style>
