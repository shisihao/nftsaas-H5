<template>
  <div class="nomore" :class="show ? '' : 'none'">
    <img src="@/assets/images/public/nomore.png" alt="">
  </div>
</template>

<script setup>

defineProps({
  show: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="scss" scoped>
.nomore {
  text-align: center;
  padding: 20px 0;
  img {
    width: 104px;
  }
}
</style>
