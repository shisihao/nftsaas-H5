<template>
  <div class="card-section login-section">
    <div class="title">
      重置密码
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
          <van-field
            v-model="state.form.password"
            type="password"
            autocomplete="off"
            name="password"
            label="密码"
            placeholder="请输入新的登录密码"
            clearable
            :rules="state.rules.password"
          />
          <van-field
            v-model="state.form.password_confirmation"
            type="password"
            autocomplete="off"
            name="password"
            label="密码"
            placeholder="请确认登录密码"
            clearable
            :rules="state.rules.password_confirmation"
          />
          <div class="password-tips">
            * 限6-20个字符以内，建议使用字母数字组合，区分大小写
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
          修改并登录
        </van-button>
      </van-form>
    </div>
    <div ref="dingxiang"></div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onBeforeUnmount, onMounted, computed } from 'vue'
import Cookies from 'js-cookie'
import { validPhone } from '/@/utils/validate'
import { TokenKey } from '/@/utils/auth'
import globleFun from '/@/utils/link'
import { paraphrase } from '/@/filters/index'
import { forgetPassword } from '/@/api/user'
import { verificationCode } from '/@/api/common'
import { showToast } from 'vant'
import store from '/@/store/index'

const validatorAccount = (value, rule) => {
  if (!validPhone(value)) return false
  return true
}

const validatorPassWord = (value, rule) => {
  if (value.length < 6) return '密码不能小于6位'
  if (value.length > 20) return '密码不能大于20位'
  return true
}

const validatorPassWord1 = (value, rule) => {
  if (value !== state.form.password) return '两次密码输入不一致'
  return true
}

const validatorCode = (value, rule) => {
  if (value.length !== 6) return false
  return true
}

const state = reactive({
  form: {
    account: '',
    code: '',
    password: '',
    password_confirmation: ''
  },
  verifyCode: {
    isDisabled: false,
    word: '获取验证码',
    scene: 'update-login-pass',
    token: ''
  },
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
    password_confirmation: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord1 }
    ],
    code: [
      { required: true, message: '不能为空' },
      { validator: validatorCode, message: '验证码错误' }
    ]
  }
})

let config = computed(() => store.state.user.config)

// 顶象
const dingxiang = ref(null)
const form = ref(null)
let isDx = computed(() => config.value?.dx_config?.open === 'on' ? true : false )
let captcha

// 发送验证码
let codeTime = parseInt(Cookies.get('forgot-code') || 0)
const oldTime = 60
let sendTimer
let time = (codeTime - parseInt(+new Date())) > 0 ? parseInt((codeTime - parseInt(+new Date())) / 1000) : oldTime
// 计时
const countdown = () => {
  Cookies.set('forgot-code', parseInt(+new Date()) + time * 1000, { expires: new Date(parseInt(+new Date()) + time * 1000) })
  state.verifyCode.word = time + 's后获取'
  state.verifyCode.isDisabled = true
  sendTimer = setInterval(function () {
    time--
    state.verifyCode.word = time + 's后获取'
    Cookies.set('forgot-code', parseInt(+new Date()) + time * 1000)
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

const dxCapt = () => {
  return _dx.Captcha(dingxiang.value, {
    appId: config.value?.dx_config?.appid,
    style: 'popup',
    success: token => {
      // console.log(token)
    }
  })
}

const postSend = (value = '') => {
  isDx.value && captcha.hide()
  state.verifyCode.token = value
  const data = { ...state.form, ...state.verifyCode }
  verificationCode(data)
    .then(({ msg = '发送成功' }) => {
      countdown()
      showToast(msg)
    })
}

// 点击发送按钮
const onSendCode = () => {
  if (state.verifyCode.isDisabled) return false
  form.value.validate('account')
    .then(() => {
      if (isDx.value) {
        captcha = dxCapt()
        captcha.show()
        // 验证成功时
        captcha.on('verifySuccess', function (security_code) {
          postSend(security_code)
        });
        // 【无感验证】通过，服务端判定本次验证可直接通过，无需用户交互。如果此事件触发，则验证码直接显示为验证通过状态，将没有后面的用户交互阶段。此事件带一个参数 token。
        captcha.on('passByServer', function (security_code) {
          postSend(security_code)
        })
      } else {
        postSend()
      }
    })
}
// 销毁时
onBeforeUnmount(() => {
  clearInterval(sendTimer)
})

const onSubmit = (values) => {
  const data = { ...state.form }
  state.btnLoading = true
  forgetPassword(data)
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
  background-color: var(--root-bg-color2);
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
    .password-tips {
      margin-top: 24px;
      font-size: 12px;
      color: var(--root-text-color2);
    }
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
    }

    .submit-button {
      margin-top: 30px;
      background-image: var(--root-button-color1);
    }
  }
}
</style>
