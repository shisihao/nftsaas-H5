<template>
  <div class="affirm-phone">
    <van-form ref="form" @submit="onSubmit">
      <van-field :border="false" class="list phone" v-model="state.form.account" type="tel" autocomplete="off"
      maxlength="11" name="account" placeholder="请输入手机号码" clearable :rules="state.rules.account">
      </van-field>
      <van-field :border="false" class="list field-code" v-model="state.form.code" type="digit" autocomplete="off"
        maxlength="6" name="code" placeholder="请输入验证码" clearable :rules="state.rules.code">
        <template #button>
          <div class="get-code" :class="state.verifyCode.isDisabled && 'get-code-disabled'" @click="onSendCode">
            {{ state.verifyCode.word }}
          </div>
        </template>
      </van-field>
      <div class="notice">*换绑后，下次登录使用新手机号登录</div>
      <van-button round block type="primary" class="submit-button" :class="{disable:!state.flag}" loading-text="请求中..." native-type="submit"
        :loading="state.btnLoading" >
        确认绑定
      </van-button>
    </van-form>
  </div>

</template>

<script setup>
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue'
import { validPhone } from '@/utils/validate'
import Cookies from 'js-cookie'
import { userChange } from '@/api/setting'
import { showToast } from 'vant'
import store from '@/store/index'
import { verificationCode } from '@/api/common'

const validatorAccount = (value, rule) => {
  if (!validPhone(value)) return false
  return true
}

const validatorCode = (value, rule) => {
  if (value.length !== 6) return false
  return true
}

const state = reactive({
  form: {
    account: '',
    code: ''
  },
  verifyCode: {
    isDisabled: false,
    word: '获取验证码',
    scene: 'change-account',
    token: ''
  },
  btnLoading: false,
  flag:false,
  rules: {
    account: [
      { required: true, message: '不能为空' },
      { validator: validatorAccount, message: '手机号码错误' }
    ],
    code: [
      { required: true, message: '不能为空' },
      { validator: validatorCode, message: '验证码错误' }
    ]
  }
})

watch(() =>[state.form.account, state.form.code] , ([newValue1,newValue2])=> {
  state.flag = validatorAccount(newValue1) && validatorCode(newValue2)
})

const form = ref(null)

// 发送验证码
let codeTime = parseInt(Cookies.get('change-account-code') || 0)
const oldTime = 60
let sendTimer
let time = (codeTime - parseInt(+new Date())) > 0 ? parseInt((codeTime - parseInt(+new Date())) / 1000) : oldTime
// 计时
const countdown = () => {
  Cookies.set('change-account-code', parseInt(+new Date()) + time * 1000, { expires: new Date(parseInt(+new Date()) + time * 1000) })
  state.verifyCode.word = time + 's后获取'
  state.verifyCode.isDisabled = true
  sendTimer = setInterval(function () {
    time--
    state.verifyCode.word = time + 's后获取'
    Cookies.set('change-account-code', parseInt(+new Date()) + time * 1000)
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
  const data = { ...state.form }
  state.btnLoading = true
  userChange(data)
    .then((response) => {
      showToast('绑定成功')
      store.dispatch('user/logout')
    })
    .finally(() => {
      state.btnLoading = false
    })
};
</script>

<style lang="scss" scoped>
.affirm-phone {
  margin-top: 8px;
}

.list {
  display: flex;
  align-items: center;
  height: 64px !important;
  background-color: var(--root-bg-color2);
  color: var(--root-text-color1);
  box-shadow: inset 0px 1px 0px 0px var(--root-bg-color2);

  :deep(input) {
    color: var(--root-text-color1);
  }

  :deep(.van-field__error-message) {
    position: absolute;
    bottom: -24px;
    left: 30px;
  }
}

.phone {
  border-bottom: 1px solid var(--root-dividing-color1);
  :deep(.van-field__body) {
    padding-left: 36px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background-image: url('@/assets/images/setting/set_input_icon_phone@2x.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
    }
  }
}

.field-code {
  :deep(.van-field__body) {
    padding-left: 36px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
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

  :deep(.get-code) {
    color: var(--root-theme-color);

    &.get-code-disabled {
      color: var(--root-text-color2);
    }
  }
}

.notice {
  color: var(--root-text-color3);
  font-size: 12px;
  margin-top: 10px;
  margin-left: 15px;
}

.submit-button {
  width: 343px;
  height: 44px;
  border-radius: 22px;
  margin: 24px auto 0;
  background: var(--root-theme-color);
  color: var(--root-text-color5);
  font-size: 18px;
}
.disable{
  background: #ccc;
}
</style>
