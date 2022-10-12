<template>
  <div>
    <van-popup round v-model:show="show" position="bottom">
      <div class="bg-wrap">
        <div class="popup-header"> 合成成功 </div>
        <div class="popup-bg">
          <div class="bg-goods">
            <div class="bg-img-wrap" v-if="data.goods?.images">
              <van-image lazy-load fit="cover"
                :src="Array.isArray(data.goods?.images) && `${domin}${data.goods?.images[0]}`" />
            </div>
          </div>
          <div class="goods-name">{{ data.goods?.name }}</div>
          <div class="goods-num">
            <span>
              <svg-icon icon-class="serial" class-name="icon-serial" />
              {{ `${data.goods?.serial}#${data?.num}/${data.goods?.cast_goods_stock}` }}
            </span>
          </div>
        </div>
        <div class="popup-btn">
          <van-button class="popup-btn-l" @click="show = !show">稍后再说</van-button>
          <van-button class="popup-btn-r" @click="$globleFun.onGoto(`/good-my?id=${data?.id}`)">去看看</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script  setup>
import { ref,reactive } from 'vue'
import { getImageUrl } from '@/utils/index'
import { DominKey, getToken } from '@/utils/auth'

// const emits = defineEmits(['closeSuccess'])
const data = ref({})
const show = ref(false)
const domin = getToken(DominKey)

const init = (datas) => {
  data.value = datas
  show.value = true;
}
const showPopup = () => {
  show.value = true;
};

// const close = () => {
//   emits('closeSuccess')
// }
defineExpose({ init })
</script>

<style lang="scss" scoped>

.bg-wrap {
  max-width: 375px;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: visible;
  padding-bottom: 20px;
  .popup-header {
    margin: 0 20px;
    padding: 20px 0;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid var(--root-dividing-color1);
  }
  .popup-bg {
    background-image: linear-gradient(rgba(var(--root-theme-color-rgb), 0.2) 10%, var(--root-bg-color2) 50%);
    border-radius: 12px;
    padding: 24px;
    margin: 24px 20px 20px 20px;
  }

  .bg-goods {
    width: 140px;
    height: 140px;
    border-radius: 12px;
    border: 2px solid var(--root-theme-color);
    padding: 2px;
    margin: 0 auto;
    margin-bottom: 15px;
    position: relative;


    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 102px;
      height: 102px;
      border-radius: 12px;
      background: var(--root-bg-color2);
    }
  }

  .bg-img-wrap {
    width: 134px;
    height: 134px;
    border-radius: 12px;
    overflow: hidden;
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .goods-name {
    font-size: 16px;
    color: var(--root-theme-color);
    text-align: center;
    margin-bottom: 7px;
    @include textoverflow();
  }

  .goods-num {
    text-align: center;
    span {
      position: relative;
      color: var(--root-text-color2);
      margin: 0 auto;
      display: inline-block;
      max-width: calc(288px - 30px);
      overflow: hidden;
      text-overflow: ellipsis;
      .icon-serial {
        font-size: 12px;
        color: var(--root-theme-color);
      }
    }

  }

  .popup-btn {
    display: flex;
    padding-top: 13px;
    margin: 0 15px;

    .popup-btn-l,
    .popup-btn-r {
      flex: 1;
      padding: 10px 24px;
      color: var(--root-text-color3);
      font-size: 16px;
      background-color: rgba(75, 75, 89, 0.1);
      border-radius: 24px;
    }

    .popup-btn-r {
      color: var(--root-text-color5);
      background-color: var(--root-theme-color);
      margin-left: 16px;
    }
  }
}
</style>