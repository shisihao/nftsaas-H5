<template>
  <div class="logo-section">
    <img :src="config?.cdn_domain + config?.design_style?.inside_logo" alt="">
    <p>{{ config?.design_style?.app_name }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import store from '@/store/index'

const config = computed(() => store.state.user.config)
</script>

<style lang="scss" scoped>
  .logo-section {
    margin-top: 30px;
    text-align: center;
    img {
      width: 56px;
      height: 56px;
      border-radius: 12px;
    }
    p {
      margin-top: 10px;
      font-size: 21px;
      font-weight: 500;
    }
  }
</style>
