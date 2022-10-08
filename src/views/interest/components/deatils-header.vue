<template>
	<div class="header">
		<div class="header-l">
			<img v-if="props.item?.type === 'prior'" :src="getImageUrl('interest/equities_icon_yougou@2x.png')" alt="" />
			<img v-if="props.item?.type === 'give'" :src="getImageUrl('interest/equities_icon_zhuanzeng@2x.png')" alt="" />
			<img v-if="props.item?.type === 'rebate'" :src="getImageUrl('interest/equities_icon_zhekou@2x.png')" alt="" />
		</div>
		<div class="header-r">
			<div class="header-r-hd">
				<div>
					<div>{{ paraphrase({ value: props.item?.type, options: interestOptions }) }}</div>
					<div class="tag">已使用 {{ props.item?.used }} 次</div>
				</div>
			
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getImageUrl } from '@/utils/index'
import { paraphrase } from '@/filters/index'

const props = defineProps({
	item: {
		type: Object,
		default: () => {}
	}
})

const interestOptions = [
	{ label: '藏品优购权益', value: 'prior' },
	{ label: '藏品转赠权益', value: 'give' },
	{ label: '藏品折扣权益', value: 'rebate' }
]
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	background-color: var(--root-bg-color1);
	padding: var(--root-page-spacing);
	margin-bottom: 24px;

	.header-l {
		width: 44px;
		height: 44px;
		margin-right: 10px;
		flex-shrink: 0;
		img {
			width: 100%;
		}
	}
	.header-r {
		flex: 1;
		font-weight: 700;
    .header-r-hd{
      display: flex;
      align-items: center;
      justify-content: space-between;
		.tag {
			display: inline-block;
			margin-top: 9px;
			padding: 3px 8px;
			color: var(--root-auxiliary-color);
			border-radius: 11px;
			background-color: var(--root-bg-color3);
			font-size: 12px;
		}

    }

	}
}
</style>
