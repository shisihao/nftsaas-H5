<template>
  <div class="main-section">
    <van-popup
      v-model:show="state.show"
      position="bottom"
      round
    >
      <div class="title">
        {{ title }}
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="button">
        <van-button class="btn cancel" round block @click="onCancel">
          关闭
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const state = reactive({
  show: false
})

const init = () => {
  state.show = true
}

defineExpose({ init })

const onCancel = () => {
  state.show = false
}

</script>

<style lang="scss" scoped>
.main-section {
  :deep(.van-popup) {
    background-color: #fff;
    color: var(--root-text-color4);
    padding-bottom: 20px;
  }
  .title {
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 18px;
    text-align: center;
    color: var(--root-text-color1);
    border-bottom: 1px solid var(--root-dividing-color1);
  }
  .content {
    padding: 24px 12px;
    line-height: 1.5;
    text-align: center;
    color: var(--root-text-color3);
  }
  .button {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    .btn {
      margin-top: 10px;
      padding: 6px 36px;
      border-radius: 20px;
      border-width: 1px;
      border-style: solid;
    }
    .copy {
      color: #fff;
      background-image: var(--root-button-color1);
    }
    .cancel {
      font-size: 18px;
      color: var(--root-text-color3);
      border-width: 0;
    }
  }
}
</style>
