<template>
  <van-image
    fit="cover"
    :round="round"
    :src="src || `${config?.cdn_domain}${config?.design_style?.inside_logo}`"
  />
</template>

<script setup>
import { computed } from 'vue'
import store from '@/store/index'
const config = computed(() => store.state.user.config)

const props = defineProps({
  round: {
    type: Boolean,
    default: true
  },
  src: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
</style>
