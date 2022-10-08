<template>
  <van-image
    class="default-avatar"
    fit="cover"
    :round="round"
    :src="src"
  />
</template>

<script setup>
import { defineProps } from 'vue'
import { getImageUrl } from '@/utils/index'

const props = defineProps({
  round: {
    type: Boolean,
    default: true
  },
  src: {
    type: String,
    default: getImageUrl('public/logo.png')
  },
})

</script>

<style lang="scss" scoped>
.default-avatar {
  padding: 1px;
  position: relative;
  :deep(img) {
    position: relative;
    z-index: 1;
  }
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: var(--root-button-color1);
  }
  &::after {
    content: '';
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    position: absolute;
    left: 1px;
    top: 1px;
    background-color: #fff;
    border-radius: 50%;
  }
}
</style>
