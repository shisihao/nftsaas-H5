<template>
  <div class="message-section">
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
        <div class="title">最新公告</div>
        <template v-if="state.list.length > 0">
          <div class="message-list" v-for="(item, index) in state.list" :key="index" @click="onClick(item)">
            <div class="message-list-l">
              <img :src="getImageUrl('setting/message_list_icon@2x.png')" alt="" />
            </div>
            <div class="message-list-r">
              <div class="message-list-title">{{ item.title }}</div>
              <!-- <div class="message-list-content" v-html="item.content"></div> -->
              <div class="time-wrap">
                <div>{{ item.created_at }}</div>
                <div>查看</div>
              </div>
            </div>
          </div>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { dataList } from '/@/api/message'
import { useRouter } from 'vue-router'
import { getImageUrl } from '/@/utils/index'

const router = useRouter()
const state = reactive({
  loading: false,
  list: [],
  refreshing: false,
  finished: false,
  total: 0,
  page: 1
})

// 获取消息列表
const onLoad = () => {
  dataList({ type: 'system', page: state.page }).then(res => {
    if (state.refreshing) {
      state.list = [];
      state.refreshing = false;
    }
    state.list.push(...res.data.data)
    state.total = res.data.total
    state.loading = false
    state.page++
    if (state.list.length >= state.total) {
      state.finished = true
    }
  })
};

const onRefresh = () => {
  state.page = 1
  state.finished = false;
  // 将 loading 设置为 true，表示处于加载状态
  state.loading = true;
  onLoad();
};
const onClick = (item) => {
  router.push({ path: '/messageDetail', query: { data: JSON.stringify(item) } })
}
</script>

<style lang="scss" scoped>
.message-section {
  padding: 24px 22px;

  .title {
    display: inline-block;
    padding: 0 5px;
    color: var(--root-text-color1);
    font-size: 22px;
    // background: url('/@/assets/images/setting/user_tag_bg@2x.png') no-repeat center right;
    background-size: contain;
    margin-bottom: 14px;
  }

  .message-list {
    display: flex;
    justify-content: space-between;
    background-color: var(--root-bg-color1);
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 12px;

    .message-list-l {
      margin-top: -5px;
      margin-right: 4px;
      width: 32px;
      height: 32px;
    }

    .message-list-l img {
      width: 100%;
    }

    .message-list-r {
      flex: 1;
      width: 0;
      .message-list-title {
        font-size: 16px;
        color: var(--root-text-color1);
        margin-bottom: 10px;
        word-wrap: break-word;
      }

      .message-list-content {
        @include textoverflow();
        margin-bottom: 16px;
        color: var(--root-text-color3);
        font-size: 12px;
        max-height: 14px;
        max-width: 240px;
        :deep(img), :deep(video) {
          max-width: 100%;
        }
      }

      .time-wrap {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--root-text-color3);
      }
    }

  }
}
</style>