<template>
  <div class="main-contain" :class="{ 'bg-await': [0, 1].includes(state.data.status), 'bg-success': state.data.status === 2, 'bg-cancel': state.data.status === 3 }">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="contain">
        <div class="content">
          <div class="status-box">
            <div class="status">
              <van-icon :name="paraphrase({ value: state.data.status, options: orderOptions, v: 'value', l: 'icon' })" />
              {{ parseInt(state.data.status) >= 0 ? paraphrase({ value: state.data.status, options: orderOptions }) : '' }}
            </div>
            <div v-if="state.data.status === 0" class="time">
              <span>支付剩余时间</span><van-count-down millisecond :time="(state.data.close_seconds || 0) * 1000" format="mm:ss" @finish="onFinish" />
            </div>
          </div>
          <div class="card">
            <div class="good-box">
              <div class="img-box">
                <van-image fit="cover" :src="state.data?.images.length > 0 ? domin + state.data.images[0] : ''" />
              </div>
              <div class="good-info">
                <div class="good-title">
                  {{ state.data.name }}
                </div>
                <div class="author">
                  <div class="author-box">
                    <van-image round fit="cover" :src="state.data.author_avatar && domin + state.data.author_avatar" />
                  </div>
                  <div class="author-name">
                    {{ state.data.author }}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="good-item">
                <div class="label">
                  商品金额
                </div>
                <div v-if="parseFloat(state.data.cny_price) >= 0 || parseFloat(state.data.integral_price) >= 0" class="price">
                  <em v-if="parseFloat(state.data.cny_price || 0) > 0"><span>¥</span>{{ state.data.cny_price }}</em>
                  <em v-if="parseFloat(state.data.cny_price || 0) > 0 && parseFloat(state.data.integral_price || 0) > 0"><span>+</span></em>
                  <em v-if="parseFloat(state.data.integral_price || 0) > 0">{{ state.data.integral_price }}<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
                  <em v-if="parseFloat(state.data.cny_price || 0) === 0 && parseFloat(state.data.integral_price || 0) === 0">0.00<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
                </div>
              </div>
              <div class="good-item">
                <div class="label">
                  数量
                </div>
                <div class="num">
                  x<span>1</span>
                </div>
              </div>
              <div class="good-item">
                <div class="label">
                  合计
                </div>
                <div v-if="parseFloat(state.data.cny_price) >= 0 || parseFloat(state.data.integral_price) >= 0" class="price last-price">
                  <em v-if="parseFloat(state.data.cny_price || 0) > 0"><span>¥</span>{{ state.data.cny_price }}</em>
                  <em v-if="parseFloat(state.data.cny_price || 0) > 0 && parseFloat(state.data.integral_price || 0) > 0"><span>+</span></em>
                  <em v-if="parseFloat(state.data.integral_price || 0) > 0">{{ state.data.integral_price }}<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
                  <em v-if="parseFloat(state.data.cny_price || 0) === 0 && parseFloat(state.data.integral_price || 0) === 0">0.00<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
                </div>
              </div>
            </div>
          </div>
          <div class="card order-info">
            <div class="order-list">
              <div class="order-item" @click="onClipboard(state.data.order_no)">
                <div class="order-label">
                  订单编号：
                </div>
                <div class="order-value copy-value" @click="onClipboard(state.data.order_no)">
                  {{ state.data.order_no }}
                </div>
              </div>
              <div class="order-item">
                <div class="order-label">
                  下单时间：
                </div>
                <div class="order-value">
                  {{ state.data.created_at }}
                </div>
              </div>
              <div class="order-item">
                <div class="order-label">
                  {{ state.data.status === 3 ? '取消' : '支付' }}时间：
                </div>
                <div class="order-value">
                  <span v-if="state.data.status === 0">待支付</span>
                  <span v-if="state.data.status === 1">------</span>
                  <span v-if="state.data.status === 2">{{ state.data.pay_time }}</span>
                  <span v-if="state.data.status === 3">{{ state.data.close_time }}</span>
                </div>
              </div>
            </div>
            <div class="chain" :class="`${ state.data.status === 2 ? 'chain-after' : '' }`" @click="onClipboard(state.data.hash)">
              <div>
                链上HASH：
              </div>
              <div class="chain-value">
                {{ state.data.status === 2 ? state.data.hash : '------' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <van-action-bar v-if="state.data.status === 0" placeholder class="ordering-footer">
      <div class="btn cancel" @click="onCancel(state.data)">
        取消订单
      </div>
      <div class="btn pay" @click="onPostOrder(state.data)">
        去支付
      </div>
    </van-action-bar>

    <pay-type-popup ref="payTypePopup" :order-no="state.order_no" :cny-price="parseFloat(state.data.cny_price)" :integral-price="parseFloat(state.data.integral_price)" />

    <cancel-order ref="cancelOrder" :order-no="state.order_no" @refresh-data="onFinish()" />
  </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getToken, DominKey } from '@/utils/auth'
import { orderDetail } from '@/api/order'
import { paraphrase } from '@/filters/index'
import { orderOptions, integralOptions } from '@/utils/explain'
import PayTypePopup from '../components/order/PayTypePopup.vue'
import CancelOrder from '../components/order/CancelOrder.vue'
import to from 'await-to-js'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()
const route = useRoute()
const router = useRouter()
const domin = getToken(DominKey)

const cancelOrder = ref(null)
const payTypePopup = ref(null)
const loading = ref(false)


const state = reactive({
  order_no: '',
  cancelOrderShow: false,
  data: {
    images: [],
    status: ''
  }
})

const turnNum = computed(() => {
  return (val) => {
    return parseFloat(val || 0)
  }
})

const getOrderDetail = () => {
  orderDetail({ order_no: state.order_no })
    .then(response => {
        state.data = { ...response.data, ...response.data.goods }
        loading.value = false
      })
      .catch(() => {})
}

if (route.query.order_no) {
  state.order_no = route.query.order_no
  getOrderDetail()
} else {
  showToast('获取详情失败')
  router.back(-1)
}

const onClipboard = async (value) => {
  let err, clipboard
  [err, clipboard] = await to(toClipboard(String(value)))
  if (err) return showToast('复制失败')
  showToast('复制成功')
}

const onFinish = () => {
  getOrderDetail()
}

const onRefresh = () => {
  getOrderDetail()
}

const onCancel = (data) => {
  cancelOrder.value.init()
}

const onPostOrder = (data) => {
  payTypePopup.value.init()
}

</script>
<style lang="scss" scoped>
.main-contain {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  /* &.bg-await {
    background-image: url('~@/assets/mine/order_img_pindan_bg.png');
  }
  &.bg-success {
    background-image: url('~@/assets/mine/order_img_wancheng_bg.png');
  }
  &.bg-cancel {
    background-color: yellow;
  } */

  .van-tabs {
    box-shadow: 0 5px 10px -5px var(--root-text-color1);
  }
  .contain {
    position: relative;
    &::after {
      content: '';
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100px;
      background-color: var(--root-theme-color);
    }
    .content {
      padding: 15px;
      position: relative;
      z-index: 1;
      .status-box {
        padding: 15px 0;
        min-height: 54px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .status {
          font-size: 20px;
          font-weight: 500;
          color: var(--root-text-color5);
          .van-icon {
            font-size: 24px;
            vertical-align: top;
          }
        }
        .time {
          span {
            margin-right: 6px;
            color: var(--root-text-color5);
          }
          .van-count-down {
            display: inline-block;
            font-size: 14px;
            color: var(--root-text-color5);
          }
        }
      }
      .card {
        padding: 20px 12px;
        background-color: var(--root-bg-color2);
        border-radius: 8px;
        .good-box {
          display: flex;
          .img-box {
            flex-shrink: 0;
            width: 88px;
            height: 88px;
            border-radius: 8px;
            overflow: hidden;
          }
          .good-info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
            margin-left: 12px;
            .good-title {
              font-size: 16px;
              font-weight: 500;
              @include textoverflow(2);
            }
            .author {
              display: flex;
              align-items: center;
              .author-box {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
              }
              .author-name {
                margin-left: 10px;
                color: var( --root-text-color2);
                flex: 1;
                @include textoverflow(1);
              }
            }
          }
        }
        .good-item {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid var(--root-dividing-color1);
          &:first-child {
            margin-top: 10px;
          }
          &:last-child {
            border-bottom-width: 0;
            padding-bottom: 0;
          }
          .label {
            font-size: 15px;
          }
          .price {
            em {
              font-style: normal;
            }
            span {
              font-size: 18px;
              font-weight: 500;
            }
          }
          .num {
            span {
              font-size: 15px;
            }
          }
          .last-price {
            color: var(--root-auxiliary-color1);
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
      .order-info {
        margin-top: 16px;
        font-size: 15px;
        h5 {
          font-size: 15px;
          font-weight: normal;
        }
        .order-list {
          position: relative;
          &::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: var(--root-dividing-color1);
          }
          .order-item {
            display: flex;
            padding-bottom: 15px;
            .order-label {
              flex-shrink: 0;
            }
            .order-value {
              flex-grow: 1;
              word-break: break-word;
              overflow: hidden;
              box-sizing: border-box;
              text-align: right;
            }
            .copy-value {
              margin-right: 20px;
              &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                width: 16px;
                height: 16px;
                background: url('@/assets/images/setting/common_icon_cpoy@2x.png') no-repeat;
                background-size: contain;
                background-repeat: no-repeat;
              }
            }
          }
        }
        .chain {
          margin-top: 15px;
          font-size: 15px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &.chain-after::after {
            content: '';
            margin-left: 5px;
            width: 16px;
            height: 16px;
            background: url('@/assets/images/setting/common_icon_cpoy@2x.png') no-repeat;
            background-size: contain;
            background-repeat: no-repeat;
          }
          .chain-value {
            overflow-wrap: break-word;
            text-align: right;
            flex: 1;
          }
        }
      }
    }
  }
  .ordering-footer {
    :deep(.van-action-bar) {
      justify-content: flex-end;
      background: var(--root-bg-color2);
      max-width: var(--root-max-width);
      margin: 0 auto;
      z-index: 9;
      .btn {
        margin-right: 15px;
        border-radius: 14px;
        &.cancel {
          padding: 8px 10px;
          border: 1px solid var(--root-dividing-color1);
          color: var(--root-text-color2);
        }
        &.pay {
          padding: 8px 16px;
          background-color: var(--root-theme-color);
          color: var(--root-text-color5);
        }
      }
    }
  }
}
</style>