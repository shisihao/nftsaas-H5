<template>
  <div>
    <van-popup v-model:show="state.show" class="buy-advance-popup-section" round teleport="body" position="bottom" @closed="onClose">
      <div class="buy-advance-popup-title">
        权益藏品
      </div>
      <!-- <div class="buy-advance-popup-tips">
        限定藏品针对当前售卖藏品
      </div> -->
      <div class="buy-advance-popup-card">
        <van-radio-group v-model="state.checked">
          <van-radio v-for="(item, index) in row.interest_info" :key="index" :name="item" :disabled="type === 'prior' && isDisabledrRdio(item.interests.prior.prior_time)">
            <div class="buy-advance-info">
              <van-image
                fit="cover"
                :src="item.goods.images ? `${domin}${item.goods.images[0]}` : ''"
              />
              <div class="buy-advance-text">
                <div class="name">
                  {{ item.goods.name }}
                </div>
                <div class="time">
                  {{ type === 'prior' ? `提前${item.interests.prior.prior_time || 0}分钟抢购` : `获得${item.interests.give.give_days || 0}天转赠` }}
                </div>
                <div class="num">
                  {{ item.goods.serial }}#{{ item.goods.num }}/{{ item.goods.cast_goods_stock }}
                </div>
              </div>
            </div>
            <div class="buy-advance-num">
              <span>x{{ type === 'prior' ? item.interests.prior.num : item.interests.give.num  }}</span>
            </div>
          </van-radio>
        </van-radio-group>
        <no-more />
      </div>
      <div class="buy-advance-popup-row">
        <van-button class="btn btn-close" round @click="onClose">
          稍后再说
        </van-button>
        <van-button class="btn btn-submit" round loading-text="请求中..." :loading="state.btnLoading" @click="onSubmit">
          确认选择
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, reactive, inject } from 'vue'
import { getToken, DominKey } from '/@/utils/auth'
import { showToast } from 'vant'
import NoMore from '/@/components/NoMore/index.vue'
import moment from 'moment'

let info = computed(() => store.state.user.info)

const domin = getToken(DominKey)

const row = inject('item')

// 判断是否可点击
const isDisabledrRdio = computed(() => {
  return(time) => {
    // 当前时间 + 优先购时间 > 开售时间
    if ((+new Date() + time * 60 * 1000) > (+moment(row.value.start_time).format('x'))) {
      return false
    }
    return true
  }
})

const props = defineProps({
  type: {
    type: String,
    default: 'prior'
  }
})

const getInitialData = () => ({
  show: false,
  btnLoading: false,
  checked: ''
})

const state = reactive(getInitialData())

const init = () => {
  state.show = true
}

defineExpose({ init })

const onClose = () => {
  Object.assign(state, getInitialData())
}

const emit = defineEmits(['equityItem'])
const onSubmit = () => {
  if (!state.checked) {
    return showToast('请选择权益')
  }
  emit('equityItem', state.checked)
  onClose()
}
</script>

<style lang="scss">
.buy-advance-popup-section {
  max-width: var(--root-max-width);
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 14px;
  padding-bottom: 20px;
  .buy-advance-popup-title {
    margin-top: 24px;
    font-size: 17px;
    font-weight: 500;
    text-align: center;
  }
  .buy-advance-popup-tips {
    margin-top: 12px;
    text-align: center;
    color: var(--root-text-color3);
  }
  .buy-advance-popup-card {
    min-height: 77px;
    max-height: calc(100vh * 0.6);
    padding: 0 var(--root-page-spacing);
    overflow-y: auto;
    margin-top: 20px;
    .van-radio:not(:last-child) {
      margin-bottom: 20px;
    }
    .van-radio__label {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .buy-advance-info {
        flex-grow: 1;
        display: flex;
        .van-image {
          flex-shrink: 0;
          width: 77px;
          height: 77px;
          border-radius: 6px;
          overflow: hidden;
        }
        .buy-advance-text {
          flex-grow: 1;
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name {
            font-size: 16px;
            @include textoverflow()
          }
          .time {
            color: var(--root-auxiliary-color);
          }
          .num {
            color: var(--root-text-color3);
          }
        }
      }
      .buy-advance-num {
        span {
          padding: 2px 10px;
          background-color: var(--root-bg-color2);
          border-radius: 11px;
        }
      }
    }
  }
  .buy-advance-popup-row {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .btn {
      border: 0;
      height: auto;
      font-size: 16px;
      padding: 10px 20px;
    }
    .btn-close {
      color: var(--root-text-color3);
      border-radius: 44px;
      background-color: rgba(75, 75, 89, 0.1);
    }
    .btn-submit {
      color: var(--root-bg-color1);
      border-radius: 44px;
      background-image: var(--root-button-color1);
    }
  }
}
</style>