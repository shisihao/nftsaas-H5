<template>
  <div class="synthesis-record">
    <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
      <div class="record-list" v-for="(item, index) in list" :key="index">
        <record-describe :item="item"></record-describe>
        <div class="divider"></div>
        <records-list :item="item.formulas"></records-list>
      </div>
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

const loading = ref(false);
const list = ref([]);

// 获取列表数据
const onRefresh = () => {
  recordList().then(res => {
    list.value = res.data;
    loading.value = false;
  });
};
onRefresh()

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
    border-bottom: 1px solid var(--root-bg-color2);
  }


}
</style>