<template>
  <div class="section dashboard-section">
    <van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh">
      <logo-title />
      <swipe-slide />
      <icons-grid />
      <navigation-title class="navigation-hot" title="热卖藏品" position="center" />
      <collection-list ref="collectionList" />
      <attestation-button v-if="info && info.cer_status === -1" />
      <no-more />
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import LogoTitle from './components/LogoTitle.vue'
import SwipeSlide from './components/SwipeSlide.vue'
import IconsGrid from './components/IconsGrid.vue'
import CollectionList from './components/CollectionList.vue'
import AttestationButton from './components/AttestationButton.vue'
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import NoMore from '@/components/NoMore/index.vue'
import store from '@/store/index'

let info = computed(() => store.state.user.info)
const collectionList = ref(null)

const loading = ref(false)

const onRefresh = () => {
  const getDataList = async () => await collectionList.value?.getDataList()
    getDataList()
      .finally(() => {
        loading.value = false
      })
}


</script>

<style lang="scss" scoped>
.dashboard-section {
  padding-top: 0.1px;
  .navigation-hot {
    margin-top: 32px;
  }
}
</style>
