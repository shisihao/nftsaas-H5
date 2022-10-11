<template>
  <div class="pay-input-contain">
    <van-popup v-model:show="state.show" round safe-area-inset-bottom position="bottom">
    <div class="pay-input-wrapper">
      <div class="title">
        输入支付密码
      </div>
      <div class="content">
        <van-password-input
          :value="state.pay_password"
        />
        <div class="tips">
          <span @click="$globleFun.onGoto('/verify-account')">忘记密码？</span>
        </div>
        <!-- 数字键盘 -->
        <van-number-keyboard
          v-model="state.pay_password"
          maxlength="6"
          theme="custom"
          extra-key=""
          close-button-text="完成"
          safe-area-inset-bottom
          :hide-on-click-outside="false"
          :show="state.showKeyboard"
        />
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import md5 from 'js-md5'

const getInitialData = () => ({
  show: false,
  pay_password: '',
  showKeyboard: true
})

const state = reactive(getInitialData())

const init = () => {
  state.show = true
}

defineExpose({ init })

const emit = defineEmits(['payPassword'])

watch(() => state.pay_password, (newVal) => {
  if (newVal.length === 6) {
    emit('payPassword', md5(newVal))
    onClose()
  }
})

const onClose = () => {
  Object.assign(state, getInitialData())
}

</script>

<style lang="scss" scoped>
.pay-input-contain {
  :deep(.van-popup) {
    max-width: var(--root-max-width);
    right: 0;
    margin: 0 auto;
    .pay-input-wrapper {
      color: var(--root-text-color1);
      .title {
        font-size: 18px;
        text-align: center;
        padding: 21px 0;
        border-bottom: 1px solid var(--root-dividing-color1);
      }
      .content {
        padding-top: 20px;
        text-align: center;
        line-height: 1.5;
        .van-password-input {
          padding-bottom: 20px;
        }
        .tips {
          color: var(--root-theme-color);
          margin-bottom: 20px;
        }
        .van-number-keyboard {
          position: relative;
        }
      }
    }
  }
}
</style>