<template>
  <div class="pay-input-contain">
    <van-popup v-model:show="state.show" safe-area-inset-bottom position="bottom">
    <div class="pay-input-wrapper">
        <van-nav-bar fixed placeholder>
        <template #left>
          <span @click="state.show = false">
            <van-icon name="arrow-left"/>
          </span>
        </template>
        <template #title>
          确认密码
        </template>
      </van-nav-bar>

      <div class="content">
        <div class="content-card">
          <div class="info">
            <p>当前号码</p>
            <p class="info-phone">{{ phone }}</p>
          </div>

          <div class="sms-title">
            <span>请输入验证码</span>
            <div class="get-code" :class="state.verifyCode.isDisabled && 'get-code-disabled'" @click="onSendCode">
                {{ state.verifyCode.word }}
              </div>
          </div>
          <van-password-input
            :value="state.code"
            :gutter="10"
            @click="onShowCode"
            :mask="false"
          />
        </div>

        <div class="content-card password-card">
          <p class="password-title">支付密码验证</p>
          <van-password-input
            :value="state.pay_password"
            :gutter="10"
            @click="onShowPass"
          />

          <div class="actions">
            <van-button type="primary" block round :disabled="confirm_disable" @click="onSubmit">确认</van-button>
          </div>

          <!-- 数字键盘 -->
          <van-number-keyboard
            v-model="state.code"
            maxlength="6"
            theme="custom"
            extra-key=""
            close-button-text="完成"
            safe-area-inset-bottom
            :hide-on-click-outside="false"
            :show="state.codeKeyboardShow"
            @blur="state.codeKeyboardShow = false"
          />
          <van-number-keyboard
            v-model="state.pay_password"
            maxlength="6"
            theme="custom"
            extra-key=""
            close-button-text="完成"
            safe-area-inset-bottom
            :hide-on-click-outside="false"
            :show="state.passKeyboardShow"
            @blur="state.passKeyboardShow = false"
          />
        </div>
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import store from '@/store/index'
import { mosaicTel } from '@/filters/index'
import Cookies from 'js-cookie'
import { verificationCode } from '@/api/common'
import { showToast } from 'vant'
import md5 from 'js-md5'

const info = computed(() => store.state.user.info)
const phone = computed(() => mosaicTel(store.state.user.info?.phone))
const confirm_disable = computed(() => {
  return state.code.length < 6 || state.pay_password.length < 6
})

const getInitialData = () => ({
  show: false,
  code: '',
  pay_password: '',
  verifyCode: {
    isDisabled: false,
    word: '获取验证码',
    scene: 'give_collect',
    token: ''
  },
  codeKeyboardShow: false,
  passKeyboardShow: false,
})

const state = reactive(getInitialData())

const init = () => {
  state.show = true
}

defineExpose({ init })

const emit = defineEmits(['payPassword'])

watch(() => state.code, (newVal) => {
  if (newVal.length === 6) {
    state.codeKeyboardShow = false
  }
})
watch(() => state.pay_password, (newVal) => {
  if (newVal.length === 6) {
    state.passKeyboardShow = false
  }
})

// 发送验证码
let codeTime = parseInt(Cookies.get('give_collect') || 0)
const oldTime = 60
let sendTimer
let time = (codeTime - parseInt(+new Date())) > 0 ? parseInt((codeTime - parseInt(+new Date())) / 1000) : oldTime
// 计时
const countdown = () => {
  Cookies.set('give_collect', parseInt(+new Date()) + time * 1000, { expires: new Date(parseInt(+new Date()) + time * 1000) })
  state.verifyCode.word = time + 's后获取'
  state.verifyCode.isDisabled = true
  sendTimer = setInterval(function () {
    time--
    state.verifyCode.word = time + 's后获取'
    Cookies.set('give_collect', parseInt(+new Date()) + time * 1000)
    if (time <= 0) {
      state.verifyCode.isDisabled = false
      clearInterval(sendTimer)
      state.verifyCode.word = '获取验证码'
      time = oldTime
    }
  }, 1000)
}
if ((codeTime - parseInt(+new Date())) > 0) {  // 默认执行
  countdown()
}

// 点击发送按钮
const onSendCode = () => {
  if (state.verifyCode.isDisabled) return false
  const data = { account: info.value.phone, ...state.verifyCode }
  verificationCode(data)
    .then(({ msg = '发送成功' }) => {
      countdown()
      showToast(msg)
    })
}

const onShowCode = () => {
  state.passKeyboardShow = false
  state.codeKeyboardShow = true
}

const onShowPass = () => {
  state.codeKeyboardShow = false
  state.passKeyboardShow = true
}

const onSubmit = () => {
  const data = {
    code: state.code,
    pay_password: md5(state.pay_password)
  }
  emit('payPassword', data)
  onClose()
}

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
    height: 100vh;
    .van-nav-bar {
      max-width: var(--root-max-width);
      left: unset;
    }
    .van-icon-arrow-left {
      font-size: 24px;
      color: var(--root-text-color1);
    }
    .van-nav-bar__title {
      color: var(--root-text-color1);
      font-weight: normal;
      font-size: 18px;
    }
    .pay-input-wrapper {
      color: var(--root-text-color1);
      .title {
        font-size: 18px;
        text-align: center;
        padding: 15px 0;
        border-bottom: 1px solid var(--root-dividing-color1);
      }
      .content {
        line-height: 1.5;
        background: var(--root-bg-color1);
        .content-card {
          background: var(--root-bg-color2);
        }
        .actions {
          margin-top: 15px;
          padding: var(--root-page-spacing);
        }
        .password-card {
          margin-top: 10px;
        }
        .info {
          padding: var(--root-page-spacing);
          .info-phone {
            font-size: 22px;
            color: var(--root-text-color1);
          }
        }
        .sms-title {
          padding: var(--root-page-spacing);
          display: flex;
          justify-content: space-between;
          .get-code {
            color: var(--root-auxiliary-color2);
          }
          .get-code-disabled {
            color: var(--root-text-color2);
          }
        }
        .password-title {
          padding: var(--root-page-spacing);
          text-align: center;
          font-size: 18px;
        }

        .van-password-input {
          padding-bottom: 20px;
        }
        .van-password-input__security {
          li {
            background: var(--root-bg-color1);
          }
        }
      }
    }
    .van-number-keyboard {
      max-width: var(--root-max-width);
      left: unset;
    }
  }
}
</style>