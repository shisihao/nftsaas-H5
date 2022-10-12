<template>
  <div class="title-section">
    <div class="title">
      {{ item.name }}
    </div>
    <div class="label">
      <span v-for="(x, y) in item.tags" :key="y">
        {{ x?.name }}
      </span>
    </div>
    <div v-if="cnyPrice(item) >= 0 || interestPrice(item) >= 0" class="price">
      <em v-if="cnyPrice(item) > 0"><span>¥</span>{{ cnyPrice(item) }}</em>
      <em v-if="cnyPrice(item) > 0 && interestPrice(item) > 0"><span>+</span></em>
      <em v-if="interestPrice(item) > 0">{{ interestPrice(item) }}<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
      <em v-if="cnyPrice(item) == 0 && interestPrice(item) == 0">0.00<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
    </div>
    <div v-if="item.interest_rebate" class="interest-rebate">
      <b>¥{{ item.cny_price }}</b>
      <b v-if="item.integral_price > 0">+</b>
      <b v-if="item.integral_price > 0">{{ item.integral_price }}{{ paraphrase({ value: 'integral', options: integralOptions }) }}</b>
      <span v-if="item.interest_rebate?.rebate" class="discount">
        {{ item.interest_rebate?.rebate?.discount / 10 }}折
      </span>
      <span v-if="item.interest_rebate?.free_cny" class="zero">
        零元购
      </span>
      <span v-if="item.interest_rebate?.free_integral" class="integral">
        免{{ paraphrase({ value: 'integral', options: integralOptions }) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'

defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const cnyPrice = computed(() => {
  return (item) => {
    if (item.interest_rebate) {
      return parseFloat(item.interest_rebate.cny_price || 0).toFixed(2)
    } else {
      return parseFloat(item.cny_price || 0).toFixed(2)
    }
  }
})

const interestPrice = computed(() => {
  return (item) => {
    if (item.interest_rebate && item.interest_rebate.free_integral ) {
      return parseFloat(item.interest_rebate.integral_price || 0).toFixed(2)
    } else {
      return parseFloat(item.free_integral || 0).toFixed(2)
    }
  }
})

</script>

<style lang="scss" scoped>
  .title-section {
    background-color: var(--root-bg-color2);
    border-radius: 12px;
    padding: 15px 0;
    margin-top: 15px;
    .title {
      text-align: center;
      font-size: 22px;
      font-weight: 500;
    }
    .label {
      text-align: center;
      margin-top: 10px;
      span {
        display: inline-block;
        border-radius: 4px;
        font-size: 12px;
        color: var(--root-text-color3);
        border: 1px solid var(--root-text-color3);
        padding: 3px 8px;
        margin-right: 8px;
        margin-bottom: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .interest-rebate {
      text-align: center;
      margin-top: 8px;
      b {
        font-weight: normal;
        text-decoration: line-through;
        color: var(--root-text-color3);
      }
      span {
        display: inline-block;
        border-radius: 4px;
        font-size: 12px;
        color: var(--root-text-color3);
        border: 1px solid var(--root-text-color3);
        padding: 3px 8px;
        margin-left: 8px;
        margin-bottom: 6px;
        &.discount {
          color: var(--root-auxiliary-color1);
          border-color: var(--root-auxiliary-color1);
        }
        &.zero {
          color: var(--root-theme-color);
          border-color: var(--root-theme-color);
        }
      }
    }
    .price {
      text-align: center;
      margin-top: 8px;
      font-size: 18px;
      color: var(--root-auxiliary-color1);
      em {
        font-style: normal;
      }
    }
  }
</style>