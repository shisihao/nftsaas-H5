<template>
	<div>
		<van-popup v-model:show="show" position="bottom" round safe-area-inset-bottom>
			<div class="container">
				<template v-if="props.item.type === 1">
					<div class="popup-content-header">
						<div class="popup-title">选择合成材料</div>
						<div class="popup-title-desc" v-if="props.materials.is_destroy === 1">请选择用于合成的藏品材料，确认合成后该藏品将<i>销毁</i></div>
						<div class="divider-line"></div>
					</div>
					<div class="popup-content">
						<div class="popup-contnt-title">
							<div>所需材料 <i>x{{ props.materials.num }}</i></div>
							<div>我已拥有 <i>x{{ props.materials.count }}</i></div>
						</div>
						<div class="popup-content-list">
							<div class="list-item" v-for="(goodsItem, index) in props.materials.goods" :key="index" @click="selectGoods(goodsItem, index)">
								<div class="list-item-img" v-if="goodsItem?.images">
									<van-image lazy-load fit="cover"
										:src="Array.isArray(goodsItem?.images) && `${domin}${goodsItem?.images[0]}`" />
								</div>
								<div class="list-item-content">
									<div class="list-item-name">{{ goodsItem?.name }}</div>
									<div class="list-item-num">
										<svg-icon icon-class="serial" class-name="icon-serial" />
										{{ `${goodsItem?.serial}#${goodsItem?.user_goods?.num}/${goodsItem?.cast_goods_stock}` }}
									</div>
									<div class="check-btn" :class="{ active: goodsItem?.oldFlag }">
									</div>
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
							<div class="popup-title">
								<p>“{{ props.data.goods.name }}”</p>
								<p class="tip-text">合成成功将获得此藏品</p>
							</div>
							<div class="popup-close" @click="show = !show"></div>
						</div>
						<div class="divider-line"></div>
					</div>
					<div class="popup-content">
						<div class="popup-contnt-title">
							<!-- <div>所需材料 x{{ props.item.num }}</div>
							<div class="popup-content-num">已拥有x{{ props.item.count }}</div> -->
						</div>
						<p class="popup-contnt-tip">合成材料</p>
						<div class="synthetic-list">
							<div class="list-item" v-for="(goodsItem, index) in chooseAllGoods" :key="index">
								<div class="list-item-img" v-if="goodsItem?.images">
									<van-image lazy-load fit="cover"
										:src="Array.isArray(goodsItem?.images) && `${domin}${goodsItem?.images[0]}`" />
								</div>
								<div class="list-item-content">
									<div class="list-item-name">{{ goodsItem.name }}</div>
									<div class="list-item-num">
										<svg-icon icon-class="serial" class-name="icon-serial" />
										{{`${goodsItem?.serial}#${goodsItem?.user_goods?.num}/${goodsItem?.cast_goods_stock}`}}
									</div>
								</div>
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
import { DominKey, getToken } from '@/utils/auth'
import { ref, watch, inject } from 'vue'
import { synthesis } from '@/api/synthesis'
import { showLoadingToast, allowMultipleToast } from 'vant'

const loading = ref(false)
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
watch(
	() => props.data,
	() => {
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
	},
	{ deep: true }
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
			if(props.materials.num == 1) {
				// 单选
				props.materials.goods = props.materials.goods.map((v, i) =>{
					v.oldFlag = i === index
					return v
				})
			}else {
				// 多选
				if (getIsFlag().length <= props.materials.count) {
					if (getIsFlag().length >= props.materials.num) {
						// 取消已选的第一个
						for(var i = 0; i < props.materials.goods.length-1; i++) {
							if ( props.materials.goods[i].oldFlag ) {
								props.materials.goods[i].oldFlag = false
								break
							}
						}	
					}
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
			props.item.type = 1
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
	text-align: center;

	.divider-line {
		width: 100%;
		height: 1px;
		background-color: var(--root-dividing-color1);
		margin-top: 20px;
		opacity: 0.6;
	}
}

.popup-title {
	font-weight: 700;
	font-size: 18px;
	.tip-text {
		font-size: 12px;
		color: var(--root-text-color3);
		margin-top: 10px;
		font-weight: normal;
	}
}

.popup-title-desc {
	color: var(--root-text-color3);
	font-size: 12px;
	margin-top: 12px;
	@include textoverflow();

	i {
		color: var(--root-auxiliary-color1);
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
	padding: 18px 16px;

	.popup-contnt-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: var(--root-text-color2);

		i {
			font-size: 21px;
			font-weight: 600;
		}
	}
	.popup-contnt-tip {
		font-size: 16px;
		font-weight: bold;
		color: var(--root-text-color1);
	}
	.popup-content-list {
		margin-top: 15px;
		max-height: 50vh;
		overflow-y: auto;
	}
}

.list-item {
	display: flex;
	margin-top: 30px;
	.list-item-img {
		position: relative;
		width: 84px;
		height: 84px;
		flex-shrink: 0;
		border-radius: 8px;
		box-shadow: 0 0 0 2px var(--root-theme-color);
		overflow: hidden;
	}

	.list-item-content {
		flex: 1;
		background: linear-gradient(270deg, var(--root-bg-color2) 0%, var(--root-bg-color1) 100%);
		padding-left: 12px;
		position: relative;
		margin-left: 2px;
		.list-item-name {
			font-size: 18px;
			font-weight: bold;
			color: var(--root-text-color1);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-top: 15px;
			margin-bottom: 10px;
		}

		.list-item-num {
			position: relative;
			color: var(--root-text-color3);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			.icon-serial {
        font-size: 12px;
        color: var(--root-theme-color);
      }
		}

		.check-btn {
			position: absolute;
			bottom: 18px;
			right: 5px;
			width: 22px;
			height: 22px;
			background: url('@/assets/images/synthesis/mine_icon_hecheng_weixuan@2x.png') no-repeat;
			background-size: contain;
			border-radius: 50%;
			cursor: pointer;

			&.active {
				background: url('@/assets/images/synthesis/mine_icon_hecheng_xuanze@2x.png') no-repeat;
				background-size: contain;
			}
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

	.popup-btn-l,
	.popup-btn-r {
		padding: 10px 45px;
		color: var(--root-text-color5);
		font-size: 16px;
		background-color: var(--root-button-color1);
		border-radius: 24px;
	}

	.popup-btn-r {
		color: var(--root-text-color5);
		background: var(--root-theme-color);
		margin-left: 16px;
	}
}

.popup-content {
	.synthetic-list {
		max-height: 330px;
		overflow-y: auto;
		flex-wrap: wrap;

		.list-item {
			&:not(:last-child) {
				margin-bottom: 30px;
			}
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

	.popup-sys-btn {
		width: 335px;
		margin: 13px 20px;
		font-size: 18px;
		border-radius: 24px;
		color: var(--root-text-color5);
		background: var(--root-theme-color);
	}
}

.conten1 {
	// padding-bottom: 70px;
}
</style>
