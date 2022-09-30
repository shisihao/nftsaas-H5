<template>
  <div class="title-section">
    <div>
      <span class="title">
        {{ title }}
      </span>
      <span v-show="numShow" class="num">
        {{ num }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  numShow: {
    type: Boolean,
    default: false
  },
  num: {
    type: Number,
    default: 0
  }
})

</script>

<style lang="scss" scoped>
  .title-section {
    margin-top: 24px;
    margin-bottom: 18px;
    .title {
      font-size: 18px;
    }
    .num {
      background-color: var(--root-bg-color1);
      border-radius: 10px;
      padding: 0 12px;
      margin-left: 10px;
    }
  }
</style>
