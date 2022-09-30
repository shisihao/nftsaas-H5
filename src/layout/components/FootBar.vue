<template>
  <div v-if="special.includes(route.name)">
    <van-tabbar v-model="active" class="tabbar-box" fixed placeholder :border="false">
      <van-tabbar-item to="/" name="dashboard">
        <span class="tabbar-text">首页</span>
        <template #icon="props">
          <img class="tabbar-icon" :src="getImageUrl( `tabbar/${props.active ? 'tab_icon_home_pre' : 'tab_icon_home'}.png`)" alt="首页" />
        </template>
      </van-tabbar-item>
    
      <van-tabbar-item to="/user" name="user">
        <span class="tabbar-text">我的</span>
        <template #icon="props">
          <img class="tabbar-icon" :src="getImageUrl( `tabbar/${props.active ? 'tab_icon_mine_pre' : 'tab_icon_mine'}.png`)" alt="我的" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getImageUrl } from '/@/utils/index'
  import { special } from '/@/router/index'

  const router = useRouter()
  const route = useRoute()
  
  const active = ref(0)

  onMounted(() => {
    active.value = route.name
  } )
  
</script>

<style lang="scss" scoped>
  .tabbar-box {
    :deep(.van-tabbar) {
      background-color: var(--root-bg-color1);
      max-width: 375px;
      right: 0;
      margin: 0 auto;
      height: 50px;
      z-index: 999;
    }
    .van-tabbar-item {
      .tabbar-icon {
        width: 26px;
        height: 26px;
      }
      .tabbar-text {
        color: var(--root-text-color2);
        font-size: 12px;
      }
    }
    .van-tabbar-item--active {
      background-color: var(--root-bg-color1);
      .tabbar-text {
        color: var(--root-theme-color);
      }
    }
  }
</style>
