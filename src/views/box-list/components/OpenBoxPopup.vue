<template>
  <div class="open-box-popup-contain">
    <van-popup v-model:show="state.show" :close-on-click-overlay="false">
      <div class="popup-bg">
        <div class="tips-img">
          <van-image fit="cover" :src="state.item?.goods?.images[0] ? domin + state.item?.goods?.images[0] : getImageUrl('public/boxdetails_img_wadang.png')" />
        </div>
        <div class="title">
          开启成功
        </div>
        <div class="content">
          恭喜获得“{{ state.item?.goods_id > 0 ? state.item?.goods?.name : `${paraphrase({ value: 'integral', options: integralOptions })}x${state.item?.integral_num || 0}` }}”,<br/>
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
    width: 288px;
    border-radius: 12px;
    padding: 20px;
    overflow: visible;
    .popup-bg {
      background-image: linear-gradient(rgba(var(--root-theme-color-rgb), 0.2) 10%, var(--root-bg-color2) 50%);
      border-radius: 12px;
      margin-top: 0;
      padding-top: 24px;
    }
    .tips-img {
      width: 80px;
      height: 80px;
      margin: auto;
      border-radius: 8px;
      overflow: hidden;
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
    .button-row {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 16px;
        padding: 10px 20px;
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
