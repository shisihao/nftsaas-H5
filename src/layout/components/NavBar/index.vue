<template>
  <div v-if="!special.includes(route.name)" class="nav-bar">
    <van-nav-bar fixed placeholder :border="false">
      <template #left>
        <span @click="onHandleRouter">
          <van-icon name="arrow-left"/>
        </span>
      </template>
      <template #title>
        {{ route.meta.title }}
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { special } from '/@/router/index'

const router = useRouter()
const route = useRoute()
const onHandleRouter = () => {
  if (route.name === 'authentication-result') {
    router.replace({ path: 'user' })
  } else {
    router.go(-1)
  }
}


</script>

<style lang="scss" scoped>
.nav-bar {
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
}
</style>
