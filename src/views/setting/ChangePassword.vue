<template>
  <div class="change-section">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="state.form.old_password"
          type="password"
          name="old_password"
          label="旧密码"
          placeholder="请输入旧密码"
          autocomplete="off"
          clearable
          :rules="state.rules.old_password"
        />
        <van-field
          v-model="state.form.password"
          type="password"
          name="password"
          label="新密码"
          placeholder="请输入新密码"
          autocomplete="off"
          clearable
          :rules="state.rules.password"
        />
        <van-field
          v-model="state.form.password_confirmation"
          type="password"
          name="password_confirmation"
          label="确认密码"
          placeholder="请再次输入新密码"
          autocomplete="off"
          clearable
          :rules="state.rules.password_confirmation"
        />
        <div class="password-tips">
          *限6-20个字符以内，建议使用数字字母组合，区分大小写
        </div>

        <div class="account">
          <p>
            当前账号
          </p>
          <div class="phone">
            {{ info && mosaicTel(info.phone) }}
          </div>
        </div>
        <verify-code
          v-model="state.form.code"
          ref="refSendCode"
          :label="true"
          :scene="state.verifyCode.scene"
          @verify-account="onVerifyAccount"
          @send-code="onSendCode"
        />
      </van-cell-group>
      <div class="change-row">
        <van-button
          round
          block
          class="submit-button"
          type="primary"
          native-type="submit"
          loading-text="请求中..."
          :loading="state.btnLoading"
        >
          确认
        </van-button>
        <div class="forget" @click="$globleFun.onGoto('/forgot')">
          忘记密码？
        </div>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { showToast } from 'vant'
import store from '@/store/index'
import globleFun from '@/utils/link'
import { mosaicTel } from '@/filters/index'
import { changePassword } from '@/api/user'
import { verificationCode } from '@/api/common'
import VerifyCode from '@/components/VerifyCode/index.vue'

const refSendCode = ref()
const info = computed(() => store.state.user.info)

const validatorPassWord = (value, rule) => {
  if (value.length < 6) return '密码不能小于6位'
  if (value.length > 20) return '密码不能大于20位'
  return true
}

const validatorPassWord1 = (value, rule) => {
  if (value !== state.form.password) return '两次密码输入不一致'
  // if (value === state.form.old_password) return '新密码不能与旧密码相同'
  return true
}

const state = reactive({
  btnLoading: false,
  verifyCode: {
    scene: 'set-login-pass'
  },
  form: {
    old_password: '',
    password: '',
    password_confirmation: '',
    code: ''
  },
  rules: {
    old_password: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord }
    ],
    password: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord }
    ],
    password_confirmation: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord1 }
    ],
  }
})

const onVerifyAccount = () => {
  refSendCode.value.carry()
}

const onSendCode = (value = {}) => {
  state.verifyCode = { ...state.verifyCode, ...value }
  const data = { ...state.form, ...state.verifyCode }
  verificationCode(data)
    .then(({ msg = '发送成功' }) => {
      refSendCode.value.countdown()
      showToast(msg)
    })
}

const onSubmit = () => {
  state.btnLoading = true
  changePassword(state.form)
    .then(({ msg = '修改成功' }) => {
      showToast(msg)
      globleFun.onGoto(-1, 'back')
    })
    .finally(() => {
      state.btnLoading = false
    })
}

</script>

<style lang="scss" scoped>
.change-section {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  overflow: hidden;
  .van-form {
    margin-top: 10px;
    .van-cell-group {
      background: none;
      background-color: var(--root-bg-color1);
      &::after {
        border-width: 0;
      }
      .password-tips {
        padding: 0 var(--root-page-spacing);
        margin-top: 12px;
        font-size: 12px;
        color: var(--root-text-color2);
      }
      .account {
        margin-top: 24px;
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
      .van-cell {
        margin-top: 12px;
        background-color: var(--root-bg-color2);
        overflow: visible;
        :deep(.van-field__label) {
          color: var(--root-text-color1);
        }
        :deep(.van-field__value) {
          input {
            color: var(--root-text-color1);
          }
          .van-field__error-message {
            position: absolute;
            bottom: -26px;
            left: 0;
          }
        }
        &::after {
         border-color: var(--root-dividing-color1); 
        }
      }
      .van-input-code {
        padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
      }
    }
    .change-row {
      padding: 0 var(--root-page-spacing);
      .submit-button {
        margin-top: 50px;
        background-image: var(--root-button-color1);
      }
      .forget {
        margin-top: 30px;
        font-size: 16px;
        text-align: center;
        color: var(--root-auxiliary-color2);
      }
    }
  }
}
</style>
