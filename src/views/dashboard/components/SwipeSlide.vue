<template>
  <div v-if="state.list.length > 0" class="swipe-wrapper">
    <van-swipe class="swipe-box" lazy-render :autoplay="6000">
      <van-swipe-item v-for="(item, index) in state.list" :key="index" @click="onHandleSwipe(item)">
        <van-image
          lazy-load
          fit="cover"
          :src="domin + item.image"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getAdPos, getAdList } from '@/api/ad'
import { DominKey, getToken } from '@/utils/auth'
import { useRouter } from 'vue-router'

const domin = getToken(DominKey)
const router = useRouter()

const state = reactive({
  list: []
})

getAdPos()
  .then((response) => {
    getAdList({ id: response.data[0].id })
      .then((res) => {
        state.list = res.data
      })
  })

  const onHandleSwipe = (item) => {
    //跳转类型:0-静态 1-外部 2-内部
    if (item.url_type === 1) {
      location.href = item.url
    } else if (item.url_type === 2) {
      let arr = item.url.split('|')
      if (arr[0] === 'goods') {
        router.push({ name: 'good-details', query: { id: arr[1] } })
      } else if (arr[0] === 'box') {
        router.push({ name: 'box-details', query: { id: arr[1] } })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .swipe-wrapper {
    margin-top: 10px;
    .swipe-box {
      width: 100%;
      height: 150px;
      .van-swipe-item {
        padding: 0 15px;
        .van-image {
          border-radius: 10px;
          overflow: hidden;
        }
      }
      :deep(.van-swipe__track) {
        height: 140px;
      }
      :deep(.van-swipe__indicators) {
        bottom: 0;
        .van-swipe__indicator {
          width: 8px;
          height: 4px;
          border-radius: 2px;
          background-color: #CCCCCC;
          opacity: 1;
        }
        .van-swipe__indicator--active {
          width: 12px;
          background-color: var(--root-theme-color);
        }
      }
    }
  }
</style>