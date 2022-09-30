<template>
  <div class="card-section">
    <navigation-title title="权益说明" fontSize="16" />
    <block-control>
      <div class="card-wrapper">
        {{ wordText }}
      </div>
    </block-control>
  </div>
</template>

<script setup>
import NavigationTitle from '/@/components/NavigationTitle/index.vue'
import BlockControl from '/@/components/BlockControl/index.vue'

defineProps({
  wordText: {
    type: String,
    default: ''
  },
})

</script>

<style lang="scss" scoped>
  
</style>