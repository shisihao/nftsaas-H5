<template>
  <div class="card-section">
    <navigation-title title="盲盒说明" fontSize="16" />
    <block-control>
      <div class="card-wrapper">
        <div class="box-wrapper">
         <div class="box-item" v-for="(item, index) in row.goods_list" :key="index">
            <div class="box-img">
              <van-image
                fit="cover"
                :src="item?.images?.[0] ? `${domin}${item.images[0]}` : getImageUrl('public/boxdetails_img_wadang.png')"
              />
            </div>
            <div class="box-name">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </block-control>
  </div>
</template>

<script setup>
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import BlockControl from '@/components/BlockControl/index.vue'
import { DominKey, getToken } from '@/utils/auth'
import { getImageUrl } from '@/utils/index'

const domin = getToken(DominKey)

const props = defineProps({
  row: {
    type: Object,
    default: () => {
      return []
    }
  }
})


</script>

<style lang="scss" scoped>
.card-wrapper {
  .box-wrapper {
    max-height: calc(100vh * 0.4);
    min-height: 88px;
    overflow-y: auto;
    .box-item {
      display: flex;
      align-items: flex-end;
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      .box-img {
        flex-shrink: 0;
        width: 86px;
        height: 86px;
        border-radius: 12px;
        background-image: var(--root-button-color1);
        padding: 2px;
        .van-image {
          border-radius: 10px;
          overflow: hidden;
        }
      }
      .box-name {
        flex-grow: 1;
        font-weight: 500;
        font-size: 15px;
        color: var(--root-text-color1);
        background-image: linear-gradient(270deg, rgba(30,30,48,0) 0%, #fff 100%);
        overflow-x: auto;
        white-space: nowrap;
        padding: 23px 10px;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}
</style>