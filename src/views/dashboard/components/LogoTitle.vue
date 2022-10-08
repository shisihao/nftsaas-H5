<template>
  <div class="logo-title">
    <img :src="getImageUrl('dashboard/home_icon_logo.png')" alt="logo"/>
  </div>
</template>

<script setup>
  import { getImageUrl } from '@/utils/index'

</script>

<style lang="scss" scoped>
  .logo-title {
    width: 120px;
    margin-left: var(--root-page-spacing);
    /* background-image: url('@/assets/images/dashboard/home_icon_logo_bg.png'); */
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: flex-start;
    img {
      width: 100%;  
      margin-top: 16px;
    }
  }
</style>
