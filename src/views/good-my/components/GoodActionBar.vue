<template>
  <div class="goodmy-action-bar-section">
    <van-action-bar placeholder>
      <!-- <van-button
        round
        class="btn download-button"
      >
        下载
      </van-button> -->
      <div v-if="item.interest_status && props.giveStatus.type === 3" class="advance-wrapper" @click="onAdvance">
        提前赠x{{ item.interest_give_total || 0 }}
      </div>
      <div v-if="[1, 2, 3].includes(giveStatus.type)" class="attestation-wrapper">
        <div class="attestation-tip">
          {{ giveStatus.time }}
        </div>
      </div>
      <van-button
        round
        class="btn certificate-button"
        @click="$globleFun.onGoto(`/goods-zs?id=${item.id}`)"
      >
        证书
      </van-button>
      <van-button
        round
        class="btn give-button"
        :disabled="![4].includes(giveStatus.type) || config?.give?.switch === 'off'"
        @click="onHandleGive"
      >
        转赠
      </van-button>
    </van-action-bar>
    <give-popup ref="refGivePopup" />
    <buy-advance-popup ref="buyAdvancePopup" type="give" @equity-item="onEquityItem" />
    <tips-popup ref="tipsPopup">
      <template v-slot:content>
        提前转赠权益在进入指定提前转赠期限后才可以使用，请稍后再试
    </template>
    </tips-popup>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import store from '@/store/index'
import GivePopup from '../../components/good/GivePopup.vue'
import BuyAdvancePopup from '../../components/good/BuyAdvancePopup.vue'
import TipsPopup from '@/components/TipsPopup/index.vue'
import moment from 'moment'

const config = computed(() => store.state.user.config)

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  giveStatus: {
    type: Object,
    default: () => {}
  }
})

const buyAdvancePopup = ref(null)
const computedItem = computed(() => props.item)

provide('item', computedItem)

const refGivePopup = ref(null)

const onHandleGive = () => {
  if (props.giveStatus.type === 4) {
    refGivePopup.value.init(computedItem.value)
  }
}

const onAdvance = () => {
  buyAdvancePopup.value.init()
}

const tipsPopup = ref(null)
const onEquityItem = (value) => {
  const limitTime = (value?.interests?.give?.give_days ?? 0) * 1000 * 60 * 60 * 24
  const currentTime = +moment().format('x')
  if (
    (computedItem.value.give_time && (+moment(computedItem.value.give_time).format('x') + limitTime) > currentTime) ||
    (computedItem.value.created_at && (+moment(computedItem.value.created_at).format('x') + limitTime) > currentTime)
    ) {
    return tipsPopup.value.init()
  }

  refGivePopup.value.init({ ...computedItem.value, interest_goods_id: value.goods_id, interest_goods_num: value.goods_num })
}

</script>

<style lang="scss" scoped>
.goodmy-action-bar-section {
  :deep(.van-action-bar) {
    max-width: var(--root-max-width);
    width: 100%;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    z-index: 999;
    background-color: var(--root-bg-color2);
    justify-content: space-around;
    padding: 0 var(--root-page-spacing);
    box-sizing: border-box;
    .btn {
      color: var(--root-theme-color);
      padding: 8px 30px;
      height: auto;
    }
    .certificate-button {
      color: var(--root-text-color5);
      background-color: var(--root-theme-color);
    }
    .give-button {
      color: var(--root-text-color5);
      background-color: var(--root-auxiliary-color1);
    }
  }
  .advance-wrapper {
    position: absolute;
    top: -88px;
    right: 7px;
    padding: 8px 10px;
    height: auto;
    border-radius: 18px;
    color: var(--root-text-color5);
    background-color: var(--root-theme-color);
  }
  .attestation-wrapper {
    position: absolute;
    width: calc(100% - var(--root-page-spacing) * 2);
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--root-bg-color1);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 14px var(--root-page-spacing);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .attestation-tip {
      color: var(--root-auxiliary-color);
    }
  }
}
  
</style>