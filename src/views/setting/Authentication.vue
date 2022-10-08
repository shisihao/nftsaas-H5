<template>
  <div class="main-contain">
    <div class="describe">
      <span>
        当前账号未实名认证
      </span>
      <p>
        *请确认手机号码与实名信息匹配
      </p>
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="state.form.name"
            autocomplete="off"
            name="name"
            label="姓名"
            placeholder="请输入您的真实姓名"
            input-align="right"
            clearable
            :rules="[{ required: true, message: '请输入您的真实姓名' }]"
          />
          <van-field
            class="field-number"
            v-model="state.form.number"
            autocomplete="off"
            name="number"
            label="证件号码"
            placeholder="请输入待认证的证件号码"
            input-align="right"
            clearable
            :rules="[{ required: true, message: '请输入待认证的证件号码' }]"
          />
          <div class="account">
            <span>
              当前帐号
            </span>
            <p>
              {{ info && mosaicTel(info.phone) }}
            </p>
          </div>
          <van-field
            v-model="state.form.code"
            class="field-code"
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
          <agreement v-model:checkedValue="state.checked" class="agreement" />
        </div>
      </van-form>
    </div>
    
  </div>
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import Cookies from 'js-cookie'
import { certifyInfo } from '@/api/certification'
import { paraphrase, mosaicTel } from '@/filters/index'
import store from '@/store/index'
import { showToast } from 'vant'
import { verificationCode } from '@/api/common'
import Agreement from '../login/components/Agreement.vue'
import settings from '@/settings'

let info = computed(() => store.state.user.info)

const validatorCode = (value, rule) => {
  if (value.length !== 6) return false
  return true
}

const state = reactive({
  form: {
    metaInfo: JSON.stringify(getMetaInfo()),
    number: '',
    name: '',
    code: ''
  },
  verifyCode: {
    isDisabled: false,
    word: '获取验证码',
    scene: 'identification',
    token: ''
  },
  status: 0,
  btnLoading: false,
  checked: false,
  rules: {
    code: [
      { required: true, message: '不能为空' },
      { validator: validatorCode, message: '验证码错误' }
    ]
  }
})

const statusOptions = [
  { label: '未认证', status: 0 },
  { label: '认证成功', status: 1 },
  { label: '认证失败', status: 2 },
]

// 发送验证码
let codeTime = parseInt(Cookies.get('authentication-code') || 0)
const oldTime = 60
let sendTimer
let time = (codeTime - parseInt(+new Date())) > 0 ? parseInt((codeTime - parseInt(+new Date())) / 1000) : oldTime
// 计时
const countdown = () => {
  Cookies.set('authentication-code', parseInt(+new Date()) + time * 1000, { expires: new Date(parseInt(+new Date()) + time * 1000) })
  state.verifyCode.word = time + 's后获取'
  state.verifyCode.isDisabled = true
  sendTimer = setInterval(function () {
    time--
    state.verifyCode.word = time + 's后获取'
    Cookies.set('authentication-code', parseInt(+new Date()) + time * 1000)
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
  const data = { ...state.verifyCode, account: info.value?.phone }
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
  if (!state.checked) {
    return showToast(`请阅读并同意《${settings.title}用户协议》和《${settings.title}隐私协议》`)
  }
  state.btnLoading = true
  certifyInfo(state.form)
    .then((response) => {
      location.href = response.data.result.certifyUrl
    })
    .finally(() => {
      state.btnLoading = false
    })
}


</script>

<style lang="scss" scoped>
.main-contain {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  .describe {
    padding: 30px var(--root-page-spacing) 0 var(--root-page-spacing);
    span {
      display: block;
      font-size: 24px;
    }
    p {
      margin-top: 10px;
      color: var(--root-auxiliary-color1);
      font-size: 12px;
    }
  }
  .form {
    margin-top: 20px;
    .van-cell-group {
      margin-top: 30px;
      background-color: var(--root-bg-color2);
      &:after {
        border-color: var(--root-dividing-color1);
      }
      .van-cell {
        color: var(--root-text-color1);
        padding: var(--root-page-spacing);
        &:after {
          border-color: var(--root-dividing-color1);
        }
        :deep(.van-field__label) {
            color: var(--root-text-color1);

        }
        :deep(.van-cell__value) {
          color: var(--root-text-color1);
          input {
            color: var(--root-text-color1);
          }
        }
      }
      .field-number {
        &:after {
          border: none;
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
      .account {
        background: var(--root-bg-color1);
        padding: 30px var(--root-page-spacing) 10px var(--root-page-spacing);
        span {
          font-size: 12px;
          color: var(--root-text-color2);
        }
        p{
          margin-top: 10px;
          font-size: 18px;
        }
      }
    }
    .account-row {
      padding: 0 var(--root-page-spacing);
      .submit-button {
        margin-top: 50px;
        background-image: var(--root-button-color1);
      }
      .agreement {
        margin-top: 20px;
      }
    }
  }
}
</style>