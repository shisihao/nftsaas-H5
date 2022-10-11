<template>
  <div class="collection-wrapper">
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      > 
        <div class="collection-item" v-for="(item, index) in list" :key="index" @click="onHandleBox(item)">
          <div class="collection-img">
            <van-image
              lazy-load
              fit="cover"
              :src="imgSrc(item)"
            />
            <div class="box-sign box-primary"></div>
            <span class="box-tag" :class="item.is_open === 1?'box-tag-warning':''"> {{item.is_open === 1 ? '已':'未'}}拆开 </span>
          </div>
          <div class="collection-info">
            <div class="collection-title">
              {{ titleName(item) }}
            </div>
            <div v-if="parseFloat(item?.box?.cny_price) >= 0 || parseFloat(item?.box?.integral_price) >= 0" class="price">
              <em v-if="parseFloat(item?.box?.cny_price || 0) > 0"><span>¥</span>{{ item?.box?.cny_price }}</em>
              <em v-if="parseFloat(item?.box?.cny_price || 0) > 0 && parseFloat(item?.box?.integral_price || 0) > 0"><span>+</span></em>
              <em v-if="parseFloat(item?.box?.integral_price || 0) > 0">{{ item?.box?.integral_price }}<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
              <em v-if="parseFloat(item?.box?.cny_price || 0) === 0 && parseFloat(item?.box?.integral_price || 0) === 0">0.00<span>{{ paraphrase({ value: 'integral', options: integralOptions }) }}</span></em>
            </div>
            <div v-if="authorAvatar(item) && authorName(item)" class="collection-gather">
              <div class="avatar">
                <default-avatar v-if="authorAvatar(item)" :src="authorAvatar(item)" />
                <default-avatar v-else />
              </div>
              <div class="name">
                {{ authorName(item) }}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getMyBox } from '@/api/box'
import { pages as commonPages, integralOptions } from '@/utils/explain'
import { getImageUrl } from '@/utils/index'
import { paraphrase } from '@/filters/index'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import { DominKey, getToken } from '@/utils/auth'
import globleFun from '@/utils/link'

const domin = getToken(DominKey)

const onHandleBox = (item) => {
  if (item.is_open === 0) {
    globleFun.onGoto(`/box-my?id=${item?.id}`)
  } else {
    if (item?.open_goods.goods) {
      globleFun.onGoto(`/good-my?id=${item?.user_goods_id}`)
    } else {
      globleFun.onGoto('/integral')
    }
  }
}

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const open = computed(() => {
  return function(is_open){
    if (is_open === 0) {
      return 'box-warning'
    } else if (is_open === 1) {
      return 'box-success'
    } else {
      return ''
    }
  }
})

const imgSrc = computed(() => {
  return (item) => {
    if (item.is_open) {
      if (item.open_goods.goods) {
        return item.open_goods.goods.images && `${domin}${item.open_goods.goods.images[0]}`
      } else {
        return getImageUrl('public/blind_box_reward_wadang.png')
      }
    } else {
      return item?.box?.images && `${domin}${item.box.images[0]}`
    }
  }
})

const titleName = computed(() => {
  return (item) => {
    if (item.is_open) {
      if (item.open_goods.goods) {
        return item.open_goods.goods.name
      } else {
        return `${paraphrase({ value: 'integral', options: integralOptions })}x${item.open_goods.integral_num}`
      }
    } else {
      return item?.box?.name
    }
  }
})

const authorName = computed(() => {
  return (item) => {
    if (item.is_open) {
      if (item.open_goods.goods) {
        return item.open_goods.goods.name
      } else {
        return false
      }
    } else {
      return item.box.author
    }
  }
})

const authorAvatar = computed(() => {
  return (item) => {
    if (item.is_open) {
      if (item.open_goods.goods) {
        return `${domin}${item.open_goods.goods.images[0]}`
      } else {
        return false
      }
    } else {
      return `${domin}${item.box.author_avatar}`
    }
  }
})


const pages = { ...commonPages }

const salesStatus = 0

const onLoad = () => {
  getMyBox(pages)
    .then((response) => {
      const { data, total } = response.data
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }
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
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

const onRefreshList = ({ id, item }) => {
  list.value.forEach((v, index) => {
    if (v.id === id) {
      list.value[index].is_open = 1
      list.value[index].open_goods = item
      list.value[index].user_goods_id = item?.user_goods_id || 0
    }
  })
}

</script>

<style lang="scss" scoped>
.collection-wrapper {
  padding: 0 var(--root-page-spacing) var(--root-page-spacing) var(--root-page-spacing);
  .collection-item {
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--root-bg-color2);
    margin-top: 20px;
    padding: var(--root-page-spacing);
    .collection-img {
      padding-bottom: 100%;
      position: relative;
      .van-image {
        position: absolute;
        border-radius: 12px;
        overflow: hidden;
      }
      .box-sign {
        width: 60px;
        height: 60px;
        position: absolute;
        left: 10px;
        top: 10px;
        background-position: center top;
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .box-primary {
        background-image: url('@/assets/images/public/common_icon_biaoqian.png');
      }
      .box-success {
        height: 152px;
        background-image: url('@/assets/images/public/box_open.png');
      }
      .box-warning {
        background-image: url('@/assets/images/public/common_icon_biaoqian.png');
      }
      .box-tag {
        position: absolute;
        left: 10px;
        bottom: 10px;
        padding: 6px 12px;
        background-color: rgba($color: #000000, $alpha: 0.7);
        border-radius: 12px;
        color: var(--root-text-color3);
      }
      .box-tag-warning {
        background-color: var(--root-auxiliary-color1);
        color: var(--root-text-color5);
      }
    }
    .collection-info {
      padding: 0 0 var(--root-page-spacing) 0;
      .collection-title {
        margin-top: 20px;
        font-size: 18px;
      }
      .price {
          margin-top: 10px;
          color: var(--root-auxiliary-color1);
          font-size: 18px;
          em {
            font-style: normal;
          }
          span {
            font-size: 16px;
          }
        }
      .collection-gather {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .avatar {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }
        .name {
          padding-left: 6px;
          font-size: 13px;
          color: var(--root-text-color2);
          @include textoverflow()
        }
      }
    }
  }
}
</style>
