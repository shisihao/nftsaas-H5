<template>
  <div class="cancel-contain">
    <van-popup v-model:show="state.show" position="bottom" round>
      <div class="title">
        确认取消
      </div>
      <div class="content">
        订单一经取消，无法恢复<br/>
        确定取消该订单吗
      </div>
      <div class="button-row">
        <van-button class="btn btn-close" round @click="onClose">
          暂不
        </van-button>
        <van-button class="btn btn-submit" round :loading="state.btnLoading" @click="onCancel">
          确定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { reactive, defineEmits } from 'vue'
import { showToast } from 'vant'
import { orderClose } from '@/api/order'

const state = reactive({
  show: false,
  btnLoading: false
})

const props = defineProps({
  orderNo: {
    type: String,
    default: ''
  }
})

const init = () => {
  state.show = true
}

defineExpose({ init })

const emit = defineEmits(['refreshData'])

const onClose = () => {
  state.show = false
}

const onCancel = (data) => {
  state.btnLoading = true
  orderClose({ order_no: props.orderNo })
    .then((response) => {
      showToast(response.msg)
      emit('refreshData')
      onClose()
    })
    .finally(() => {
      state.btnLoading = false
    })
}

</script>
<style lang="scss" scoped>
.cancel-contain {
  :deep(.van-popup) {
    max-width: 375px;
    left: 0;
    right: 0;
    margin: 0 auto;
    overflow: visible;
    padding-bottom: 20px;
    background-color: var(--root-bg-color1) ;
    .title {
      font-size: 18px;
      color: #2C2C42;
      text-align: center;
      margin-top: 24px;
    }
    .content {
      font-size: 16px;
      color: var(--root-text-color2);
      text-align: center;
      margin-top: 24px;
      line-height: 1.5;
    }
    .button-row {
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 16px;
        line-height: 1;
        height: 38px;
        padding: 0 40px;
      }
      .btn-close {
        color: var(--root-text-color5);
        background-color: var(--root-text-color4);
      }
      .btn-submit {
        color: var(--root-text-color5);
        background-color: var(--root-theme-color);
      }
    }
  }
}
</style>