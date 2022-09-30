<template>
	<div>
		<van-popup v-model:show="show" round position="bottom" :style="{ height: '30%' }" safe-area-inset-bottom>
			<div class="container">
				<div class="title">使用规则</div>
				<p class="content">{{ props.intro }}</p>
			</div>
		</van-popup>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const show = ref(false)

const props = defineProps({
	intro: {
		type: String,
		default: ''
	}
})

defineExpose({ show })
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
	max-width: 375px;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow-y: hidden;
  padding-bottom: 20px;
}
.container{
  padding: 20px;
  overflow: hidden;
  .title{
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    height: 40px;
    border-bottom: 1px solid var(--root-dividing-color1);
    margin-bottom: 10px;
  }
  .content{
    max-height: 150px;
    overflow: hidden;
    overflow-y: scroll;
  }
}
</style>
