<template>
  <div class="help-section">
    <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
      <van-cell :border="false" class="help-cell" v-for="(item, index) in list" :key="index" :title="item.title" is-link @click="onRead(item)" />
    </van-pull-refresh>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { dataList } from '@/api/help'

const router = useRouter()
const list = ref([])
const loading = ref(false)

// 获取列表
const help = () => {
  dataList().then(res => {
    list.value = res.data
    loading.value = false
  })
}
help()
const onRefresh = () => {
  help()
};

const onRead = (item) => {
  sessionStorage.setItem('help-data', JSON.stringify(item))
  router.push({ path: '/helpDetail' })
}

</script>

<style lang="scss" scoped>
.help-section {
  padding: 8px 0;

  .help-cell {
    background-color: var(--root-bg-color2);
    font-size: 15px;
    color: var(--root-text-color1);
    height: auto;
    display: flex;
    align-items: center;
  }

  :deep(.van-cell__title) {
    @include textoverflow(2)
  }
}
</style>