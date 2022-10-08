<template>
  <ul class="icons-wrapper">
    <li>
      <van-badge :content="state.count > 0 ? state.count : ''" max="99">
        <div class="icon-img" @click="$globleFun.onGoto('/message')">
          <img :src="getImageUrl('dashboard/home_icon_gonggao.png')" alt="">
        </div>
      </van-badge>
      <p>
        最新公告
      </p>
    </li>
    <li>
      <div class="icon-img" @click="onActivity">
        <img :src="getImageUrl('dashboard/home_icon_yaoxin.png')" alt="">
      </div>
      <p>
        邀新活动
      </p>
    </li>
    <li>
      <div class="icon-img" @click="$globleFun.onGoto('/help')">
        <img :src="getImageUrl('dashboard/home_icon_wenti.png')" alt="">
      </div>
      <p>
        常见问题
      </p>
    </li>
  </ul>
</template>

<script setup>
import { reactive } from 'vue'
import { getImageUrl } from '@/utils/index'
import { getMsgCount } from '@/api/message'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
  count: ''
})

getMsgCount()
  .then((response) => {
    state.count = response.data?.count || 0
  })

const onActivity = () => {
  router.push({ path: '/blank-iframe', query: { src: import.meta.env.VITE_ACTIVITY }})
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
    .icon-img {
      width: 44px;
      height: 44px;
      img {
        width: 100%;
      }
    }
    p {
      margin-top: 10px;
    }
  }
}
</style>
