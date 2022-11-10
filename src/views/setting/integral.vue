<template>
  <div class="integral-wrap">
    <van-pull-refresh
      v-model="state.refreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="integral-header">
          <div class="integral-num">
            {{ parseFloat(info?.balance || 0).toFixed(2) }}
          </div>
          <div class="integral-text">
            {{ paraphrase({ value: 'integral', options: integralOptions }) }}余额
          </div>
          <div class="integral-get" @click="onGetIntegral">
            领取{{ paraphrase({ value: 'integral', options: integralOptions }) }}
          </div>
        </div>
        <div class="integral-cotent-wrap">
          <van-tabs v-model:active="state.active" shrink @change="onTabChange">
            <van-tab
              v-for="(item, index) in activeOptions"
              :key="index"
              :title="item.label"
              :name="item.value"
            ></van-tab>
          </van-tabs>
          <div class="integral-cotent">
            <div
              class="integral-list"
              v-for="item in state.list"
              :key="item.id"
            >
              <div class="list-header">
                <div class="list-header-l">{{ item.title }}</div>
                <div class="list-header-r">
                  {{ item?.action === 1 ? '+' : '-' }}
                  {{ parseFloat(item.amount).toFixed(2) }}
                </div>
              </div>
              <div class="list-datetime">
                时间<span>{{ item.created_at }}</span>
              </div>
              <div class="list-hash">
                <div class="text">
                  HASH<span>{{ item?.extend?.hash || '------' }}</span>
                </div>
                <div
                  v-if="item?.extend?.hash"
                  class="copy-btn"
                  @click="onCopy(item?.extend?.hash)"
                >
                  <svg-icon icon-class="copy" class-name="grid-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <integral-popup ref="integralPopup" @refresh="onRefresh" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { showToast } from 'vant'
import { useRoute } from 'vue-router'
import useClipboard from 'vue-clipboard3'
import store from '@/store/index'
import to from 'await-to-js'
import { pages, integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import { walletLogs } from '@/api/setting'
import IntegralPopup from './components/IntegralPopup.vue'

const route = useRoute()

let info = computed(() => store.state.user.info)
let integralPopup = ref(null)

const { toClipboard } = useClipboard()

const state = reactive({
  loading: false,
  refreshing: false,
  finished: false,

  active: '',
  list: [],
  pages: { ...pages }
})
const activeOptions = [
  { label: '全部', value: '' },
  { label: '收入', value: 'income' },
  { label: '支出', value: 'expend' }
]

// 获取消息列表
const onLoad = () => {
  if (!state.loading) return false
  walletLogs({ currency: 'integral', action: state.active, ...state.pages })
    .then((response) => {
      const { data, total } = response.data
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      state.list.push(...data)
      state.loading = false
      state.pages.page++
      if (state.list.length >= total) {
        state.finished = true
      }
    })
}

const onRefresh = () => {
  state.loading = true
  state.finished = false
  state.pages.page = 1
  store.dispatch('user/getInfo')
  onLoad()
}

const onCopy = async (value) => {
  let err, clipboard
  [err, clipboard] = await to(toClipboard(String(value)))
  if (err) return showToast('复制失败')
  showToast('复制成功')
}

const onTabChange = () => {
  state.list = []
  onRefresh()
}

const onGetIntegral = () => {
  integralPopup.value.init()
}
</script>

<style lang="scss" scoped>
.integral-wrap {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
}

.integral-header {
  height: 125px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  color: var(--root-text-color5);
  text-align: center;
  background-image: url('@/assets/images/user/equities_card_bg.png');
  background-repeat: no-repeat;
  background-size: 200% 100%;
  background-position: right center;
  background-color: var(--root-theme-color);

  .integral-num {
    margin-top: 24px;
    font-size: 25px;
  }

  .integral-text {
    margin: 3px;
    font-size: 12px;
  }
  .integral-get {
    margin: 10px auto 0;
    width: fit-content;
    padding: 7px 14px;
    border-radius: 16px;
    background-color: var(--root-bg-color2);
    color: var(--root-theme-color);
  }
}

:deep(.van-tabs__line) {
  background-color: var(--root-theme-color);
  width: 24px;
  bottom: 22px;
}

.integral-cotent {
  padding: var(--root-page-spacing);

  .integral-list {
    background-color: var(--root-bg-color2);
    padding: 10px 12px;
    border-radius: 12px;

    .list-header {
      display: flex;
      align-items: center;
      color: var(--root-text-color1);
      font-size: 16px;

      .list-header-l {
        flex: 1;
        width: 0;
        word-break: break-all;
      }

      .list-header-r {
        padding: 10px;
        flex-shrink: 0;
      }
    }

    .list-datetime,
    .list-hash {
      color: var(--root-text-color3);
      font-size: 12px;

      span {
        margin-left: 18px;
      }
    }

    .list-hash {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        flex: 3;
        display: flex;
        align-items: center;
        margin-right: 40px;
      }

      span {
        margin-left: 8px;
        @include textoverflow();
      }

      .copy-btn {
        width: 16px;
        height: 16px;
      }
    }
  }

  .integral-list:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>