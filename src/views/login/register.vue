<template>
  <div class="card-section login-section">
    <logo />
    <div class="title">
      欢迎注册
    </div>
    <div class="login-content">
      <van-form ref="form" @submit="onSubmit">
        <van-cell-group v-if="state.step === 0">
          <van-field
            v-model="state.form.account"
            type="tel"
            autocomplete="off"
            maxlength="11"
            name="account"
            label="账号"
            placeholder="请输入手机号码"
            clearable
            :rules="state.rules.account"
          />
          <verify-code
            v-model="state.form.code"
            ref="refSendCode"
            :captcha="true"
            :label="true"
            :scene="state.verifyCode.scene"
            @verify-account="onVerifyAccount"
            @send-code="onSendCode"
          />
          <van-field
            v-model="state.form.invite_code"
            autocomplete="off"
            maxlength="6"
            name="invite_code"
            label="邀请码"
            placeholder="请输入邀请码"
            clearable
          />
        </van-cell-group>
        <van-cell-group v-if="state.step === 1">
          <van-field
            v-model="state.form.password"
            type="password"
            autocomplete="off"
            maxlength="20"
            name="password"
            label="设置密码"
            placeholder="请设置密码"
            clearable
            :rules="state.rules.password"
          />
          <van-field
            v-model="state.form.password_confirmation"
            type="password"
            autocomplete="off"
            maxlength="20"
            name="password_confirmation"
            label="确认密码"
            placeholder="请确认密码"
            clearable
            :rules="state.rules.password_confirmation"
          />
        </van-cell-group>
        <div v-if="state.step === 1" class="password-tips">
          * 限6-20个字符以内，建议使用字母数字组合，区分大小写
        </div>
        <van-button
          v-if="state.step === 0"
          round
          block
          type="primary"
          class="submit-button"
          loading-text="请求中..."
          :loading="state.btnLoading"
          @click="onHandleStep"
        >
          下一步
        </van-button>

        <van-button
          v-if="state.step === 1"
          round
          block
          type="primary"
          class="submit-button"
          native-type="submit"
          loading-text="请求中..."
          :loading="state.btnLoading"
        >
          进入{{ config?.design_style?.app_name }}
        </van-button>
      </van-form>
      <agreement v-if="state.step === 0" v-model:checkedValue="state.checked" class="agreement" />
      <div class="register" @click="$globleFun.onGoto('/login')">
        登录账号
      </div>
    </div>
    <div ref="dingxiang"></div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onBeforeUnmount, onMounted, computed } from 'vue'
import Cookies from 'js-cookie'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import store from '@/store/index'
import { validPhone } from '@/utils/validate'
import { TokenKey } from '@/utils/auth'
import globleFun from '@/utils/link'
import { paraphrase } from '@/filters/index'
import { register } from '@/api/user'
import { verificationCode, verificationCodeCheck } from '@/api/common'
import Logo from '../components/common/Logo.vue'
import Agreement from './components/Agreement.vue'
import VerifyCode from '@/components/VerifyCode/index.vue'

const route = useRoute()
const invitationCode = sessionStorage.getItem('invitation-code')

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
    password: '',
    code: '',
    password_confirmation: '',
    invite_code: ''
  },
  verifyCode: {
    scene: 'register'
  },
  checked: false,
  btnLoading: false,
  step: 0,
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
    ]
  }
})

invitationCode && (state.form.invite_code = invitationCode)

const config = computed(() => store.state.user.config)

// 滑块
const form = ref(null)
const refSendCode = ref(null)

const onSendCode = (value = {}) => {
  state.verifyCode = { ...state.verifyCode, ...value }
  const data = { ...state.form, ...state.verifyCode }
  verificationCode(data)
    .then(({ msg = '发送成功' }) => {
      refSendCode.value.countdown()
      showToast(msg)
    })
}

const onVerifyAccount = () => {
  form.value.validate(['account'])
    .then(() => {
      refSendCode.value.carry()
    })
}

const onHandleStep = () => {
  form.value.validate(['account', 'code'])
    .then(() => {
      if (!state.checked) {
        return showToast(`请阅读并同意《用户协议》和《隐私协议》`)
      }
      const data = { ...state.form, ...state.verifyCode }
      state.btnLoading = true
      verificationCodeCheck(data)
        .then((response) => {
          if (response.data?.ok) {
            state.step = 1
          }
        })
        .finally(() => {
          state.btnLoading = false
        })
    })
}

const onSubmit = (values) => {
  state.btnLoading = true
  const data = { ...state.form, ...state.verifyCode }
  register(data)
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
