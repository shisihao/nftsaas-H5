<template>
  <div>
    <div class="give-popup-contain">
      <van-popup v-model:show="state.show" round position="bottom" @closed="onClosed">
        <div class="title">
          转赠
        </div>
        <div class="subgift">
          <svg-icon icon-class="zhuanzeng" class-name="icon-zhuanzeng" />
        </div>
        <div class="content">
          <van-form ref="form" @submit="onSubmit">
            <van-field
              v-model="state.form.account"
              ref="account"
              name="account"
              autocomplete="off"
              label="请输入对方账号"
              placeholder="对方账号/钱包地址"
              clearable
              :rules="[{ required: true, message: '请填写对方账号/钱包地址' }]"
            />
          </van-form>
        </div>
        <div class="tips">
          <div class="tips-title">
            *温馨提示：
          </div>
          <div class="tips-content">
            {{ config?.give?.reminder }}
          </div>
        </div>
        <div class="button-row">
          <van-button class="btn btn-close" round @click="onClose">
            取消
          </van-button>
          <van-button class="btn btn-submit" round loading-text="请求中..." :loading="state.btnLoading" @click="onSubmitNext">
            下一步
          </van-button>
        </div>
      </van-popup>
    </div>
    <give-confirm ref="giveConfirm" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineExpose } from 'vue'
import store from '@/store/index'
import { DominKey, getToken } from '@/utils/auth'
import { integralOptions } from '@/utils/explain'
import { sleep } from '@/utils/index'
import { paraphrase } from '@/filters/index'
import { giveAccount } from '@/api/goods'
import SvgIcon from '@/components/YuSvgIcon'
import GiveConfirm from './GiveConfirm.vue'

const domin = getToken(DominKey)

const config = computed(() => store.state.user.config)

const giveConfirm = ref(null)
const form = ref(null)
const account = ref(null)

const getInitialData = () => ({
  show: false,
  btnLoading: false,
  item: {},
  form: {
    account: ''
  },
  rules: {
    account: [
      { required: true, message: '不能为空' }
    ]
  }
})

const state = reactive(getInitialData())

const init = (item) => {
  state.item = item
  state.show = true
}

defineExpose({ init })

const onClose = () => {
  state.show = false
}

const onClosed = () => {
  form.value.resetValidation()
  Object.assign(state, getInitialData())
}

const onSubmitNext = () => {
  form.value.submit()
}

const onSubmit = () => {
  account.value.blur()
  state.btnLoading = true
  sleep(600)
    .then(()=> {
      giveAccount(state.form)
        .then((response) => {
          giveConfirm.value.init({ name: response.data, account: state.form.account, interest_goods_id: state.item?.interest_goods_id, interest_goods_num: state.item?.interest_goods_num })
          onClose()
        })
        .finally(() => {
          state.btnLoading = false
        })
    })
}

</script>

<style lang="scss" scoped>
.give-popup-contain {
  :deep(.van-popup) {
    max-width: var(--root-max-width);
    right: 0;
    margin: 0 auto;
    padding-bottom: 20px;
    overflow: hidden;
    .title {
      font-size: 18px;
      font-weight: 500;
      background-color: var(--root-bg-color1);
      text-align: center;
      padding: 20px 0;
    }
    .subgift {
      width: 80px;
      height: 80px;
      margin: 22px auto 0;
      border-radius: 50%;
      background-color: rgba(var(--root-theme-color-rgb), 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-zhuanzeng {
        text-align: center;
        color: var(--root-theme-color);
        font-size: 48px;
      }
    }
    .content {
      font-size: 14px;
      line-height: 1.5;
      color: var(--root-text-color3);
      text-align: center;
      margin-top: 14px;
      padding: 0 var(--root-page-spacing);
      .van-cell {
        flex-direction: column;
        overflow: visible;
        padding: 0;
        .van-cell__title {
          width: 100%;
          font-size: 16px;
          font-weight: normal;
        }
        .van-cell__value {
          position: relative;
          .van-field__body {
            padding: 8px 12px;
            border: 1px solid var(--root-text-color3);
            border-radius: 22px;
          }
          .van-field__error-message {
            position: absolute;
            bottom: -24px;
          }
        }
      }
    }
    .tips {
      padding: 0 var(--root-page-spacing);
      font-size: 12px;
      color: var(--root-text-color2);
      margin-top: 22px;
      line-height: 1.3;
      .tips-content {
        white-space: pre-line;
      }
    }
    .button-row {
      margin-top: 22px;
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 16px;
        height: auto;
        width: 40%;
        padding: 10px 0;
      }
      .btn-close {
        color: var(--root-text-color5);
        border-radius: 44px;
        background-color: var(--root-button-color1);
      }
      .btn-submit {
        color: var(--root-text-color5);
        border-radius: 44px;
        background-color: var(--root-theme-color);
      }
    }
  }
}
</style>
