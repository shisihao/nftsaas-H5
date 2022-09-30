<template>
  <div>
    <div class="give-popup-contain">
      <van-popup v-model:show="state.show" @closed="onClose">
        <div class="title">
          转赠藏品
        </div>
        <div class="content">
          <van-form ref="form" @submit="onSubmit">
            <van-field
              v-model="state.form.account"
              ref="account"
              name="account"
              autocomplete="off"
              label="对方账户"
              placeholder="对方账号/钱包地址"
              clearable
              :rules="[{ required: true, message: '请填写对方账号/钱包地址' }]"
            />
          </van-form>
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
import { ref, reactive, defineExpose } from 'vue'
import store from '/@/store/index'
import { DominKey, getToken } from '/@/utils/auth'
import { integralOptions } from '/@/utils/explain'
import { sleep } from '/@/utils/index'
import { paraphrase } from '/@/filters/index'
import GiveConfirm from './GiveConfirm.vue'
import { giveAccount } from '/@/api/goods'

const domin = getToken(DominKey)

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
    width: 288px;
    border-radius: 12px;
    padding-bottom: 20px;
    overflow: visible;
    .title {
      font-size: 18px;
      color: var(--root-text-color1);
      text-align: center;
      margin-top: 24px;
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
          color: var(--root-text-color3);
          font-weight: normal;
        }
        .van-cell__value {
          position: relative;
          .van-field__body {
            padding: 8px 12px;
            border: 1px solid var(--root-text-color1);
            border-radius: 8px;
          }
          .van-field__error-message {
            position: absolute;
            bottom: -24px;
          }
        }
      }
    }
    .button-row {
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 16px;
        height: auto;
        padding: 8px 22px;
      }
      .btn-close {
        color: var(--root-text-color3);
        border-radius: 44px;
        background-color: rgba(75, 75, 89, 0.1);
      }
      .btn-submit {
        color: var(--root-bg-color1);
        border-radius: 44px;
        background-image: var(--root-button-color1);
      }
    }
  }
}
</style>
