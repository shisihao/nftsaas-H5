<template>
  <div class="good-section">
    <three-model :item="item?.goods" />
    <div class="good-details" :class="{ 'good-bottom': [1, 2, 3].includes(giveStatus(item, config).type) }">
      <title-info :item="item" />
      <certification-info
        :row="{ address: item?.goods?.address, hash: item?.goods?.hash, identifications: item?.identification }" />
      <copyright-info
        :row="{ author: item?.goods?.author, author_avatar: item?.goods?.author_avatar, issuer: item?.goods?.issuer, user: info?.name, avatar: info?.avatar }" />
      <good-describe title="藏品详情" :rich-text="item?.goods?.detail" />
      <explain-info :word-text="item?.goods?.desc" />
      <good-action-bar :item="item" :give-status="giveStatus(item, config)" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ThreeModel from '/@/components/ThreeModel/index.vue'
import TitleInfo from './components/TitleInfo.vue'
import CertificationInfo from '../components/good/CertificationInfo.vue'
import CopyrightInfo from '../components/good/CopyrightInfo.vue'
import GoodDescribe from '../components/good/GoodDescribe.vue'
import ExplainInfo from '../components/good/ExplainInfo.vue'
import GoodActionBar from './components/GoodActionBar.vue'
import { getMyGoodsDetail } from '/@/api/goods'
import store from '/@/store/index'

const router = useRouter()
let query = router.currentRoute.value.query

const item = ref({})
let info = computed(() => store.state.user.info)
let config = computed(() => store.state.user.config)

const giveStatus = computed(() => {
  return (item, config) => {
    if(!config || Object.keys(item).length === 0) {
      return {
        type: 0
      }
    } else if(config?.give?.switch === 'off') {   // 不可转
      return {
        type: 1,
        time: '*该藏品无法转赠'
      }
    } else if (item.goods?.give_status === 1) {  // 不可转
      return {
        type: 2,
        time: '*该藏品无法转赠'
      }
    } else if (item.give_status === 0) {    // 不可转
      return {
        type: 3,
        time: `*${item.curr_give_time} 可转赠`
      }
    } else {
      return {
        type: 4
      }
    }
  }
})

if (query?.id) {
  getMyGoodsDetail({ user_goods_id: query?.id })
    .then((response) => {
      response.data.goods = { ...response.data.goods, modelType: 'my' }
      item.value = response.data
    })
} else {
  router.go(-1)
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
