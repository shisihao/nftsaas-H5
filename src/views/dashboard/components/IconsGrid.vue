<template>
  <ul class="icons-wrapper">
    <li @click="$globleFun.onGoto('/message')">
      <van-badge :content="state.count > 0 ? state.count : ''" max="99" :offset="['-0.15rem', 0]">
        <div class="icon-img">
          <svg-icon icon-class="xiaoxi" class-name="grid-icon"/>
        </div>
      </van-badge>
      <p>
        最新公告
      </p>
    </li>
    <li @click="onActivity">
      <div class="icon-img">
        <svg-icon icon-class="yaoxin" class-name="grid-icon"/>
      </div>
      <p>
        邀新活动
      </p>
    </li>
    <li @click="$globleFun.onGoto('/help')">
      <div class="icon-img">
        <svg-icon icon-class="wenti" class-name="grid-icon"/>
      </div>
      <p>
        常见问题
      </p>
    </li>
  </ul>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/index'
import { getMsgCount } from '@/api/message'
import SvgIcon from '@/components/YuSvgIcon'

const router = useRouter()
const state = reactive({
  count: ''
})

getMsgCount()
  .then((response) => {
    state.count = response.data?.count || 0
  })

const onActivity = () => {
  const url = location.origin.replace(/:\/\/.*?\./,'://h5.')

  const iframeUrl = import.meta.env.VITE_USER_NODE_ENV === 'development' ? import.meta.env.VITE_ACTIVITY : `${url}/invite/detail`

  router.push({ path: '/blank-iframe', query: { src: iframeUrl }})
}

</script>

<style lang="scss" scoped>
.icons-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
  li {
    display: flex;
    align-items: center;
    flex-direction: column;
    :deep(.van-badge) {
      background-color: var(--root-auxiliary-color1);
    }
    .icon-img {
      width: 44px;
      height: 44px;
      background-color: rgba(var(--root-theme-color-rgb), 0.1);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .grid-icon {
        font-size: 24px;
        color: var(--root-theme-color);
      }
    }
    p {
      margin-top: 10px;
    }
  }
}
</style>
