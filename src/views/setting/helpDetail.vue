<template>
<div class="help-detail">
<div class="title">{{data.title}}</div>
<div class="content" v-html="data.content"></div>
</div>
</template>

<script  setup>
const data = JSON.parse(sessionStorage.getItem('help-data'))

</script>

<style lang="scss" scoped>
.help-detail{
  padding: 30px 16px;
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color2);
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