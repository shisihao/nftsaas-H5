<template>
  <div class="synthesis-record">
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model:loading="state.loading" :finished="state.finished" @load="onLoad">
        <div class="record-list" v-for="(item, index) in list" :key="index">
          <record-describe :item="item"></record-describe>
          <div class="divider"></div>
          <records-list :item="item.formulas"></records-list>
        </div>
      </van-list>
      <no-more />
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { recordList } from '@/api/synthesis'
import recordsList from './components/records-list.vue'
import recordDescribe from './components/record-describe.vue'
import NoMore from '@/components/NoMore/index.vue'
import { pages as commonPages } from '@/utils/explain'

const state = reactive({
  refreshing: false,
  loading: false,
  finished: false,
  list: [],
  pages: { ...commonPages },
});

// 获取列表数据
const onLoad = () => {
  recordList({ ...state.pages })
    .then((response) => {
      const { data, total } = response.data

      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      state.list.push(...data)
      state.pages.page++
      state.loading = false

      if (state.list.length >= total) {
        state.finished = true
      }
    })
}

const onRefresh = () => {
  state.loading = true
  state.finished = false
  state.pages.page = 1
  onLoad()
};

</script>

<style lang="scss" scoped>
.synthesis-record {
  padding: 19px 12px;

  .record-list {
    padding: 19px 12px;
    background-color: var(--root-bg-color2);
    border-radius: 8px;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

  }

  .divider {
    height: 1px;
    border-bottom: 1px solid var(--root-bg-color1);
  }


}
</style>