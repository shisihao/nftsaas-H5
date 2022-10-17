<template>
  <div class="main-contain">
    <van-tabs v-model:active="active" sticky offset-top="1.2rem" @change="onChangeTab">
      <van-tab v-for="(item, index) in orderOptions" :key="index" :name="item.value" :title="item.label">
      </van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="order-wrapper">
          <order-item v-for="(x, y) in list" :key="y" :item="x" @sub-unit="onSubUnit" @timeFinish="onTimeFinish" />
        </div>
      </van-list>
    </van-pull-refresh>
    <cancel-order ref="cancelOrder" :order-no="state.order_no" @refresh-data="onChangeTab"/>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { dataList } from '@/api/order'
import { orderOptions, pages as commonPages } from '@/utils/explain'
import OrderItem from './components/OrderItem.vue'
import CancelOrder from '../components/order/CancelOrder.vue'

const active = ref('')
const pages = { ...commonPages }

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const cancelOrder = ref(null)

const state = reactive({
  order_no: ''
})

const onLoad = () => {
  if (!loading.value) return false
  dataList({ ...pages, status: active.value })
    .then((response) => {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }
      
      const { total, data } = response.data
      
      data.forEach(v => {
        list.value.push(v)
      })
      pages.page++
      loading.value = false

      if (list.value.length >= total) {
        finished.value = true
      }
    })
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  pages.page = 1
  list.value = []
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

const onChangeTab = () => {
  onRefresh()
}

const onSubUnit = (order_no) => {
  state.order_no = order_no
  cancelOrder.value.init()
}

const onTimeFinish = (id) => {
  if(active.value === 0) {
    list.value = list.value.filter(item =>{
      return item.id != id
    })
  } else {
    list.value = list.value.map(item =>{
      if(item.id == id) item.status = 3
      return item
    })
  }
}

</script>
<style lang="scss" scoped>
.main-contain {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  :deep(.van-tabs__nav) {
    background: none;
    background-color: var(--root-bg-color2);
    .van-tabs__line {
      background: var(--root-theme-color);
    }
    .van-tab {
      color: var(--root-text-color1);
    }
    .van-tab--active {
      color: var(--root-text-color1);
    }
  }
  .van-tabs {
    box-shadow: 0 5px 10px -5px 10px;
    :deep(.van-tabs__nav--line) {
      padding-bottom: 0;
    }
    :deep(.van-tabs__line) {
      bottom: 0;
    }
  }
  .order-wrapper {
    padding: var(--root-page-spacing) var(--root-page-spacing) 0 var(--root-page-spacing);
  }
}
</style>