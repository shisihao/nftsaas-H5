<template>
  <div class="card-section login-section">
    <logo />
    <div class="title">
      欢迎登录
    </div>
    <div class="login-content">
      <van-form ref="form" @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.form.account"
            type="tel"
            autocomplete="off"
            name="account"
            label="账号"
            placeholder="请输入手机号码"
            clearable
            :rules="state.rules.account"
          />
          <van-field
            v-if="state.form.type === 'pass'"
            v-model="state.form.password"
            type="password"
            autocomplete="off"
            name="password"
            label="密码"
            placeholder="请输入登录密码"
            clearable
            :rules="state.rules.password"
          />
          <van-field
            v-if="state.form.type === 'code'"
            v-model="state.form.code"
            type="digit"
            autocomplete="off"
            maxlength="6"
            name="code"
            label="验证码"
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
          <div class="login-type">
            <div @click="onCheckType">
              {{ paraphrase({ value: state.form.type, options: typeOptions }) }}
            </div>
            <div @click="$globleFun.onGoto('/forgot')">
              忘记密码
            </div>
          </div>
        </van-cell-group>
        <van-button
          round
          block
          type="primary"
          class="submit-button"
          native-type="submit"
          loading-text="请求中..."
          :loading="state.btnLoading"
        >
          登录
        </van-button>
      </van-form>
      <agreement v-model:checkedValue="state.checked" class="agreement" />
      <div class="register" @click="$globleFun.onGoto('/register')">
        注册账号
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onBeforeUnmount, onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useRoute } from 'vue-router'
import { TokenKey } from '/@/utils/auth'
import { validPhone } from '/@/utils/validate'
import { paraphrase } from '/@/filters/index'
import Logo from '../components/common/Logo.vue'
import Agreement from './components/Agreement.vue'
import { login } from '/@/api/user'
import { verificationCode } from '/@/api/common'
import { showToast } from 'vant'
import globleFun from '/@/utils/link'
import settings from '/@/settings'

const route = useRoute()
route.query.code && sessionStorage.setItem('invitation-code', route.query.code)

const validatorAccount = (value, rule) => {
  if (!validPhone(value)) return false
  return true
}

const validatorPassWord = (value, rule) => {
  if (value.length < 6) return '密码不能小于6位'
  if (value.length > 20) return '密码不能大于20位'
  return true
}

const validatorCode = (value, rule) => {
  if (value.length !== 6) return false
  return true
}

const state = reactive({
  form: {
    account: '',
    password: '',
    code: '',
    type: 'pass'  // pass、code
  },
  verifyCode: {
    isDisabled: false,
    word: '获取验证码',
    scene: 'login',
    token: ''
  },
  checked: false,
  btnLoading: false,
  rules: {
    account: [
      { required: true, message: '不能为空' },
      { validator: validatorAccount, message: '手机号码错误' }
    ],
    password: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord }
    ],
    code: [
      { required: true, message: '不能为空' },
      { validator: validatorCode, message: '验证码错误' }
    ]
  }
})

const typeOptions = [
  { label: '密码登录', value: 'code' },
  { label: '验证码登录', value: 'pass' }
]

const onCheckType = () => {
  state.form.type = state.form.type === 'code' ? 'pass' : 'code'
  state.form.password = ''
  state.form.code = ''
}

const form = ref(null)
// 发送验证码
let codeTime = parseInt(Cookies.get('login-code') || 0)
const oldTime = 60
let sendTimer
let time = (codeTime - parseInt(+new Date())) > 0 ? parseInt((codeTime - parseInt(+new Date())) / 1000) : oldTime
// 计时
const countdown = () => {
  Cookies.set('login-code', parseInt(+new Date()) + time * 1000, { expires: new Date(parseInt(+new Date()) + time * 1000) })
  state.verifyCode.word = time + 's后获取'
  state.verifyCode.isDisabled = true
  sendTimer = setInterval(function () {
    time--
    state.verifyCode.word = time + 's后获取'
    Cookies.set('login-code', parseInt(+new Date()) + time * 1000)
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
  form.value.validate('account')
    .then(() => {
      const data = { ...state.form, ...state.verifyCode }
      verificationCode(data)
        .then(({ msg = '发送成功' }) => {
          countdown()
          showToast(msg)
        })
    })
}
// 销毁时
onBeforeUnmount(() => {
  clearInterval(sendTimer)
})

const onSubmit = (values) => {
  if (!state.checked) {
    return showToast(`请阅读并同意《${settings.title}用户协议》和《${settings.title}隐私协议》`)
  }

  const data = { ...state.form }
  if (data.type === 'pass') {
    delete data.code
  } else if (data.type === 'code') {
    delete data.password
  }

  state.btnLoading = true
  login(data)
    .then((response) => {
      Cookies.set(TokenKey, response.data.token, { expires: 7 })
      globleFun.onGoto('/')

    })
    .finally(() => {
      state.btnLoading = false
    })
}

</script>

<style lang="scss" scoped>
.card-section {
  // background-color: var(--root-bg-color2);
  background-color: rgba(var(--root-theme-color1), 0.5);
  // background-image: linear-gradient(var(--root-theme-color) 0, var(--root-bg-color1) 40%);
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  overflow: hidden;
}

.login-section {
  padding-bottom: 50px;

  .title {
    font-size: 36px;
    text-align: center;
    margin-top: 36px;
  }

  .login-content {
    margin-top: 46px;
    padding: 0 30px;

    .van-cell-group {
      background: none;

      &::after {
        border: 0;
      }

      .van-cell {
        background: none;
        padding: 0;
        margin-top: 30px;
        overflow: visible;
        flex-direction: column;
        &::after {
          border: 0;
        }
      }

      .van-field {
        :deep(.van-field__label) {
          color: var(--root-text-color2);
          font-size: 12px;
        }
        :deep(.van-field__body) {
          padding: 12px 12px;
          border: 1px solid var(--root-text-color4);
          border-radius: 8px;
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

      .login-type {
        display: flex;
        justify-content: space-between;
        color: var(--root-theme-color);
        margin-top: 24px;
      }
    }

    .submit-button {
      margin-top: 30px;
      background-image: var(--root-button-color1);
    }

    .agreement {
      margin-top: 30px;
    }

    .register {
      margin-top: 30px;
      text-align: center;
      color: var(--root-theme-color);
    }
  }
}
</style>
