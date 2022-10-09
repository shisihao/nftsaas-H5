<template>
  <div class="navigation-title" :class="`positon-${position}`">
    <b :class="`font-size-${fontSize}`">
      <span class="icon-left"></span>
      {{ title }}
      <span class="icon-right"></span>
    </b>
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
  b {
    font-weight: 500;
    position: relative;
    &.font-size-20 {
      font-size: 20px;
    }
    &.font-size-16 {
      font-size: 16px;
    }
    span {
      position: relative;
      &::before, &::after {
        content: '';
        position: absolute;
        top: 50%;
        margin-top: -6px;
        width: 12px;
        height: 12px;
        background-color: rgba(var(--root-theme-color-rgb), 0.5);
        border-radius: 3px;
        transform: rotate(45deg);
      }
      &.icon-left::before {
        left: -30px;
      }
      &.icon-left::after {
        left: -20px;
      }
      &.icon-right::before {
        right: -30px;
      }
      &.icon-right::after {
        right: -20px;
      }
    }
  }
}
.positon-left {

}
.positon-center {
  text-align: center;
}
</style>
