<template>
  <div class="account-section">
    <logo />
    <div class="account">
      <p>
        当前账号
      </p>
      <div class="phone">
        {{ info && mosaicTel(info.phone) }}
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="state.form.code"
          type="digit"
          autocomplete="off"
          maxlength="6"
          name="code"
          placeholder="请输入验证码"
          clearable
          :rules="state.rules.code"
        > 
          <template #button>
            <div class="get-code" :class="state.verifyCode.isDisabled && 'get-code-disabled'" @click="onSendCode">
              {{ state.verifyCode.word }}
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <div class="account-row">
        <van-button
          round
          block
          type="primary"
          class="submit-button"
          native-type="submit"
          loading-text="请求中..."
          :loading="state.btnLoading"
        >
          下一步
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store/index'
import Cookies from 'js-cookie'
import Logo from '../components/common/Logo.vue'
import { changePassword } from '@/api/user'
import { showToast } from 'vant'
import { verificationCode, verificationCodeCheck } from '@/api/common'
import { mosaicTel } from '@/filters/index'

const router = useRouter()

let info = computed(() => store.state.user.info)

const validatorCode = (value, rule) => {
  if (value.length !== 6) return false
  return true
}

const state = reactive({
  btnLoading: false,
  form: {
    account: '',
    code: '',
  },
  verifyCode: {
    isDisabled: false,
    word: '获取验证码',
    scene: 'set-pay-pass',
    token: ''
  },
  rules: {
    code: [
      { required: true, message: '不能为空' },
      { validator: validatorCode, message: '验证码错误' }
    ]
  }
})

// 发送验证码
let codeTime = parseInt(Cookies.get('set-pay-pass') || 0)
const oldTime = 60
let sendTimer
let time = (codeTime - parseInt(+new Date())) > 0 ? parseInt((codeTime - parseInt(+new Date())) / 1000) : oldTime
// 计时
const countdown = () => {
  Cookies.set('set-pay-pass', parseInt(+new Date()) + time * 1000, { expires: new Date(parseInt(+new Date()) + time * 1000) })
  state.verifyCode.word = time + 's后获取'
  state.verifyCode.isDisabled = true
  sendTimer = setInterval(function () {
    time--
    state.verifyCode.word = time + 's后获取'
    Cookies.set('set-pay-pass', parseInt(+new Date()) + time * 1000)
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
  const data = { ...state.form, ...state.verifyCode }
  verificationCode(data)
    .then(({ msg = '发送成功' }) => {
      countdown()
      showToast(msg)
    })
}
// 销毁时
onBeforeUnmount(() => {
  clearInterval(sendTimer)
})

const onSubmit = () => {
  const data = { ...state.form, ...state.verifyCode }
  state.btnLoading = true
  verificationCodeCheck(data)
    .then((response) => {
      if (response.data?.ok) {
        router.replace({ name: 'set-paypass', params: { code: state.form.code }})
      }
    })
    .finally(() => {
      state.btnLoading = false
    })
}

</script>

<style lang="scss" scoped>
.account-section {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  overflow: hidden;
  .account {
    margin-top: 60px;
    padding: 0 var(--root-page-spacing);
    p {
      font-size: 12px;
      color: var(--root-text-color2);
    }
    .phone {
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .van-form {
    .van-cell-group {
      background: none;
      &::after {
        border: 0;
      }

      .van-cell {
        background: none;
        padding: 0;
        margin-top: 24px;
        overflow: visible;
        background-color: var(--root-bg-color2);
        &::after {
          border: 0;
        }
      }

      .van-field {
        :deep(.van-field__body) {
          padding: 12px 12px 12px 36px;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background-image: url('@/assets/images/public/set_input_icon_validation.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
          }
        }

        :deep(input) {
          color: var(--root-text-color1);
        }

        :deep(.van-field__error-message) {
          position: absolute;
          bottom: -24px;
          left: 0;
        }

        :deep(.get-code) {
          color: var(--root-theme-color);
          &.get-code-disabled {
            color: var(--root-text-color2);
          }
        }
      }
    }
    .account-row {
      padding: 0 var(--root-page-spacing);
      .submit-button {
        margin-top: 50px;
        background-image: var(--root-button-color1);
      }
    }
  }
}
</style>
