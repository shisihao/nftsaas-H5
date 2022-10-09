<template>
  <div class="place-order-section">
    <van-action-bar placeholder>
      <div v-if="[-1, 0 ,2].includes(info?.cer_status)" class="attestation-wrapper">
        <div class="attestation-tip">
          请先实名认证
        </div>
        <van-button round size="small" @click="$globleFun.onGoto('/authentication')">去认证</van-button>
      </div>
      <buy-advance v-if="item?.interest_status && [1, 2].includes(salesStatus(item).tipType)" @equity-item="onEquityItem" />
      <van-action-bar-button 
        class="place-button"
        type="danger"
        :class="{ 
          'place-button-warning': [1, 2].includes(salesStatus(item).tipType),
          'place-button-primary': salesStatus(item).tipType === 3,
          'place-button-info': [4, 5, 6, 7].includes(salesStatus(item).tipType) 
        }"
        :loading="btnLoading"
        @click="onHandleOrder"
      >
        <div v-if="salesStatus(item).tipType === 1">{{ item.start_time }} 开售</div>  
        <div v-if="salesStatus(item).tipType === 2" class="sales-start"><van-icon name="clock-o" /><span>即将开售</span><van-count-down :time="salesStatus(item).timeDown" @finish="onFinish" /></div>
        <div v-if="[3, 6].includes(salesStatus(item).tipType)">立即购买</div>
        <div v-if="salesStatus(item).tipType === 4">期待下次销售</div>
        <div v-if="salesStatus(item).tipType === 5">已售罄</div>
        <div v-if="salesStatus(item).tipType === 7">暂无购买资格</div>
      </van-action-bar-button>
    </van-action-bar>
    <pay-type-popup ref="payTypePopup" :order-no="state.form.order_no" :cny-price="parseFloat(state.form.cny_price)" :integral-price="parseFloat(state.form.integral_price)" />
  </div>
</template>

<script setup>
import { computed, ref, reactive, provide } from 'vue'
import store from '@/store/index'
import moment from 'moment'
import { parseDate } from '@/utils/index'
import { orderPlace, boxPlace } from '@/api/order'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import PayTypePopup from '../order/PayTypePopup.vue'
import BuyAdvance from '../good/BuyAdvance.vue'

const router = useRouter()

let info = computed(() => store.state.user.info)
const payTypePopup = ref(null)
const btnLoading = ref(false)

const props = defineProps({
  wordText: {
    type: String,
    default: ''
  },
  item: {
    type: Object,
    default: () => {}
  }
})

const state = reactive({
  form: {
    cny_price: 0,
    integral_price: 0,
    order_no: ''
  }
})
// 避免藏品，盲盒详情页重复使用 provide
provide('item', computed(() => props.item))

const salesStatus = computed(() => {
  return (item) => {
    let data = item?.is_more ? item.more : item
    let startTime = +new Date(data.start_time && parseDate(data.start_time))
    let currentTime = +new Date()
    const fixedTime = 24 * 60 * 60 * 1000
    // 24小时以上
    if ((startTime - fixedTime) > currentTime) {
      return {
        ...data,
        tipType: 1
      }
    }
    // 24小时以内倒计时
    if (startTime > currentTime && (startTime - currentTime) < fixedTime) {
      return {
        ...data,
        tipType: 2,
        timeDown: startTime - currentTime
      }  // startTime - currentTime
    }
    // 期待下次销售
    if (item.is_more && !data.stock) {
      return {
        ...data,
        tipType: 4
      }
    }
    // 已售罄
    if (!data.stock) {
      return {
        ...data,
        tipType: 5
      }
    }

    // 未实名
    if (info.value?.cer_status === -1) {
      return {
        ...data,
        tipType: 6
      }
    }

    // 暂无购买资格
    if (!data.buy_status) {
      return {
        ...data,
        tipType: 7
      }
    }

    // 售卖中
    if (startTime <= currentTime && data.stock > 0 && info.value?.cer_status === 1) {
      return {
        ...data,
        tipType: 3
      }
    }

    return {
      ...data,
      tipType: 0
    }
  }
})

const onFinish = () => {
  props.item.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
}

const postApi = (value) => {
  let data = {}
  let api
  if (value) {
    data = { interest_goods_id: value.goods_id, interest_goods_num: value.goods_num }
  }
  if (props.item?.goods_list && Array.isArray(props.item?.goods_list)) {
    data.box_id = props.item.id
    api = boxPlace(data)
  } else {
    data.goods_id = props.item.id
    api = orderPlace(data)
  }
  
  api
    .then((response) => {
      if (response.code === 1008) {
        props.item.stock = 0
        return showToast(response.msg)
      }
      state.form = response.data
      payTypePopup.value.init()
    })
    .finally(() => {
      btnLoading.value = false
    })
}

const onHandleOrder = () => {

  if (salesStatus.value(props.item).tipType === 3) {
    if (btnLoading.value) return false
    btnLoading.value = true

    postApi()
  }
}

const onEquityItem = (value) => {
  postApi(value)
}

</script>

<style lang="scss" scoped>
.place-order-section {
  :deep(.van-action-bar) {
    max-width: var(--root-max-width);
    width: 100%;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    z-index: 999;
    background-color: var(--root-bg-color2);
    .place-button {
      margin: 0 var(--root-page-spacing);
      background: none;
      font-size: 16px;
      font-weight: 400;
      b {
        font-weight: normal;
        display: block;
        width: 100%;
        height: 100%;
      }
      .sales-start {
        display: flex;
        align-items: center;
        span {
          margin: 0 2px;
        }
        .van-count-down {
          font-size: 16px;
          color: var(--root-theme-color);
        }
      }
    }
    .place-button-info {
      color: var(--root-text-color5);
      background-color: var(--root-button-color1);
    }
    .place-button-warning {
      color: var(--root-theme-color);
      background-color: rgba(var(--root-theme-color-rgb), 0.1);
    }
    .place-button-primary {
      color: var(--root-text-color5);
      background-color: var(--root-theme-color);
    }
  }
  .attestation-wrapper {
    position: absolute;
    width: calc(100% - var(--root-page-spacing) * 2);
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--root-bg-color2);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 6px var(--root-page-spacing);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .attestation-tip {
      color: var(--root-auxiliary-color1);
    }
    .van-button {
      background: none;
      background-color: var(--root-theme-color);
      padding: 2px 20px;
      color: var(--root-text-color5);
    }
  }
}
  
</style>