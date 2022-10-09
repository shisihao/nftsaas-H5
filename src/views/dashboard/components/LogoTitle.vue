<template>
  <div class="logo-title">
    <img :src="config?.cdn_domain + config?.design_style?.invite_logo" alt="logo"/>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import store from '@/store/index'

const config = computed(() => store.state.user.config)
</script>

<style lang="scss" scoped>
  .logo-title {
    width: 128px;
    height: 48px;
    margin-left: var(--root-page-spacing);
    overflow: hidden;
    img {
      width: 100%;
      height: 32px;
      margin-top: 16px;
    }
  }
</style>
