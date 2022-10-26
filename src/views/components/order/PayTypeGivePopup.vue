<template>
  <div class="pay-type-section">
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      @closed="onClosed"
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
                <van-image v-if="item.value === 'integral'" class="icon-img" fit="cover" :src="`${domin}${item.icon}` "/>
                <svg-icon v-else :icon-class="item.icon" class-name="icon-type"/>
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
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { showToast, showLoadingToast } from 'vant'
import store from '@/store/index'
import { payTypeOptions, integralOptions } from '@/utils/explain'
import globleFun from '@/utils/link'
import { DominKey, getToken, sandQuickUrl } from '@/utils/auth'
import { parseParam } from '@/utils/index'
import { payGoodBox } from '@/api/common'

const domin = getToken(DominKey)

const show = ref(false)

const config = computed(() => store.state.user.config)
let info = computed(() => store.state.user.info)

const props = defineProps({
  orderNo: {
    type: String,
    default: ''
  }
})

let payOptions = computed(() => {
  return (options) => {
    let op = options.filter(v => {
      return config.value?.pay_switch[v.value] === 'on'
    })
    return op
  }
})

const getInitialData = () => ({
  form: {
    pay_type: '',
    order_no: ''
  },
  btnLoading: false
})

const state = reactive(getInitialData())

const init = () => {
  show.value = true
}

defineExpose({ init })

const onClosed = () => {
  Object.assign(state, getInitialData())
}

const postPay = () => {
  state.btnLoading = true
  payGoodBox(state.form)
    .then((response) => {
      if (state.form.pay_type === 'alipay') {
        location.href = response.data.alipay
      } else if (state.form.pay_type === 'bank') {
        const data = response.data.bank
        location.href = `${sandQuickUrl}${parseParam(data)}`
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
      
      .title {
        font-size: 18px;
        text-align: center;
        padding: 21px 0;
        border-bottom: 1px solid var(--root-dividing-color1);
      }
      .pay-item {
        padding-bottom: 30px;
        .icon-img {
          width: 40px;
          height: 40px;
          vertical-align: middle;
          margin-right: 10px;
        }
        .icon-type {
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
        color: var(--root-text-color5);
        background: var(--root-theme-color);
      }
    }
  }
}
</style>