<template>
  <div class="card-section">
    <navigation-title :title="title" fontSize="16" />
    <block-control>
      <div class="card-wrapper" v-html="richText">
      </div>
    </block-control>
  </div>
</template>

<script setup>
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import BlockControl from '@/components/BlockControl/index.vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  richText: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
:deep(.card-wrapper) {
  padding-top: 24px;
  & video, & img {
    width: 100%;
  }
}
</style>