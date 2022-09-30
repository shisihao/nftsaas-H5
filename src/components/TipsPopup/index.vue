<template>
  <div class="tips-contain">
    <van-popup v-model:show="state.show" round safe-area-inset-bottom @closed="onClose">
      <div class="title">
        <slot name="title">提示</slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <van-button class="btn submit" round block @click="onClose">
          知道了
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const getInitialData = () => ({
  show: false
})

const state = reactive(getInitialData())

const init = () => {
  state.show = true
}

defineExpose({ init })

const onClose = () => {
  Object.assign(state, getInitialData())
}

</script>

<style lang="scss" scoped>
.tips-contain {
  :deep(.van-popup) {
    max-width: var(--root-max-width);
    width: 80%;
    .title {
      font-size: 18px;
      text-align: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--root-dividing-color1);
    }
    .content {
      padding: 20px;
      text-align: center;
      line-height: 1.5;
    }
    .footer {
      padding: 20px;
      .btn {
        height: auto;
        padding: 8px 0;
        &.submit {
          color: var(--root-text-color5);
          background-color: var(--root-theme-color);
        }
      }
    }
  }
}
</style>