<template>
  <div class="pay-pass-contain">
    <van-popup v-model:show="state.show" round position="bottom">
    <div class="pay-pass-wrapper">
      <div class="title">
        设置支付密码
      </div>
      <div class="content">
        您暂未设置支付密码<br/>
        为保障资金安全，请设置
      </div>
      <div class="button-row">
        <van-button class="btn btn-close" round @click="onClose">
          暂不
        </van-button>
        <van-button class="btn btn-submit" round @click="$globleFun.onGoto('/verify-account')">
          设置
        </van-button>
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  show: false
})

const init = () => {
  state.show = true
}

defineExpose({ init })

const onClose = () => {
  state.show = false
}

</script>

<style lang="scss" scoped>
.pay-pass-contain {
  :deep(.van-popup) {
    max-width: var(--root-max-width);
    right: 0;
    margin: 0 auto;
    .pay-pass-wrapper {
      padding: 0 var(--root-page-spacing);
      color: var(--root-text-color1);
      .title {
        font-size: 18px;
        text-align: center;
        padding: 21px 0;
        border-bottom: 1px solid var(--root-dividing-color1);
      }
      .content {
        padding: 30px 0;
        text-align: center;
        line-height: 1.5;
      }
      .button-row {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-around;
        .btn {
          font-size: 16px;
          line-height: 1;
          height: 38px;
          padding: 0 40px;
        }
        .btn-close {
          color: var(--root-text-color5);
          background-color: var(--root-button-color1);
        }
        .btn-submit {
          color: var(--root-text-color5);
          background-color: var(--root-theme-color);
        }
      }
    }
  }
}
</style>