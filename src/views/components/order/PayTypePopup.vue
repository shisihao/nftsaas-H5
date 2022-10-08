<template>
  <div class="pay-type-section">
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      @closed="onClose"
    >
      <div class="pay-type-wrapper">
        <div class="title">
          选择支付方式
        </div>
        <div class="pay-item">
          <van-radio-group v-model="state.form.pay_type">
            <van-cell-group>
              <van-cell clickable v-for="(item, index) in payOptions(payTypeOptions)" :key="index" @click="state.form.pay_type = item.value">
              <template #title>
                <svg-icon :icon-class="item.icon" class-name="type-icon"/>
                <span class="custom-title">
                  {{ item.label }}
                </span>
              </template>
                <template #right-icon>
                  <van-radio :name="item.value" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button class="submit-button" round loading-text="请求中..." :loading="state.btnLoading" @click="onPay">立即支付</van-button>
      </div>
    </van-popup>
    <pay-pass-popup ref="payPassPopup" />
    <pay-input-popup ref="payInputPopup" @pay-password="onPayPassword" />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { showToast, showLoadingToast } from 'vant'
import store from '@/store/index'
import { payTypeOptions, integralOptions } from '@/utils/explain'
import { orderPay, boxPlace } from '@/api/order'
import globleFun from '@/utils/link'
import SvgIcon from '@/components/YuSvgIcon'
import PayPassPopup from './PayPassPopup.vue'
import PayInputPopup from './PayInputPopup.vue'

const show = ref(false)
const payPassPopup = ref(null)
const payInputPopup = ref(null)

const config = computed(() => store.state.user.config)
let info = computed(() => store.state.user.info)

const props = defineProps({
  orderNo: {
    type: String,
    default: ''
  },
  cnyPrice: {
    type: Number,
    default: 0
  },
  integralPrice: {
    type: Number,
    default: 0
  }
})

let payOptions = computed(() => {
  return (options) => {
    let op = options.filter(v => {
      return config.value?.pay_switch[v.value] === 'on'
    })
    if (props.cnyPrice > 0) {
      return op
    } else {
      return integralOptions
    }
  }
})

const getInitialData = () => ({
  form: {
    pay_type: '',
    order_no: '',
    pay_password: ''
  },
  btnLoading: false
})

const state = reactive(getInitialData())

const init = () => {
  show.value = true
}

defineExpose({ init })

const onClose = () => {
  Object.assign(state, getInitialData())
}

const postPay = () => {
  state.btnLoading = true
  orderPay(state.form)
    .then((response) => {
      if (state.form.pay_type === 'alipay') {
        location.href = response.data.alipay
      } else {
        showLoadingToast({
          overlay: true,
          duration: 1500,
          message: '支付中...',
          onClose: () => {
            globleFun.onGoto('/order')
          }
        })
      }
    })
    .finally(() => {
      state.btnLoading = false
    })
}

const onPay = () => {
  if (!state.form.pay_type) {
    return showToast('请选择支付方式')
  }
  state.form.order_no = props.orderNo
  if (!state.form.order_no) {
    return showToast('订单号错误')
  }

  if(state.form.pay_type === 'integral') {
    if (!info.value.paypass_status) {
      return payPassPopup.value.init()
    } else {
      return payInputPopup.value.init()
    }
  }
  postPay()
}

const onPayPassword = (value) => {
  state.form.pay_password = value
  postPay()
}
</script>

<style lang="scss" scoped>
.pay-type-section {
  :deep(.van-popup) {
    max-width: var(--root-max-width);
    right: 0;
    margin: 0 auto;
    .pay-type-wrapper {
      padding: 0 var(--root-page-spacing);
      color: var(--root-text-color4);
      
      .title {
        font-size: 18px;
        text-align: center;
        padding: 21px 0;
        border-bottom: 1px solid var(--root-dividing-color1);
      }
      .pay-item {
        padding-bottom: 30px;
        .type-icon {
          font-size: 40px;
          vertical-align: middle;
          margin-right: 10px;
        }
        .van-cell-group {
          &::after {
            border-width: 0;
          }
          .van-cell {
            padding: 0;
            margin-top: 30px;
            font-size: 16px;
            &::after {
              border-width: 0;
            }
            .van-radio__icon--checked {
              .van-icon {
                background-color: var(--root-theme-color);
                border-color: var(--root-theme-color);
              }
            }
          }
        }
      }
      .submit-button {
        width: 100%;
        margin-bottom: 20px;
        font-size: 18px;
        color: var(--root-text-color1);
        background-image: var(--root-button-color1);
      }
    }
  }
}
</style>