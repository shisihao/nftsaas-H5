<template>
  <div class="paypass-section">
    <div class="contain">
      <!-- <app-header>
        {{ $route.meta.title }}
      </app-header> -->
      <div class="content">
        <div class="tel-code">
          <!-- 密码输入框 -->
          <van-password-input
            :value="state.form.password"
            :focused="state.showKeyboard"
            @focus="state.showKeyboard = true"
            :gutter="5"
          />
          <!-- 数字键盘 -->
          <van-number-keyboard
            v-model="state.form.password"
            maxlength="6"
            theme="custom"
            extra-key=""
            close-button-text="完成"
            :show="state.showKeyboard"
            @blur="state.showKeyboard = false"
          />
        </div>
        <div class="paypass-row">
          <div class="tips">
            *为保障您的资金安全，请输入6位数字组合的密码，建议避免生日、连续数字等
          </div>
          <van-button
            round
            block
            type="primary"
            class="submit-button"
            native-type="submit"
            loading-text="请求中..."
            :loading="state.btnLoading"
            @click="onSubmit()"
          >
            确定
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store/index'
import { showSuccessToast, showFailToast } from 'vant'
import { payPassword } from '@/api/user'
import md5 from 'js-md5'

const router = useRouter()
let params = router.currentRoute.value.params


const state = reactive({
  btnLoading: false,
  isDisabled: false,
  showKeyboard: false,
  form: {
    code: params.code || 111111,
    password: '',
  }
})

const onSubmit = () => {
  if (state.form.password.length !== 6 || isNaN(parseInt(state.form.password))) {
    return showFailToast('支付密码设置错误')
  }
  let data = { ...state.form }
  data.password = md5(data.password)

  state.btnLoading = true
  payPassword(data)
    .then(({ msg = '支付密码设置成功' }) => {
      showSuccessToast(msg)
      store.dispatch('user/getInfo')
      router.replace('/user')
    })
    .catch(() => {
      state.btnLoading = false
    })
}

</script>

<style lang="scss" scoped>
.paypass-section {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  overflow: hidden;
  .content {
    margin-top: 120px;
    .van-number-keyboard {
      color: #000;
    }
    .paypass-row {
      padding: 0 var(--root-page-spacing);
      .tips {
        margin-top: 24px;
        font-size: 12px;
        color: var(--root-text-color2);
        text-align: center;
        padding: 0 45px;
      }
      .submit-button {
        margin-top: 48px;
        background-image: var(--root-button-color1);
      }
    }
  }
}
</style>
