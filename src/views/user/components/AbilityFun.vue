<template>
  <div>
    <div class="ability-section">
      <div v-if="config?.wallet_status === 1" class="equity-wallet">
        <div class="equity units">
          <div>
            权益中心
          </div>
          <div @click="$globleFun.onGoto('/interest')">
            去查看<van-icon name="arrow" />
          </div>
        </div>
        <div class="wallet units">
          <div>
            云账户钱包
          </div>
          <div @click="onCloudWallet">
            {{ paraphrase({ value: parseInt(info?.open_pay_status), options: walletOptions }) }}<van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div v-else class="equity-box">
        <div>
          权益中心
        </div>
        <div @click="$globleFun.onGoto('/interest')">
          去查看<van-icon name="arrow" />
        </div>
      </div>
    </div>
    <sand-pay-popup ref="refSandPayPopup" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { showToast } from 'vant'
import store from '@/store/index'
import globleFun from '@/utils/link'
import { paraphrase } from '@/filters/index'
import { sandUrl } from '@/utils/auth'
import { parseParam } from '@/utils/index'
import { sandOpen } from '@/api/user'
import SandPayPopup from './SandPayPopup.vue'

const info = computed(() => store.state.user.info)
const config = computed(() => store.state.user.config)
const refSandPayPopup = ref(null)

const walletOptions = [
  { label: '去开启', value: 0 },
  { label: '去查看', value: 1 }
]

const onCloudWallet = () => {
  if (info.value?.open_pay_status == 0) { // 去开启
    refSandPayPopup.value.init()
  } else if (info.value?.open_pay_status == 1) {  // 去查看
    sandOpen()
      .then((response) => {
        const data = response.data
        location.href = `${sandUrl}${parseParam(data)}`
      })
  }
}
</script>

<style lang="scss" scoped>
  .ability-section {
    margin-top: 24px;
    padding: 0 var(--root-page-spacing);
    .equity-box {
      width: 100%;
      color: var(--root-text-color5);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 22px 0;
      border-radius: 6px;
      background-image: url('@/assets/images/user/equities_card_bg.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-color: var(--root-theme-color);
      div:nth-child(1) {
        font-size: 18px;
        margin-left: var(--root-page-spacing);
        padding-left: 30px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -10px;
          width: 20px;
          height: 20px;
          background-image: url('@/assets/images/user/mine_equities_card.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100%;
        }
      }
      div:nth-child(2) {
        margin-right: var(--root-page-spacing);
      }
    }
    .equity-wallet {
      display: flex;
      justify-content: space-between;
      .units {
        width: 48%;
        color: var(--root-text-color5);
        padding: 9px 0;
        border-radius: 6px;
        background-repeat: no-repeat;
        background-position: right center;
        background-size: cover;
        div:nth-child(1) {
          font-size: 18px;
          margin-left: var(--root-page-spacing);
          padding-left: 30px;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -10px;
            width: 20px;
            height: 20px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
          }
        }
        div:nth-child(2) {
          margin-top: 10px;
          margin-left: calc(var(--root-page-spacing) + 30px);
        }
      }
      .equity {
        background-color: var(--root-theme-color);
        background-image: url('@/assets/images/user/equities_card_bg.png');
        div:nth-child(1) {
          &::before {
            background-image: url('@/assets/images/user/mine_equities_card.png');
          }
        }
      }
      .wallet {
        background-image: url('@/assets/images/user/mine_img_yzhbg.png');
        div:nth-child(1) {
          &::before {
            background-image: url('@/assets/images/user/mine_icon_qb.png');
          }
        }
      }
    }
  }
</style>
