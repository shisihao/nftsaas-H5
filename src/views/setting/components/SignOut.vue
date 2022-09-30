<template>
  <div class="main-section">
    <van-popup
      v-model:show="state.show"
      round
      position="bottom"
    >
      <div class="title">
        退出登录
      </div>
      <div class="tips">
        确定要退出登录？
      </div>
      <div class="button">
        <div class="btn cancel" @click="onCancel">
          取消
        </div>
        <div class="btn submit" @click="onSubmit">
          退出
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, defineExpose } from 'vue'
import store from '/@/store/index'

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

const onSubmit = () => {
  state.show = false
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.main-section {
  :deep(.van-popup) {
    background-color: var(--root-bg-color1);
    padding-bottom: 50px;
  }
  .title {
    margin-top: 25px;
    font-size: 18px;
    text-align: center;
  }
  .tips {
    margin-top: 30px;
    text-align: center;
    color: var(--root-text-color3);
  }
  .button {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    .btn {
      padding: 6px 36px;
      border-radius: 20px;
      border-width: 1px;
      border-style: solid;
    }
    .cancel {
      color: var(--root-theme-color);
    }
    .submit {
      color: var(--root-text-color1);
      background-color: var(--root-auxiliary-color);
      border-color: var(--root-auxiliary-color);
    }
  }
}
</style>
