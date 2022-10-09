<template>
	<div class="header">
		<div class="header-l">
			<img v-if="props.item?.type === 'prior'" :src="getImageUrl('interest/equities_icon_yougou@2x.png')" alt="" />
			<img v-if="props.item?.type === 'give'" :src="getImageUrl('interest/equities_icon_zhuanzeng@2x.png')" alt="" />
			<img v-if="props.item?.type === 'free_integral'" :src="getImageUrl('interest/quanyi_icon_mzz@2x.png')" alt="" />
			<img v-if="props.item?.type === 'free_cny'" :src="getImageUrl('interest/quanyi_icon_lyg@2x.png')" alt="" />
			<img v-if="props.item?.type === 'rebate'" :src="getImageUrl('interest/equities_icon_zhekou@2x.png')" alt="" />
		</div>
		<div class="header-r">
			<div class="header-r-hd">
				<div class="name">{{ paraphrase({ value: props.item?.type, options: interestOptions }) }}</div>
				<div class="tag">{{ props.item?.usable }} 次</div>
			</div>
			<div class="use">已享受 {{ props.item?.used }} 次</div>
		</div>
		<div class="header-r">
			<span class="header-r-tag">?次</span>
		</div>
	</div>
</template>


<script setup>
import { getImageUrl } from '@/utils/index'
import { paraphrase } from '@/filters/index'

const interestOptions = [
	{ label: '藏品提前抢购', value: 'prior' },
	{ label: '藏品提前赠送', value: 'give' },
	{ label: '免积分抢购藏品', value: 'free_integral' },
	{ label: '藏品0元购 1次', value: 'free_cny' },
	{ label: '藏品折扣', value: 'rebate' }
]

const props = defineProps({
	item: {
		type: Object,
		default: () => {}
	}
})
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	background-color: var(--root-bg-color2);
	padding: var(--root-page-spacing);
	margin-bottom: 24px;

	.header-l {

		width: 44px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		margin-right: 10px;

		flex-shrink: 0;
		background: url('@/assets/images/interest/quayi_img_bg@2x.png') no-repeat;
		background-size: 100%;
		img {
			display: inline-block;
			vertical-align: middle;
			width: 21px;
		}
	}
	.header-r {
		flex: 1;

		.header-r-hd {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.name {
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
				display: inline-block;
				margin-top: 9px;
				font-size: 12px;
				color: var(--root-text-color3);
			}

	}
	.header-r {
		font-weight: 700;
    .header-r-tag {
			padding: 4px 10px;
			background: #cde0f5;
			color: var(--root-theme-color);
			border-radius: 22px;
			font-size: 12px;
		}
	}
}
</style>
