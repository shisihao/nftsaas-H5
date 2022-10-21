<template>
  <div v-if="special.includes(route.name)">
    <van-tabbar v-model="state.active" class="tabbar-box" fixed placeholder :border="false">
      <van-tabbar-item to="/" name="dashboard">
        <span class="tabbar-text">首页</span>
        <template #icon="props">
          <svg-icon icon-class="tab-home" class-name="icon-bar"/>
        </template>
      </van-tabbar-item>
    
      <van-tabbar-item to="/user" name="user">
        <span class="tabbar-text">我的</span>
        <template #icon="props">
          <svg-icon icon-class="tab-mine" class-name="icon-bar"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getImageUrl } from '@/utils/index'
import { special } from '@/router/index'
import store from '@/store/index'

const router = useRouter()
const route = useRoute()

const state = reactive({
  active: computed({
    get() {
      return store.state.user.activeTabbar
    },
    set(value) {
      return value
    }
  })
})

onMounted(() => {
  state.active = route.name
} )
  
</script>

<style lang="scss" scoped>
  .tabbar-box {
    :deep(.van-tabbar) {
      background-color: var(--root-bg-color2);
      max-width: 375px;
      right: 0;
      margin: 0 auto;
      height: 50px;
      z-index: 999;
    }
    .van-tabbar-item {
      color: #ccc;
      .icon-bar {
        color: #ccc;
      }
      .tabbar-text {
        font-size: 12px;
        color: #ccc;
      }
    }
    .van-tabbar-item--active {
      color: var(--root-theme-color);
      .icon-bar {
        color: var(--root-theme-color);
      }
      .tabbar-text {
        color: var(--root-theme-color);
      }
    }
  }
</style>
