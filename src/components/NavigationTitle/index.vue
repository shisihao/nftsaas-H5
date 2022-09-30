<template>
  <div class="navigation-title" :class="`positon-${position}`">
    <span :class="`font-size-${fontSize}`">
      {{ title }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  fontSize: {
    type: String,
    default: '20'
  },
  position: {
    type: String,
    default: 'left' // 'left、center'
  }
})

</script>

<style lang="scss" scoped>
.navigation-title {
  span {
    padding: 0 30px;
    font-weight: 500;
    position: relative;
    &.font-size-20 {
      font-size: 20px;
    }
    &.font-size-16 {
      font-size: 16px;
    }
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      margin-top: -7.5px;
      width: 22px;
      height: 15px;
      background-image: url('/@/assets/images/public/common_icon_title.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      vertical-align: middle;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
}
.positon-left {

}
.positon-center {
  text-align: center;
}
</style>
