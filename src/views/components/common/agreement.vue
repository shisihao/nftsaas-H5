<template>
<div>
  <van-nav-bar fixed placeholder :border="false">
    <template #left>
      <span @click="router.go(-1)">
        <van-icon name="arrow-left"/>
      </span>
    </template>
    <template #title>
      {{ query.title || '协议' }}
    </template>
  </van-nav-bar>
  <div class="main-contain">
    <div class="content-text" v-html="config && config[query.type]"></div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store/index'
const router = useRouter()
const { query } = router.currentRoute.value

let config = computed(() => store.state.user.config)

</script>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: var(--root-bg-color1);
  z-index: 999;
  max-width: 375px;
  left: 50%;
  transform: translateX(-50%);
  .van-icon-arrow-left {
    font-size: 24px;
    color: var(--root-text-color1);
  }
  .van-nav-bar__title {
    color: var(--root-text-color1);
    font-weight: normal;
    font-size: 18px;
  }
}
.main-contain {
  .content-text{
    padding: 15px;
    color: var(--root-text-color2);
    line-height: 1.5;
    word-break: break-all;
    :deep(img), :deep(video) {
      max-width: 100%;
    }
  }
}
</style>
