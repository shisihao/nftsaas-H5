<template>
  <div class="good-section">
    <van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh">
      <three-model :item="item" />
      <div class="good-details" :class="{ 'good-bottom': info?.cer_status === -1 }">
        <title-info :item="item" />
        <circulation-num :item="item" />
        <certification-info :row="{ address: item.address, hash: item.hash }" />
        <copyright-info :row="{ author: item.author, author_avatar: item.author_avatar, issuer: item.issuer }" />
        <good-describe title="藏品描述" :rich-text="item.detail" />
        <explain-info :word-text="item.desc" />
        <place-order :item="item" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ThreeModel from '@/components/ThreeModel/index.vue'
import TitleInfo from './components/TitleInfo.vue'
import CirculationNum from './components/CirculationNum.vue'
import CertificationInfo from '../components/good/CertificationInfo.vue'
import CopyrightInfo from '../components/good/CopyrightInfo.vue'
import GoodDescribe from '../components/good/GoodDescribe.vue'
import ExplainInfo from '../components/good/ExplainInfo.vue'
import PlaceOrder from '../components/good/PlaceOrder.vue'
import { goodsDetail } from '@/api/goods'
import store from '@/store/index'

let info = computed(() => store.state.user.info)

const router = useRouter()
let query = router.currentRoute.value.query

const item = ref({})
const onLoad = () => {
  if (query?.id) {
    goodsDetail({ goods_id: query?.id })
      .then((response) => {
        item.value = response.data
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    router.go(-1)
  }
}
onLoad()

const loading = ref(false)
const onRefresh = () => {
  onLoad()
}

</script>

<style lang="scss" scoped>
  .good-details {
    padding: 0 var(--root-page-spacing) calc(env(safe-area-inset-bottom) + var(--root-page-spacing)) var(--root-page-spacing);
    &.good-bottom {
      padding-bottom: calc(env(safe-area-inset-bottom) + var(--root-page-spacing) + 50px);
    }
    .card-section {
      margin-top: var(--root-page-spacing);
      background-color: var(--root-bg-color1);
      border-radius: 12px;
      padding: 24px 12px;
      :deep(.card-wrapper) {
        padding-top: 24px;
      }
    }
  }
</style>
