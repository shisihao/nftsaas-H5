<template>
  <div class="main-contain">
    <van-tabs v-model:active="active" sticky shrink type="card" offset-top="1.2rem" @change="onChangeTab">
      <van-tab v-for="(item, index) in actionTransferOptions" :key="index" :name="item.value" :title="item.label"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <div class="transfer-wrapper">
          <div class="transfer-item" v-for="(x, y) in list" :key="y">
            <span class="transfer-tag" :class="'transfer-tag-' + x.target_type">{{ x.target_type =='goods'?'藏品':'盲盒' }}</span>
            <div class="title" :class="info.id === x.target_user_id ? 'title-income' : 'title-expend'">
              {{ info.id === x.target_user_id ? '收到' : '转出' }}
              <template v-if="x.target_type =='goods'">
                “{{ x?.user_goods?.goods?.name }}”
              </template>
              <template v-else>
                “{{ x?.user_box?.box?.name }}”
              </template>
            </div>
            <div class="user">
              <default-avatar v-if="x?.target_user?.avatar && `${domin}${x.target_user.avatar}`" /> 
              <default-avatar v-else />
              {{ x?.target_user?.name }}
            </div>
            <div class="info">
              <span>时间</span><b>{{ x.created_at }}</b>
            </div>
            <div class="info">
              <span>HASH</span>
              <b>
                {{ x.hash }}
                <svg-icon icon-class="copy" class-name="copy-icon" @click="onCopy(x.hash)" />
              </b>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { pages as commonPages, actionTransferOptions } from '@/utils/explain'
import { DominKey, getToken } from '@/utils/auth'
import { getGoodsTransfer } from '@/api/goods'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import store from '@/store/index'
import useClipboard from 'vue-clipboard3'
import to from 'await-to-js'
import { showToast } from 'vant'
import SvgIcon from '@/components/YuSvgIcon'

const active = ref('')
const pages = { ...commonPages }
const domin = getToken(DominKey)

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const cancelOrder = ref(null)

let info = computed(() => store.state.user.info)

const { toClipboard } = useClipboard()

const onLoad = () => {
  if (!loading.value) return false
  getGoodsTransfer({ ...pages, action: active.value })
    .then((response) => {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }
      
      let { total, data } = response.data
      
      data.forEach(v => {
        list.value.push(v)
      })
      pages.page++
      loading.value = false

      if (list.value.length >= total) {
        finished.value = true
      }
    })
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  pages.page = 1
  list.value = []
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

const onChangeTab = () => {
  onRefresh()
}

const onCopy = async (value) => {
  let err, clipboard
  [ err, clipboard ] = await to(toClipboard(String(value)))
  if (err) return showToast('复制失败')
  showToast('复制成功')
}
</script>

<style lang="scss" scoped>
.main-contain {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  :deep(.van-tabs__nav) {
    background: none;
    background-color: var(--root-bg-color2);
    border: none;
    .van-tabs__line {
      background: var(--root-text-color1);
    }
  }
  .van-tabs {
    box-shadow: 0 5px 10px -5px 10px;
    :deep(.van-tabs__nav--line) {
      padding-bottom: 0;
    }
    :deep(.van-tabs__line) {
      bottom: 0;
    }
  }
  :deep(.van-tabs__wrap) {
    background: var(--root-bg-color2);
    padding: 10px 0;
    .van-tab {
      color: var(--root-text-color1);
    }
    .van-tab--card {
      border: none;
      border-radius: 15px;
      padding: 0 20px;
    }
    .van-tab--active {
      color: var(--root-text-color5);
      background-color: var(--root-theme-color);
    }
  }
  .transfer-wrapper {
    padding: var(--root-page-spacing) var(--root-page-spacing) 0 var(--root-page-spacing);
    .transfer-item {
      background-color: var(--root-bg-color2);
      padding: 15px;
      border-radius: 12px;
      margin-bottom: 15px;
      .transfer-tag {
        font-size: 12px;
        padding: 3px 6px;
        border-radius: 4px;
        background-color: var(--root-theme-color);
        color: var(--root-text-color5);
      }
      .transfer-tag-box {
        background-color: var(--root-auxiliary-color1);
      }
      .title {
        font-size: 16px;
        font-weight: 500;
        // padding-left: 20px;
        margin-top: 10px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
        }
        // &.title-income {
        //   &::before {
        //     background-image: url('@/assets/images/public/examples_record_icon_received.png');
        //   }
        // }
        // &.title-expend {
        //   &::before {
        //     background-image: url('@/assets/images/public/examples_record_icon_giving.png');
        //   }
        // }
      }
      .user {
        margin-top: 8px;
        font-size: 12px;
        color: var(--root-text-color3);
        .van-image {
          width: 16px;
          height: 16px;
          vertical-align: sub;
        }
      }
      .info {
        display: flex;
        font-size: 12px;
        color: var(--root-text-color3);
        span {
          margin-top: 8px;
          min-width: 40px;
        }
        b {
          margin-top: 8px;
          font-weight: normal;
          position: relative;
          padding-right: 20px;
          @include textoverflow();
          .copy-icon {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
