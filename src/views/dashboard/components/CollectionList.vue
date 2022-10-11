<template>
  <div class="collection-wrapper">
    <div class="collection-item" v-for="(item, index) in state.list" :key="index" @click="$globleFun.onGoto(`${item.target_type === 'goods' ? '/good-details' : '/box-details'}?id=${item.id}`)">
      <div class="collection-img">
        <van-image
          lazy-load
          fit="cover"
          :src="Array.isArray(item.images) && `${domin}${item.images[0]}` "
        />
        <img v-if="item.target_type === 'box'" class="box-sign" src="@/assets/images/public/common_icon_biaoqian.png" alt="">
        <div class="sales-status" :class="paraphrase({ value: salesStatus(item).tipType, options: salesOptions, l: 'class' })">
          <div v-if="salesStatus(item).tipType === 1">{{ item.start_time }} 开售</div>
          <div v-if="salesStatus(item).tipType === 2" class="sales-start"><van-icon name="clock-o" /><span>即将开售</span><van-count-down :time="salesStatus(item).timeDown" @finish="onFinish(index)" /></div>
          <div v-if="salesStatus(item).tipType === 3">售卖中</div>
          <div v-if="salesStatus(item).tipType === 4">期待下次销售</div>
          <div v-if="salesStatus(item).tipType === 5">已售罄</div>
        </div>
      </div>
      <div class="collection-info">
        <div class="collection-title">
          {{ item.name }}
        </div>
        <div class="collection-label">
          <span v-for="(x, y) in item.tags" :key="y">
            {{ x.name }}
          </span>
        </div>
        <div class="collection-gather">
          <div class="circulation">
            <b>发行</b>
            <span>{{ item.total_stock }}份</span>
          </div>
          <div v-if="parseFloat(item.cny_price) >= 0 || parseFloat(item.integral_price) >= 0" class="price">
            <em v-if="parseFloat(item.cny_price || 0) > 0"><span>¥</span>{{ item.cny_price }}</em>
            <em v-if="parseFloat(item.cny_price || 0) > 0 && parseFloat(item.integral_price || 0) > 0"><span>+</span></em>
            <em v-if="parseFloat(item.integral_price || 0) > 0">{{ item.integral_price }}<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
            <em v-if="parseFloat(item.cny_price || 0) === 0 && parseFloat(item.integral_price || 0) === 0">0.00<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { DominKey, getToken } from '@/utils/auth'
import { dataList } from '@/api/goods'
import { parseDate } from '@/utils/index'
import { salesOptions, integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import moment from 'moment'

const domin = getToken(DominKey)

const state = reactive({
  list: []
})

const salesStatus = computed(() => {
  return (item) => {
    let data = item.is_more ? item.more : item
    let startTime = +new Date(parseDate(data.start_time))
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
    // 售卖中
    if (startTime <= currentTime && data.stock > 0) {
      return {
        ...data,
        tipType: 3
      }
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
    return {
      ...data,
      tipType: 0
    }
  }
})

const getDataList = () => {
  dataList({ type: 'is_hot' })
    .then((response) => {
      state.list = response.data
    })
}

getDataList()

defineExpose({ getDataList })

const onFinish = (index) => {
  state.list[index].updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
}

</script>

<style lang="scss" scoped>
.collection-wrapper {
  padding: 0 var(--root-page-spacing) var(--root-page-spacing) var(--root-page-spacing);
  .collection-item {
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--root-bg-color2);
    margin-top: 20px;
    .collection-img {
      padding-bottom: 100%;
      position: relative;
      .van-image {
        position: absolute;
        border-radius: 12px;
        overflow: hidden;
      }
      .box-sign {
        width: 60px;
        height: 60px;
        position: absolute;
        left: 10px;
        top: 10px;
      }
      .sales-status {
        position: absolute;
        left: 10px;
        bottom: 10px;
        padding: 4px 10px;
        font-size: 13px;
        border-radius: 12px;
      }
      .sales-default {
        color: var(--root-auxiliary-color1);
        background-color: rgba(0, 0, 0, 0.7);
      }
      .sales-primary {
        color: var(--root-auxiliary-color1);
        background-color: rgba(0, 0, 0, 0.7);
        .sales-start {
          display: flex;
          align-items: center;
          span {
            margin: 0 2px;
          }
          .van-count-down {
            color: #fff;
          }
        }
      }
      .sales-warning {
        color: var(--root-text-color5);
        background-color: var( --root-auxiliary-color1);
      }
      .sales-info {
        color: var(--root-text-color3);
        background-color: rgba(0, 0, 0, 0.7);
      }
    }
    .collection-info {
      padding: 0 var(--root-page-spacing) var(--root-page-spacing) var(--root-page-spacing);
      .collection-title {
        margin-top: 20px;
        font-size: 18px;
      }
      .collection-label {
        margin-top: 12px;
        span {
          display: inline-block;
          border-radius: 4px;
          font-size: 12px;
          color: var(--root-text-color3);
          border: 1px solid var(--root-text-color3);
          padding: 1px 10px;
          margin-right: 10px;
          margin-bottom: 6px;
        }
      }
      .collection-gather {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .circulation {
          border: 1px solid var(--root-theme-color);
          font-size: 12px;
          border-radius: 4px;
          display: flex;
          flex-shrink: 0;
          b {
            font-weight: normal;
            color: var(--root-text-color5);
            padding: 2px 6px;
            background-color: var(--root-theme-color);
          }
          span {
            padding: 2px 6px;
            color: var(--root-theme-color);
          }
        }
        .price {
          color: var(--root-auxiliary-color1);
          font-size: 18px;
          em {
            font-style: normal;
          }
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
