<template>
  <div>
    <div class="open-tips-popup-contain">
      <van-popup v-model:show="state.show" position="bottom" round>
        <div class="popup-header"> 开启盲盒 </div>
        <div class="tips-img">
          <img src="@/assets/images/public/common_icon_biaoqian.png" alt="">
        </div>
        <div class="title"> 是否确认开启盲盒 </div>
        <div class="content"> 开启后将随机获得藏品 </div>
        <div class="button-row">
          <van-button class="btn btn-close" round @click="onClose">
            稍后再说
          </van-button>
          <van-button class="btn btn-submit" round loading-text="请求中..." :loading="state.btnLoading" @click="onSubmit">
            确认开启
          </van-button>
        </div>
      </van-popup>
    </div>
    <open-box-popup ref="openBoxPopup" />
  </div>
</template>

<script setup>
import { ref, reactive, defineExpose } from 'vue'
import store from '@/store/index'
import globleFun from '@/utils/link'
import OpenBoxPopup from './OpenBoxPopup.vue'
import { boxOpen } from '@/api/box'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const openBoxPopup = ref(null)
const state = reactive({
  show: false,
  btnLoading: false,
  user_box_id: 0,
  item: {}
})

const init = (item) => {
  state.user_box_id = item.id
  state.show = true
}

defineExpose({ init })

const onClose = () => {
  state.show = false
}

const emit = defineEmits(['refreshList'])

const onSubmit = () => {
  state.btnLoading = true
  boxOpen({ user_box_id: state.user_box_id })
    .then((response) => {
      state.item = response.data?.open_goods
      emit('refreshList', { id: state.user_box_id, item: response.data?.open_goods })
      onClose()
      openBoxPopup.value.init(state.item)
    })
    .finally(() => {
      state.btnLoading = false
    })
}
</script>

<style lang="scss" scoped>
.open-tips-popup-contain {
  :deep(.van-popup) {
    max-width: 375px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding-bottom: 20px;
    overflow: visible;
    .popup-header {
      margin: 0 20px;
      padding: 20px 0;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid var(--root-dividing-color1);
    }
    .tips-img {
      width: 100px;
      height: 100px;
      margin: 40px auto 0 auto;
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
