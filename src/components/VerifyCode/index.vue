<template>
  <van-field
    v-model="state.form.code"
    :update:model-value="emits('update:modelValue', state.form.code)"
    type="digit"
    class="van-input-field van-input-code"
    autocomplete="off"
    maxlength="6"
    name="code"
    :label="label ? '验证码' : ''"
    placeholder="请输入验证码"
    clearable
    :rules="state.rules.code"
  >
    <template v-if="leftIcon" #left-icon>
      <!-- <van-icon class="input-icon" name="shield-o" /> -->
    </template>
    <template #button>
      <div :class="state.verifyCode.isDisabled && 'wordDisabled'" @click="onSendCode">
        {{ state.verifyCode.word }}
      </div>
    </template>
  </van-field>
</template>

<script setup>
import { reactive, onBeforeUnmount, computed } from 'vue'
import Cookies from 'js-cookie'
import store from '@/store/index'

const validatorCode = (value, rule) => {
  if (value.length !== 6) return false
  return true
}

const props = defineProps({
  captcha: {  // 是否开启滑块
    type: Boolean,
    default: false
  },
  scene: {  // 场景
    type: String,
    default: '',
    required: true
  },
  leftIcon: {  // 是否显示左边icon
    type: Boolean,
    default: false
  },
  label: {  // 是否显示label标题
    type: Boolean,
    default: false
  }
})

const config = computed(() => store.state.user.config)

const state = reactive({
  form: {
    code: ''
  },
  verifyCode: {
    slide: computed(() => config?.value?.cvm_config?.open === 'on' && props.captcha ? true : false),
    isDisabled: false,
    word: '获取验证码'
  },
  rules: {
    code: [
      { required: true, message: '不能为空' },
      { validator: validatorCode, message: '验证码错误' }
    ]
  }
})

// 是否开启滑块验证
const emits = defineEmits(['update:modelValue', 'verifyAccount', 'sendCode'])

const tc = () => {
  var options = {
    "needFeedBack": false
  }
  var appid = '193152420'
  var captcha = new TencentCaptcha(appid, function(res) {
      if (res.ret === 0) {
        var resObj = { ticket: res.ticket, randstr: res.randstr }
        emits('sendCode', resObj)
      }
    }, options)
    captcha.show()
}

// 发送验证码
let codeTime = parseInt(Cookies.get(`${props.scene}-code`) || 0)
const oldTime = 60
let sendTimer
let time = (codeTime - parseInt(+new Date())) > 0 ? parseInt((codeTime - parseInt(+new Date())) / 1000) : oldTime
// 计时
const countdown = () => {
  Cookies.set(`${props.scene}-code`, parseInt(+new Date()) + time * 1000, { expires: new Date(parseInt(+new Date()) + time * 1000) })
  state.verifyCode.word = time + 's后获取'
  state.verifyCode.isDisabled = true
  sendTimer = setInterval(function () {
    time--
    state.verifyCode.word = time + 's后获取'
    Cookies.set(`${props.scene}-code`, parseInt(+new Date()) + time * 1000)
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
  emits('verifyAccount')
}

const carry = () => {
  if (state.verifyCode.slide) {
    tc()
    return false
  }
  emits('sendCode')
}

// 销毁时
onBeforeUnmount(() => {
  clearInterval(sendTimer)
})

defineExpose({ countdown, carry })
</script>

<style lang="scss" scoped>
.van-cell.van-field {
  padding: 0;
  &::after {
    content: none;
  }
  :deep(.van-field__left-icon) {
    margin-left: 16px;
    margin-right: 0 !important;
    display: flex;
    align-items: center;
    .input-icon {
      width: 17px;
      vertical-align: sub;
    }
  }
  :deep(.van-field__value) {
    .van-field__error-message {
      bottom: -15px;
      left: 16px;
    }
    .van-field__body {
      .van-icon-clear {
        margin-right: calc(var(--van-padding-xs));
      }
      .van-field__button {
        color: var(--root-theme-color);
        .wordDisabled {
          color: var(--root-text-color3);
        }
      }
    }
  }
}
</style>
