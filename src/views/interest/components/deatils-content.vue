<template>
	<div class="content">
		<navigation-title title="权益藏品" fontSize="16" position="center"/>
		<div class="list-wrap">
			<div class="list-item" v-for="(item, index) in props.data?.list" :key="index">
				<div class="list-item-l">
					<van-image lazy-load fit="cover" :src="Array.isArray(item.goods?.images) && `${domin}${item.goods?.images[0]}`" />
				</div>
				<div class="list-item-r">
					<div class="item-title">{{ item.goods?.name }}</div>
					<div class="item-num">{{ `${item.goods?.serial}#${item.goods?.num}/${item.goods?.cast_goods_stock}` }}</div>
					<div class="item-bottom">
						<div class="tag">
							<span v-if="labelType === 'prior'">提前购{{ item.interests[labelType].prior_time }}分钟</span>
							<span v-if="labelType === 'rebate'">{{ item.interests[labelType].discount / 10 }}折</span>
							<span v-if="labelType === 'give'">提前时间{{ item.interests[labelType].give_days }}天</span>
							<span>
								<i v-if="item.interests[labelType].type === 'once'">{{ item.interests[labelType].num }}</i>
								{{ labelType === 'prior'&&item.interests[labelType].type==='long'?`${item.interests[labelType].num}次/月`:paraphrase({value: item.interests[labelType].type,options: interestOptions})}}
							</span>
						</div>
						<div class="rules" @click="onShowRules(item)">
							<img :src="getImageUrl('public/equities_icon_rule@2x.png')" alt="" />
							<span>使用规则</span>
						</div>
					</div>
				</div>
			</div>
			<no-more />
		</div>
		<rules-popup ref="rulesRef" :intro="intro"></rules-popup>
	</div>
</template>

<script setup>
import { DominKey, getToken } from '@/utils/auth'
import { paraphrase } from '@/filters/index'
import { getImageUrl } from '@/utils/index'
import rulesPopup from './rules-popup.vue'
import {ref,toRef} from 'vue'
import NoMore from '@/components/NoMore/index.vue'
import NavigationTitle from '@/components/NavigationTitle/index.vue'

const domin = getToken(DominKey)
const props = defineProps({
	data: {
		type: Object,
		default: () => {}
	}
})
const labelType=toRef(props.data?.item,'type')
const rulesRef=ref(null)
const interestOptions = [
	{ label: '不限次', value: 'long' },
	{ label: '次', value: 'once' },
	{ label: '指定藏品', value: 'appoint' }
]
const intro = ref('')
const onShowRules = (item) => {
	intro.value = item.intro
	rulesRef.value.show=true
}
</script>

<style lang="scss" scoped>
.content {
	padding: 0 var(--root-page-spacing);
}

.title {
	padding: 6px 0;
	font-size: 18px;
	font-weight: 700;
	text-align: center;

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

.list-wrap {
	margin-top: 12px;

	.list-item {
		display: flex;
		padding: 15px 12px;
		background-color: var(--root-bg-color1);
		border-radius: 12px;
		margin-bottom: 12px;

		.list-item-l {
			width: 90px;
			height: 90px;
			border-radius: 8px;
			overflow: hidden;
			margin-right: 10px;
			flex-shrink: 0;
		}

		.list-item-r {
			flex: 1;

			.item-title {
				font-size: 16px;
				font-weight: 700;
				padding-top: 4px;
				margin-bottom: 13px;
				@include textoverflow();
			}

			.item-num {
				position: relative;
				color: var(--root-text-color3);
				padding-left: 16px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 18px;

				&::before {
					content: '';
					position: absolute;
					width: 12px;
					height: 12px;
					background: url('@/assets/images/public/common_icon_number.png') no-repeat center;
					background-size: 100%;
					left: 0;
					top: 1px;
				}
			}

			.item-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.tag {
					display: inline-block;
					padding: 3px 0 2px;
					color: var(--root-auxiliary-color);
					border-radius: 11px;
					border: 1px solid var(--root-auxiliary-color);
					font-size: 12px;
					span {
						position: relative;
						padding: 0 8px;
						display: inline-block;
						&:not(:last-child):after {
							content: '|';
							position: absolute;
							right: -1px;
							top: 0;
						}
					}
				}

				.rules {
					color: var(--root-text-color3);
					font-size: 12px;
					flex-shrink: 0;
					img {
						width: 12px;
						height: 14px;
						margin-right: 6px;
						vertical-align: bottom;
					}
				}
			}
		}
	}
}
</style>
