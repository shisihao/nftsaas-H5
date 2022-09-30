<template>
  <div>
    <van-popup round v-model:show="show">
      <div class="bg-wrap">
        <img class="bg-img" :src="getImageUrl('synthesis/hcdetailshccp@2x.png')" alt="" />
        <div class="bg-goods">
          <div class="bg-img-wrap" v-if="data.goods?.images">
            <van-image lazy-load fit="cover"
              :src="Array.isArray(data.goods?.images) && `${domin}${data.goods?.images[0]}`" />
          </div>
        </div>
        <div class="goods-name">“{{ data.goods?.name }}”</div>
        <div class="goods-num">
          <span>
            {{ `${data.goods?.serial}#${data?.num}/${data.goods?.cast_goods_stock}` }}
          </span>
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
import { getImageUrl } from '/@/utils/index'
import { DominKey, getToken } from '/@/utils/auth'

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
  width: 288px;
  height: 354px;
  border-radius: 8px;
  overflow: hidden;
  background: url('/@/assets/images/synthesis/manghe_img_kaiqi_bg@2x.png') no-repeat;
  background-size: cover;

  .bg-img {
    width: 223px;
    height: 69px;
    margin: 20px 31px 0px 35px;
  }

  .bg-goods {
    width: 110px;
    height: 110px;
    border-radius: 12px;
    border: 2px solid #926FFC;
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
    width: 96px;
    height: 96px;
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
      padding-left: 15px;
      display: inline-block;
      max-width: calc(288px - 30px);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span::before {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      background: url('/@/assets/images/public/common_icon_number.png') no-repeat center;
      background-size: 100%;
      left: 0;
      bottom: 2px;
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
      color: var(--root-text-color2);
      font-size: 16px;
      background-color: var(--root-button-color4);

      border-radius: 24px;
    }

    .popup-btn-r {
      color: var(--root-text-color1);
      background: var(--root-button-color1);
      margin-left: 16px;
    }
  }
}
</style>