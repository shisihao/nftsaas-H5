<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from '/@/store/index'
export default {
  name: 'App',
  mounted() {
    // 配置信息
    store.dispatch('user/getConfig')
  },
}
</script>
