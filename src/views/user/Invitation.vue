<template>
  <div class="main-contain">
    <navigation-title class="code-title" title="邀请码" position="center" font-size="16" />
    <div class="invitation">
      <div class="invitation-code" v-for="(item, index) in inviteCode" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="invitation-button">
      <van-button round @click="onCopy(`${config?.invite?.url_rule}${config?.invite?.url_rule ? '\n赶快下载：' : ''}${config?.invite?.invite_url}?c=${info && info.code}`)">复制邀请链接</van-button>
      <van-button round @click="onCopy(`${info && info.code}`)">复制邀请码</van-button>
    </div>
    <navigation-title class="code-title code-title-list" title="邀请记录" position="center" font-size="16" />
    <div class="invitation-wrapper">
      <van-tabs v-model:active="active" sticky offset-top="1.2rem" @change="onChangeTab">
        <van-tab v-for="(item, index) in tabsOptions" :key="index" :title="item.label" :name="item.value">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="business-card">
              <div class="business-item" v-for="(item, index) in list" :key="index">
                <div class="avatar-uploader">
                  <default-avatar v-if="item.avatar" :src="`${domin}${item.avatar}`" />
                  <default-avatar v-else />
                </div>
                <div class="user-info">
                  <div>
                    {{ item.name }}
                  </div>
                  <div>
                    {{ item.phone }}
                  </div>
                  <div>
                    {{ item.created_at }}
                  </div>
                </div>
                <div class="cer-status">
                  <span>{{ paraphrase({ value: item.cer_status, options: tabsOptions }) }}</span>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import store from '@/store/index'
import { getInvite } from '@/api/user'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import { pages as commonPages } from '@/utils/explain'
import useClipboard from 'vue-clipboard3'
import to from 'await-to-js'
import { showToast } from 'vant'
import { DominKey, getToken } from '@/utils/auth'
import { paraphrase } from '@/filters/index'

const domin = getToken(DominKey)

const { toClipboard } = useClipboard()

let pages = { ...commonPages }

const onCopy = async (value) => {
  let err, clipboard
  [ err, clipboard ] = await to(toClipboard(String(value)))
  if (err) return showToast('复制失败')
  showToast('复制成功')
}

let info = computed(() => store.state.user.info)

let inviteCode = computed(() => info.value && [ ...info.value.code ]) || []

const config = computed(() => store.state.user.config)

const tabsOptions = [
  { label: '全部', value: '' },
  { label: '未实名', value: 0 },
  { label: '已实名', value: 1 }
]

const active = ref('')
const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  if (!loading.value) return false
  getInvite({ status: active.value, ...pages })
    .then((response) => {
      const { data, total } = response.data
      data.forEach(v => {
        list.value.push(v)
      })
      pages.page++
      // 加载状态结束
      loading.value = false
      // 数据全部加载完成
      if (list.value.length >= total) {
        finished.value = true
      }
    })
}

const onChangeTab = () => {
  list.value = []
  pages.page = 1
  finished.value = false
  onLoad()
}
</script>

<style lang="scss" scoped>
  .main-contain {
    min-height: calc(100vh - 46px);
    background-color: var(--root-bg-color1);
    .code-title {
      padding-top: 40px;
    }
    .code-title-list {
      margin-bottom: 20px;
    }
    .invitation {
      margin-top: 24px;
      display: flex;
      justify-content: space-around;
      padding: 0 var(--root-page-spacing);
      .invitation-code {
        width: 48px;
        height: 48px;
        background-color: var(--root-bg-color2);
        border-radius: 4px;
        font-size: 24px;
        text-align: center;
        line-height: 48px;
      }
    }
    .invitation-button {
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
      .van-button {
        background-color: var(--root-theme-color);
        font-size: 18px;
        color: var(--root-text-color5);
        padding: 0 24px;
        &:first-child {
          background-color: rgba($color: #1275E4, $alpha: 0.1);
          color: var(--root-theme-color);
        }
      }
      
    }
    .invitation-wrapper {
      :deep(.van-tabs__nav) {
        background: none;
        background-color: var(--root-bg-color2);
        .van-tabs__line {
          background: var(--root-theme-color);
        }
        .van-tab {
          color: var(--root-text-color3);
        }
        .van-tab--active {
          color: var(--root-text-color1);
        }
      }
      .business-card {
        padding: 0 var(--root-page-spacing);
        .business-item {
          background: var(--root-bg-color2);
          border-radius: 12px;
          padding: 16px 0;
          margin-top: 10px;
          display: flex;
          .avatar-uploader {
            width: 44px;
            height: 44px;
            flex-shrink: 0;
            margin-left: 20px;
          }
          .user-info {
            flex: 1;
            overflow: hidden;
            margin-left: 10px;
            div:nth-child(1) {
              font-size: 16px;
              @include textoverflow()
            }
            div:nth-child(2), div:nth-child(3) {
              font-size: 12px;
              color: #61616E;
              margin-top: 4px;
            }
          }
          .cer-status {
            margin: 0 12px;
            span {
              display: block;
              padding: 2px 6px;
              background-color: #373750;
              border-radius: 4px;
              color: #A0A0B6;
              &.already {
                color: var(--root-theme-color);
              }
            }
          }
        }
      }
    }
  }
</style>
