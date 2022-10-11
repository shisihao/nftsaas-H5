<template>
  <div class="integral-wrap">
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
        <div class="integral-header">
          <div class="integral-num">{{ info?.balance || 0 }}</div>
          <div class="integral-text">{{ paraphrase({ value: 'integral', options: integralOptions }) }}余额</div>
          <div class="integral-get" @click="onGetIntegral">领取{{ paraphrase({ value: 'integral', options: integralOptions })}}</div>
        </div>
        <div class="integral-cotent-wrap">
          <van-tabs v-model:active="active" shrink @change="onTabChange">
            <van-tab v-for="(item, index) in activeOptions" :key="index" :title="item.label" :name="item.value"></van-tab>
          </van-tabs>
          <div class="integral-cotent">
            <div class="integral-list" v-for="item in state.list" :key="item.id">
              <div class="list-header">
                <div class="list-header-l">{{ item.title }}</div>
                <div class="list-header-r">{{ item.action&&item.action===1 ? '+' : '-' }} {{ item.amount }}</div>
              </div>
              <div class="list-datetime">时间<span>{{ item.created_at }}</span></div>
              <div class="list-hash">
                <div class="text">HASH<span>{{ item.extend?.hash }}</span></div>
                <div class="copy-btn" @click="onCopy(item.extend?.hash)"></div>
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
import { useRoute } from "vue-router"
import { walletLogs } from '@/api/setting.js'
import useClipboard from 'vue-clipboard3'
import to from 'await-to-js'
import { showToast } from 'vant'
import { pages as commonPages, integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import store from '@/store/index'
import IntegralPopup from './components/IntegralPopup.vue'

const route = useRoute()
route.meta.title = document.title = `我的${paraphrase({ value: 'integral', options: integralOptions})}`

let info = computed(() => store.state.user.info)
let integralPopup = ref(null)

const { toClipboard } = useClipboard()
const active = ref(0)
const state = reactive({
  loading: false,
  list: [],
  refreshing: false,
  finished: false,
  total: 0
})
const pages = { ...commonPages }
const activeOptions = [
  { label: '全部', value: '' },
  { label: '收入', value: 'income' },
  { label: '支出', value: 'expend' }
]

// 获取消息列表
const onLoad = () => {

  walletLogs({ currency: 'integral', action: active.value, ...pages }).then(res => {
    if (state.refreshing) {
      state.refreshing = false;
    }
    state.list.push(...res.data.data)
    state.total = res.data.total
    state.loading = false
    pages.page++
    if (state.list.length >= state.total) {
      state.finished = true
    }
  })
}

const onRefresh = () => {
  state.refreshing = true
  pages.page = 1
  state.list = []
  state.finished = false
  // 将 loading 设置为 true，表示处于加载状态
  state.loading = true
  onLoad()
  store.dispatch('user/getInfo')
};

const onCopy = async (value) => {
  let err, clipboard
  [err, clipboard] = await to(toClipboard(String(value)))
  if (err) return showToast('复制失败')
  showToast('复制成功')
}

const onTabChange = (val) => {
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
    margin: 17px auto 8px;
    font-size: 25px;
  }

  .integral-text {
    font-size: 12px;
  }
  .integral-get {
    width: fit-content;
    padding: 8px 14px;
    border-radius: 16px;
    background: var(--root-text-color5);
    color: var(--root-theme-color) ;
    margin: 18px auto 0;
  }
}

:deep(.van-tabs__line) {
  background: var(--root-theme-color);
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
        justify-content: space-between;
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
        background: url('@/assets/images/setting/common_icon_cpoy@2x.png') no-repeat;
        background-size: contain;
      }
    }
  }

  .integral-list:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>