<template>
  <div class="goods-section">
    <div class="goods-item" v-for="(item, index) in list.user_goods" :key="index" @click="$globleFun.onGoto('/good-my?id=' + item.id)">
      <div class="goods-img">
        <van-image
          lazy-load
          fit="cover"
          :src="Array.isArray(list?.goods?.images) && `${domin}${list.goods.images[0]}` "
        />
      </div>
      <div class="goods-name">
        {{ list?.goods?.name }}
      </div>
      <div class="goods-num">
        {{ `${list?.goods?.serial}#${item.num}/${list?.goods?.cast_goods_stock}` }}
      </div>
      <div class="collection-gather">
        <div class="avatar">
          <default-avatar v-if="list?.goods?.author_avatar" :src="`${domin}${list.goods.author_avatar}`" />
          <default-avatar v-else />
        </div>
        <div class="name">
          {{ list?.goods?.author }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DominKey, getToken } from '@/utils/auth'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const domin = getToken(DominKey)

const list = ref({})

if (!route.params.item) {
  router.go(-1)
} else {
  list.value = JSON.parse(route.params.item || {})
}

</script>

<style lang="scss" scoped>
  .goods-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: var(--root-page-spacing);
    .goods-item {
      width: 48%;
      margin-bottom: 20px;
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
        position: relative;
        padding-left: 16px;
        &::before {
          content: '';
          width: 12px;
          height: 12px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          background-image: url('@/assets/images/public/common_icon_number.png');
          position: absolute;
          left: 0;
          top: 0;
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
</style>
