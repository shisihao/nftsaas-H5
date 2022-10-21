<template>
  <div class="my-goods-section">
    <div class="title-section">
      <div>
        <span class="title">
          我的藏品
        </span>
        <span class="num">
          {{ info?.goods_num || 0 }}
        </span>
      </div>
      <div class="transfer" @click="onChangeBars">
        <div v-show="activeTags === 0">
          <van-icon name="bars" />标签
        </div>
        <div v-show="activeTags === 1">
          <van-icon name="apps-o" />列表
        </div>
      </div>
    </div>
    <div v-if="activeTags === 0">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="goods-section">
          <div class="goods-item" v-for="(item, index) in list" :key="index" @click="onGoodsList(item)">
            <div v-if="item.total > 1" class="num">
              x{{ item.total }}
            </div>
            <div class="goods-img">
              <van-image
                lazy-load
                fit="cover"
                :src="Array.isArray(item?.goods?.images) && `${domin}${item.goods.images[0]}` "
              />
            </div>
            <div class="goods-name">
              {{ item?.goods?.name }}
            </div>
            <div class="goods-num">
              <svg-icon icon-class="serial" class-name="icon-serial" />
              {{ `${item?.goods?.serial}#${item?.user_goods?.[0].num}/${item?.goods?.cast_goods_stock}` }}
            </div>
            <div class="collection-gather">
              <div class="avatar">
                <default-avatar :src="item?.goods?.author_avatar ? `${domin}${item.goods.author_avatar}` : ''" />
              </div>
              <div class="name">
                {{ item?.goods?.author }}
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div v-if="activeTags === 1" class="skeleton">
      <van-skeleton class="skeleton-line" v-if="collapseLoading" :row="3" />
      <van-collapse v-else v-model="activeNames" :border="false">
        <van-collapse-item :border="false" v-for="(item, index) in collapseOptions" :key="index" :title="`${item.label} 丨 ${item.num}`" :name="item.value">
          <template #right-icon>
            <div class="right-icon">
              <span>{{ activeNames.includes(item.value) ? '收起' : '展开' }}</span>
              <van-icon :name="activeNames.includes(item.value) ?'arrow-up':'arrow-down'" />
            </div>
          </template>
          <van-skeleton v-if="!tagsList[item.value]" class="skeleton-line" :row="3" />
          <div v-else class="goods-item" v-for="(x, y) in tagsList[item.value]" :key="y" @click="onGoodsList(x)">
            <div v-if="x.total > 1" class="num">
              x{{ x.total }}
            </div>
            <div class="goods-img">
              <van-image
                lazy-load
                fit="cover"
                :src="Array.isArray(x?.goods?.images) && `${domin}${x.goods.images[0]}` "
              />
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import store from '@/store/index'
import { pages as commonPages } from '@/utils/explain'
import { DominKey, getToken } from '@/utils/auth'
import globleFun from '@/utils/link'
import { getGoodsList, getGoodsTags, getGoodsTagsList } from '@/api/goods'
import UserTitle from './UserTitle.vue'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'

const domin = getToken(DominKey)

let info = computed(() => store.state.user.info)

const pages = { ...commonPages }
const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  getGoodsList(pages)
    .then((response) => {
      response.data.forEach(v => {
        list.value.push(v)
      })
      pages.page++
      // 加载状态结束
      loading.value = false

      // 数据全部加载完成
      if (response.data.length < pages.limit) {
        finished.value = true
      }
    })
}

const onGoodsList = (item) => {
  sessionStorage.setItem('goodSpecific', JSON.stringify(item))
  globleFun.onGoto('my-goods-list')
}

// 切换标签
const activeTags = ref(0)
const activeNames = ref([])
const collapseOptions = ref([])
const collapseLoading = ref(false)
const onChangeBars = () => {
  activeTags.value = activeTags.value === 0 ? 1 : 0
  if (activeTags.value === 1) {
    if (collapseLoading.value) return false
    collapseLoading.value = true
    getGoodsTags({ type: 'goods' })
      .then((response) => {
        collapseOptions.value = response.data.tags.map(v => {
          return {
            label: v.name,
            value: v.id,
            num: v.total
          }
        })
      })
      .finally(() => {
        collapseLoading.value = false
      })
  }
}
const tagsList = ref({})
const goodsTagsList = (id) => {
  getGoodsTagsList({ type: 'goods', tag_id: id })
    .then((response) => {
      tagsList.value[id] = response.data
    })
}
watch(activeNames, (newValue, oldValue) => {
  const tem = newValue.concat(oldValue).filter(item => !oldValue.includes(item))
  if (tem?.[0] && !tagsList[tem[0]]) {
    goodsTagsList(tem[0])
  }
})
</script>

<style lang="scss" scoped>
.my-goods-section {
  background-color: var(--root-bg-color2);
  border-radius: 20px 20px 0 0;
}
  .title-section {
    margin-top: 24px;
    margin-bottom: 18px;
    padding-top: var(--root-page-spacing);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 18px;
    }
    .num {
      font-size: 18px;
      background-color: var(--root-theme-color);
      color: var(--root-text-color5);
      border-radius: 10px;
      padding: 0 12px;
      margin-left: 10px;
    }
    .transfer {
      font-size: 16px;
      color: var(--root-theme-color);
    }
  }
  .goods-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item {
      width: 48%;
      margin-bottom: 20px;
      position: relative;
      .num {
        padding: 1px 8px;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1;
        color: var(--root-text-color1);
        background-color: var(--root-bg-color1);
        border-radius: 10px;
      }
      .goods-img {
        width: 165px;
        height: 165px;
        .van-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      .goods-name {
        margin-top: 10px;
        @include textoverflow()
      }
      .goods-num {
        margin-top: 10px;
        word-break:break-all;
        font-size: 12px;
        color: var(--root-text-color2);
        .icon-serial {
          font-size: 12px;
          color: var(--root-theme-color);
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
  .skeleton {
    padding-bottom: 50px;
    .skeleton-line {
      width: 100%;
      :deep(.van-skeleton__row) {
        background: var(--root-bg-color1);
      }
    }
    .van-collapse {
      :deep(.van-cell) {
        background: transparent;
        padding-left: 0;
        padding-right: 0;
        color: var(--root-text-color1);
        .van-cell__right-icon {
          color: var(--root-text-color1);
        }
      }
      :deep(.van-collapse-item__content) {
        background: transparent;
        color: var(--root-text-color1);
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        .goods-item {
          width: 30%;
          margin-bottom: 20px;
          margin-right: 5%;
          position: relative;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .num {
            padding: 1px 8px;
            position: absolute;
            right: 5px;
            top: 5px;
            z-index: 1;
            color: var(--root-text-color1);
            background-color: var(--root-bg-color1);
            border-radius: 10px;
          }
          .goods-img {
            width: 100%;
            height: 103.5px;
            .van-image {
              border-radius: 8px;
              overflow: hidden;
            }
          }
        }
      }
      .right-icon {
        span {
          color: var(--root-text-color3);
          margin-right: 5px;
        }
      }
    }
  }
</style>
