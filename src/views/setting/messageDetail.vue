<template>
  <div class="message-detail">
    <div class="message-title">{{ data.title }}</div>
    <div class="message-date">{{ data.created_at }}</div>
    <div class="message-content" v-html="data.content"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const data = JSON.parse(route.query.data)

</script>

<style lang="scss" scoped>
.message-detail {
  padding: 27px 16px;

  .message-title {
    color: var(--root-text-color1);
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 7px;
  }

  .message-date {
    font-size: 12px;
    color: var(--root-text-color2);
    margin-bottom: 20px;
  }

  .message-content {
    color: var(--root-text-color2);
    font-size: 16px;
    line-height: 24px;

        :deep(img),:deep(video) {
          max-width: 100%;
        }
  }
}
</style>