<template>
<div class="help-detail">
<div class="title">{{data.title}}</div>
<div class="content" v-html="data.content"></div>
</div>
</template>

<script  setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const data = JSON.parse(route.query.data)
</script>

<style lang="scss" scoped>
.help-detail{
  padding: 30px 16px;
  .title{
    color: var(--root-text-color1);
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 16px;
  }
  .content{
    color: var(--root-text-color2);
    font-size: 16px;
    line-height: 24px;
    max-width: 100%;
    :deep(img), :deep(video) {
      max-width: 100%;
    }
  }
}
</style>