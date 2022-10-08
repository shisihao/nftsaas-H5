<template>
  <div class="order-item">
    <div class="order-header">
      <div class="order-no">
        {{ item?.created_at }}
      </div>
      <div class="order-status" :class="{ 'order-await': item.status === 1, 'order-success': item.status === 2, 'order-cancel': item.status === 3 }" >
        {{ paraphrase({ value: item.status, options: orderOptions }) }}
      </div>
    </div>
    <div class="order-content" @click="$globleFun.onGoto(`/ordering?order_no=${item.order_no}`)">
      <div class="img-box">
        <van-image fit="cover" :src="Array.isArray(item.goods.images) ? domin + item.goods.images[0] : ''" />
      </div>
      <div class="good-info">
        <div class="good-title">
          {{ item.goods.name }}
        </div>
        <div class="good-author-price">
          
        </div>
        <div class="author">
          <div class="author-box">
            <van-image round fit="cover" :src="item.goods.author_avatar ? domin + item.goods.author_avatar : ''" />
          </div>
          <div class="author-name">
            {{ item.goods.author }}
          </div>
        </div>
        <div v-if="parseFloat(item.cny_price) >= 0 || parseFloat(item.integral_price) >= 0" class="price">
          <em v-if="parseFloat(item.cny_price || 0) > 0"><span>¥</span>{{ item.cny_price }}</em>
          <em v-if="parseFloat(item.cny_price || 0) > 0 && parseFloat(item.integral_price || 0) > 0"><span>+</span></em>
          <em v-if="parseFloat(item.integral_price || 0) > 0">{{ item.integral_price }}<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
          <em v-if="parseFloat(item.cny_price || 0) === 0 && parseFloat(item.integral_price || 0) === 0">0.00<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
        </div>
      </div>
    </div>
    <div v-if="item.status === 0" class="order-footer">
      <div class="btn cancel" @click="onCancel(item.order_no)">
        取消订单
      </div>
      <div class="btn pay" @click="$globleFun.onGoto(`/ordering?order_no=${item.order_no}`)">
        去支付
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { getToken, DominKey } from '@/utils/auth'
import { orderOptions, integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import { orderClose } from '@/api/order'
import { showToast } from 'vant'

const domin = getToken(DominKey)

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['subUnit'])

const onCancel = (order_no) => {
  emit('subUnit', order_no)
}
</script>
<style lang="scss" scoped>
  .order-item {
    background-color: var(--root-bg-color1);
    border-radius: 8px;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      .order-no {
        color: var(--root-text-color2);
        word-break:break-all;
        @include textoverflow()
      }
      .order-status {
        flex-shrink: 0;
      }
      .order-await {
        color: var(--root-auxiliary-color);
      }
      .order-success {
        color: var(--root-text-color1);
      }
      .order-cancel {
        color: var(--root-text-color2);
      }
    }
    .order-content {
      padding: 0 15px 15px 15px;
      display: flex;
      .img-box {
        flex-shrink: 0;
        width: 88px;
        height: 88px;
        border-radius: 8px;
        overflow: hidden;
        .van-image {
          width: 100%;
          height: 100%;
        }
      }
      .good-info {
        margin-left: 24px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .good-title {
          font-size: 16px;
          font-weight: 500;
          @include textoverflow(1)
        }
        .author {
          display: flex;
          align-items: center;
          .author-box {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
          }
          .author-name {
            margin-left: 10px;
            color: var(--root-text-color2);
            font-size: 13px;
            @include textoverflow(1)
          }
        }
        .price {
          white-space:nowrap;
          color: var(--root-auxiliary-color);
          font-size: 15px;
          text-align: right;
          font-weight: 500;
          em {
            font-style: normal;
          }
        }
      }
    }
    .order-footer {
      border-top: 1px solid var(--root-dividing-color1);
      padding: 12px 0;
      display: flex;
      justify-content: flex-end;
      .btn {
        margin-left: 24px;
        border-radius: 28px;
        &.cancel {
          border: 1px solid var(--root-text-color1);
          padding: 8px 10px;
        }
        &.pay {
          padding: 8px 18px;
          background-image: var(--root-button-color1);
        }
      }
    }
  }
</style>