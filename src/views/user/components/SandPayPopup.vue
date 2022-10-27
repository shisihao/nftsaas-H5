<template>
  <div class="popup-section">
    <van-popup
      v-model:show="state.show"
      round
      @closed="onClosed"
    >
      <div class="title">
        温馨提示
      </div>
      <div class="content">
        <p>
          尊敬的用户您好，您即将开通使用杉德支付云钱包，<span>开户请支付{{ config?.open_amount || '' }}元开户费用</span>续，请选择以下支付方式支付相关费用
        </p>
        <div class="pay-content">
          <van-radio-group v-model="state.form.pay_type">
            <div class="pay-item">
              <div class="label">
                支付方式
              </div>
              <div class="pay-info" v-for="(item, index) in payOptions(payTypeOptions)" :key="index" @click="state.form.pay_type = item.value">
                <div class="pay-icon">
                  <svg-icon :icon-class="item.icon" class-name="svg-icon-style" />
                  <span>
                    {{ item.label }}
                  </span>
                </div>
                <div class="pay-select">
                  <van-radio :name="item.value"></van-radio>
                </div>
              </div>
            </div>
          </van-radio-group>
        </div>
      </div>
      <div class="button">
        <van-button type="grey" class="btn cancel" round @click="onCancel">
          取 消
        </van-button>
        <van-button type="primary" class="btn submit" round :loading="state.btnLoading" @click="onSubmit">
          确 定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { showToast } from 'vant'
import store from '@/store/index'
import { sandOpenPay } from '@/api/user'
import { sandQuickUrl } from '@/utils/auth'
import { payTypeOptions } from '@/utils/explain'
import { parseParam } from '@/utils/index'
import { paraphrase } from '@/filters/index'

const config = computed(() => store.state.user.config)

const getInitalState = () => {
  return {
    show: false,
    btnLoading: false,
    form: {
      pay_type: 'bank'
    }
  }
}

const state = reactive(getInitalState())

const resetState = () => {
  Object.assign(state, getInitalState())
}

const payOptions = computed(() => {
  return (options) => {
    let op = options.filter(v => {
      return config.value?.pay_switch[v.value] === 'on' && v.value === 'bank'
    })
    return op
  }
})

// const emit = defineEmits(['payType'])

const init = () => {
  state.show = true
}

defineExpose({ init })

const onCancel = () => {
  state.show = false
}

const onClosed = () => {
  resetState()
}

const onSubmit = () => {
  if (!state.form.pay_type) return showToast('请选择支付方式')
  // emit('payType', state.form.pay_type)
  onCancel()
  state.btnLoading = true
  sandOpenPay(state.form)
    .then((response) => {
      if (state.form.pay_type === 'alipay') {
        location.href = response.data.alipay
      } else if (state.form.pay_type === 'bank') {
        let data = response.data
        location.href = `${sandQuickUrl}${parseParam(data)}`
      }
    })
    .finally(() => {
      state.btnLoading = false
    })
}

</script>

<style lang="scss" scoped>
.popup-section {
  :deep(.van-popup) {
    background-color: var(--root-bg-color2);
    max-width: var(--root-max-width);
    width: 80%;
    right: 0;
    margin: 0 auto;
    color: var(--root-text-color1);
    padding-bottom: 30px;
  }
  .title {
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .content {
    padding: 0 var(--root-page-spacing);
    p {
      padding: 0 4px;
      line-height: 1.5;
      color: var(--root-text-color2);
      span {
        color: var(--root-auxiliary-color1);
      }
    }
    .pay-content {
      margin-top: 30px;
    }
    .pay-item {
      .label {
        font-weight: 500;
      }
      .pay-info {
        margin-top: 15px;
        padding: 0 4px;
        display: flex;
        justify-content: space-between;
        .pay-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          .svg-icon-style {
            font-size: 28px;
          }
          span {
            margin-left: 4px;
          }
        }
        .pay-select {
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            color: var(--root-theme-color);
          }
        }
      }
    }
  }
  .button {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    .btn {
      width: 40%;
      height: 40px;
    }
    .cancel {
      background-image: var(--root-button-color1);
    }
  }
}
</style>
