<template>
  <div class="record-list-hd">
    <div class="record-list-header">{{ item?.synthesis.title }}</div>
    <div class="record-list-img">
      <van-image lazy-load fit="cover" :src="item?.synthesis.cover && `${domin}${item.synthesis.cover.filename}`" />
    </div>
    <div class="record-list-title">{{ item?.user_goods?.goods?.name }}</div>
    <div class="record-list-num">
      <svg-icon icon-class="serial" class-name="icon-serial" />
      {{
        `${item?.user_goods.goods?.serial}#${item?.user_goods?.num}/${item?.user_goods.goods?.cast_goods_stock}`
      }}
    </div>
    <div class="record-list-time">{{ item?.created_at }}</div>
  </div>
</template>

<script setup>
import { DominKey, getToken } from '@/utils/auth'

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})
const domin = getToken(DominKey)
</script>

<style lang="scss" scoped>

    .record-list-header {
      font-size: 18px;
      font-weight: bold;
      color: var(--root-text-color1);
      margin-bottom: 15px;

      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 19px;
        background-color: var(--root-theme-color);
        margin-right: 10px;
        vertical-align: bottom;
      }
    }

    .record-list-img {
      width: 100%;
      margin-bottom: 16px;
    }

    .record-list-title {
      font-size: 18px;
      color: var(--root-text-color1);
      margin-bottom: 14px;
      font-weight: bold;
      @include textoverflow()
    }

    .record-list-num {
      position: relative;
      color: var(--root-text-color2);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 14px;
      .icon-serial {
        font-size: 12px;
        color: var(--root-theme-color);
      }
    }

    .record-list-time {
      margin-bottom: 26px;
    }
</style>