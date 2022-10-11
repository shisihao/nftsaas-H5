<template>
  <div class="message-section">
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
        <template v-if="state.list.length > 0">
          <div v-for="(item, index) in state.list" :key="index" >
            <div class="message-time">{{ item.created_at }}</div>
            <div class="message-list" @click="onClick(item)">
              <div class="message-list-head">
                <div class="message-list-head-l">
                  <svg-icon icon-class="xiaoxi" class-name="grid-icon"/>
                  系统公告
                </div>
                <div class="read-more">
                  查看详情<van-icon name="arrow" />
                </div>
              </div>
              <div class="message-list-main">
                <div class="message-list-title">{{ item.title }}</div>
                <div class="message-list-content" v-html="item.content"></div>
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
import { dataList } from '@/api/message'
import { useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/index'

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
  sessionStorage.setItem('message-data', JSON.stringify(item))
  router.push({ path: '/messageDetail' })
}
</script>

<style lang="scss" scoped>
.message-section {
  padding: 24px 22px;
  .message-time {
    width: fit-content;
    padding: 6px 20px;
    color: var(--root-text-color2);
    background-color: var(--root-bg-color2);
    font-size: 12px;
    border-radius: 18px;
    margin: auto;
  }
  .message-list {
    background-color: var(--root-bg-color2);
    padding: 12px 16px;
    border-radius: 12px;
    margin: 12px auto 18px auto;
    .message-list-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0 16px 0;
      border-bottom: 1px solid var(--root-dividing-color1);
      .message-list-head-l {
        display: flex;
        align-items: center;
        font-size: 15px;
        .grid-icon {
          font-size: 24px;
          color: var(--root-theme-color);
          margin-right: 8px;
        }
      }
      .read-more {
        color: var(--root-text-color3);
        font-size: 12px;
        i {
          margin-left: 4px;
        }
      }
    }
    .message-list-l {
      margin-top: -5px;
      margin-right: 4px;
      width: 32px;
      height: 32px;
    }

    .message-list-l img {
      width: 100%;
    }

    .message-list-main {
      .message-list-title {
        font-size: 16px;
        color: var(--root-text-color1);
        margin: 15px 0 10px 0;
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
    }

  }
}
</style>