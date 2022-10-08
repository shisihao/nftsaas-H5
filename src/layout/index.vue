<template>
  <div>
    <nav-bar />
    <app-main />
    <foot-bar />
  </div>
</template>

<script setup>
  import AppMain from './components/AppMain.vue'
  import NavBar from './components/NavBar/index.vue'
  import FootBar from './components/FootBar.vue'

  import store from '@/store/index'
  
  // 用户信息
  store.dispatch('user/getInfo')
</script>

<style lang="scss">
  .app-wrapper {
    max-width: 375px;
    min-height: 100vh;
    margin: 0 auto;
    background-color: var(--root-bg-color2);
  }
</style>
