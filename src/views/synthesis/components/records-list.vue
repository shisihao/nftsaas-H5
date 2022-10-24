<template>
  <div class="record-list-bd">
    <div class="list-bd-header">
      <div>合成材料</div>
      <div class="right-icon" @click="accordion = !accordion">
        {{accordion ? '展开' : '收起'}}
        <van-icon class="icon" :name="accordion ? 'arrow-up' : 'arrow-down'" />
      </div>
      
    </div>
    <div class="list-bd-content" :class="{ active: accordion }">
      <div class="list-item" v-for="(item, index) in imgList" :key="index">
        <div class="img-wrap">
          <van-image lazy-load fit="cover" :src="item.images && `${domin}${item.images}`" />
        </div>
        <div class="title">{{ item.name }}</div>
        <div class="num">
          <svg-icon icon-class="serial" class-name="icon-serial" />
          {{ `${item.serial}#${item.num}/${item.cast_goods_stock}` }}
        </div>
        <div class="tag" :class="{ noActive: item.is_destroy }">{{ item.is_destroy ? '销毁' : '不销毁' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DominKey, getToken } from '@/utils/auth'
import { watch, ref } from 'vue'

const props = defineProps({
  item: {
    type: Array,
    default: () => []
  }
})
const accordion = ref(false)
const imgList = ref([])
const domin = getToken(DominKey)

imgList.value = props.item.map(v => {
  return {
    images: v.user_goods.goods.images[0],
    num: v.user_goods.num,
    serial: v.user_goods.goods.serial,
    cast_goods_stock: v.user_goods.goods.cast_goods_stock,
    name: v.user_goods.goods.name,
    is_destroy: v.is_destroy
  }
})


</script>

<style lang="scss" scoped>
.list-bd-header {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  .right-icon {
    color: var(--root-text-color4);
  }
  .icon {
    color: var(--root-text-color3);
  }
}

.list-bd-content {
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.list-item {
  padding-top: 20px;
  margin-right: 8px;
  text-align: center;
  width: 142px;
  .img-wrap {
    width: 142px;
    height: 142px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 11px;
  }

  .title {
    font-size: 13px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .num {
    position: relative;
    color: var(--root-text-color2);
    font-size: 14px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow-x: auto;
    .icon-serial {
      font-size: 12px;
      color: var(--root-theme-color);
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tag {
    display: inline-block;

    height: 20px;
    line-height: 20px;
    font-size: 13px;
    border-radius: 12px;
    padding: 1px 12px 0;
    color: var(--root-text-color2);
    background-color: var(--root-bg-color1);

  }

  .noActive {
    color: var(--root-auxiliary-color1);
    background-color: var(--root-bg-color1);
  }
}

.active {
  height: 0;
  overflow: hidden;
}
</style>