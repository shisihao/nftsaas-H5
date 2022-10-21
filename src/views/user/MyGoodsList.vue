<template>
  <div class="goods-section">
    <div class="goods-item" v-for="(item, index) in state.list.user_goods" :key="index" @click="$globleFun.onGoto('/good-my?id=' + item.id)">
      <div class="goods-img">
        <van-image lazy-load fit="cover" :src="Array.isArray(state.list?.goods?.images) && `${domin}${state.list.goods.images[0]}` " />
      </div>
      <div class="goods-name">
        {{ state.list?.goods?.name }}
      </div>
      <div class="goods-num">
        <svg-icon icon-class="serial" class-name="icon-serial" />
        {{ `${state.list?.goods?.serial}#${item.num}/${state.list?.goods?.cast_goods_stock}` }}
      </div>
      <div class="collection-gather">
        <div class="avatar">
          <default-avatar :src="state.list.goods.author_avatar ? `${domin}${state.list.goods.author_avatar}` : ''" />
        </div>
        <div class="name">
          {{ state.list?.goods?.author }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { DominKey, getToken } from '@/utils/auth'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'

const domin = getToken(DominKey)

const state = reactive({
  list: JSON.parse(sessionStorage.getItem('goodSpecific') || {})
})

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
      word-break: break-all;
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
</style>
