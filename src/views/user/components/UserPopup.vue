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
        <van-button class="btn copy" round block @click="onCopy">
          {{ info?.cer_status === 1 ? '复制' : '去认证' }}
        </van-button>
        <van-button class="btn cancel" round block @click="onCancel">
          关闭
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import store from '@/store/index'
import globleFun from '@/utils/link'
import useClipboard from 'vue-clipboard3'
import to from 'await-to-js'
import { showToast } from 'vant'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const { toClipboard } = useClipboard()
let info = computed(() => store.state.user.info)

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

const onCopy = async () => {
  if (info.value?.cer_status === 1) {
    let err, clipboard
    [ err, clipboard ] = await to(toClipboard(String(info.value?.address)))
    if (err) return showToast('复制失败')
    showToast('复制成功')
  } else {
    globleFun.onGoto('/authentication')
  }
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
      font-size: 18px;
      color: #fff;
      background-color: var(--root-theme-color);
    }
    .cancel {
      font-size: 18px;
      color: var(--root-text-color3);
      border-width: 0;
    }
  }
}
</style>
