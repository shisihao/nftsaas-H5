<template>
	<div class="header">
		<div class="header-l">
			<svg-icon :icon-class="paraphrase({ value: props.item?.type, options: equityOptions, l: 'icon' })" class-name="icon-interest" />
		</div>
		<div class="header-r">
			<div class="header-r-hd">
				<div class="name">{{ paraphrase({ value: props.item?.type, options: equityOptions }) }}</div>
				<div class="tag">{{ props.item?.usable }} 次</div>
			</div>
			<div class="use">已享受 {{ props.item?.used }} 次</div>
		</div>
	</div>
</template>


<script setup>
import { computed } from 'vue'
import store from '@/store/index'
import { getImageUrl } from '@/utils/index'
import { paraphrase } from '@/filters/index'

const equityOptions = computed(() => store.state.user.equityOptions)

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
		border-radius: 50%;
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--root-bg-color1);
		flex-shrink: 0;
		.icon-interest {
			font-size: 20px;
			color: var(--root-theme-color);
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
}
</style>
