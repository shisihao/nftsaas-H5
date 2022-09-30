<template>
  <div class="blank-section">
    <iframe v-if="src" :src="src" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getToken } from '/@/utils/auth'

const route = useRoute()
const src = `${route.query.src}?token=${getToken()}`
// const src = `https://www.baidu.com`

</script>

<style lang="scss" scoped>
  .blank-section {
    iframe {
      width: 100%;
      height: calc(100vh - 46px);
    }
  }
</style>