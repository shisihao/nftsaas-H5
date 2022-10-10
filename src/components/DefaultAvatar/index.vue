<template>
  <van-image
    fit="cover"
    :round="round"
    :src="src || ''"
  />
</template>

<script setup>
import { getImageUrl } from '@/utils/index'

const props = defineProps({
  round: {
    type: Boolean,
    default: true
  },
  src: {
    type: String,
    default: ''
  },
})

</script>

<style lang="scss" scoped>
</style>
