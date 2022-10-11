<template>
  <div class="open-box-popup-contain">
    <van-popup v-model:show="state.show" position="bottom" round :close-on-click-overlay="false">
      <div class="popup-header"> 开启成功 </div>
      <div class="popup-bg">
        <div class="tips-img">
          <van-image fit="cover" :src="state.item?.goods?.images[0] ? domin + state.item?.goods?.images[0] : getImageUrl('public/boxdetails_img_wadang.png')" />
        </div>
        <div class="title"> 恭喜获得 </div>
        <div class="content">
          “{{ state.item?.goods_id > 0 ? state.item?.goods?.name : `${paraphrase({ value: 'integral', options: integralOptions })}x${state.item?.integral_num || 0}` }}”,<br/>
        </div>
        <div class="goods-num">
          <span>
            <svg-icon icon-class="serial" class-name="icon-serial" />
            {{ `${state.item?.goods?.serial || ''}#${state.item?.user_goods_num || ''}/${state.item?.goods?.cast_goods_stock || ''}` }}
          </span>
        </div>
      </div>
      <div class="button-row">
        <!-- <van-button class="btn btn-close" round @click="onClose">
          稍后再说
        </van-button> -->
        <van-button class="btn btn-submit" round @click="onSubmit">
          去看看
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, defineExpose } from 'vue'
import store from '@/store/index'
import globleFun from '@/utils/link'
import { DominKey, getToken } from '@/utils/auth'
import { integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import { getImageUrl } from '@/utils/index'

const domin = getToken(DominKey)

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const state = reactive({
  show: false,
  btnLoading: false,
  user_box_id: 0,
  item: {}
})

const init = (item) => {
  state.item = item
  state.show = true
}

defineExpose({ init })

const onClose = () => {
  state.show = false
}

const onSubmit = () => {
  if (state.item?.goods_id > 0) {
    globleFun.onGoto(`/good-my?id=${state.item?.user_goods_id}`, 'replace')
  } else {
    globleFun.onGoto('/integral', 'replace')
  }
}
</script>

<style lang="scss" scoped>
.open-box-popup-contain {
  :deep(.van-popup) {
    max-width: 375px;
    left: 0;
    right: 0;
    margin: 0 auto;
    overflow: visible;
    padding-bottom: 20px;
    .popup-bg {
      background-image: linear-gradient(rgba(var(--root-theme-color-rgb), 0.2) 10%, var(--root-bg-color2) 50%);
      border-radius: 12px;
      padding: 24px;
      margin: 24px 20px 20px 20px;
    }
    .popup-header {
      margin: 0 20px;
      padding: 20px 0;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid var(--root-dividing-color1);
    }
    .tips-img {
      width: 140px;
      height: 140px;
      margin: auto;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid var(--root-theme-color);
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 18px;
      color: var(--root-text-color1);
      text-align: center;
      margin-top: 28px;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
      color: var(--root-text-color3);
      text-align: center;
      margin-top: 14px;
      padding: 0 var(--root-page-spacing);
    }
    .goods-num {
      margin-top: 10px;
      font-size: 12px;
      color: var(--root-text-color2);
      text-align: center;
      span {
        word-break:break-all;
        .icon-serial {
          font-size: 12px;
          color: var(--root-theme-color);
        }
      }
    }
    .button-row {
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 16px;
        padding: 10px 40px;
      }
      .btn-close {
        color: var(--root-text-color3);
        border-radius: 44px;
        background-color: rgba(75, 75, 89, 0.1);
      }
      .btn-submit {
        color: var(--root-text-color5);
        border-radius: 44px;
        background-color: var(--root-theme-color);
      }
    }
  }
}
</style>
