<template>
  <div>
    <user-title title="我的服务"/>
    <div class="service-section">
      <div class="service-item" @click="onChain">
        <span>链上查询</span>
      </div>
      <div class="service-item" @click="onWallet">
        <span>钱包地址</span>
      </div>
      <div class="service-item" @click="$globleFun.onGoto('/transfer-record')">
        <span>转赠记录</span>
      </div>
    </div>

    <chain-query ref="chain" title="链上查询">
      {{ config?.chain_query }}
    </chain-query>

    <user-popup ref="wallet" title="钱包地址">
      <div v-if="info?.cer_status !== 1 " class="wallet-tips">
        暂无钱包地址，实名认证成功即可生成
      </div>
      <div v-else>
        {{ info?.address }}
      </div>
    </user-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserTitle from './UserTitle.vue'
import UserPopup from './UserPopup.vue'
import ChainQuery from './ChainQuery.vue'
import store from '/@/store/index'

let config = computed(() => store.state.user.config)
let info = computed(() => store.state.user.info)

const chain = ref(null)
const wallet = ref(null)

const onChain = () => {
  chain.value.init()
}

const onWallet = () => {
  wallet.value.init()
}

</script>

<style lang="scss" scoped>
  .service-section {
    font-size: 18px;
    margin-top: 24px;
    margin-bottom: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .service-item {
      width: 48%;
      background-color: var(--root-bg-color1);
      border-radius: 8px;
      font-size: 15px;
      padding: 18px 10px;
      position: relative;
      margin-bottom: 10px;
      &::after {
        content: '';
        width: 7px;
        height: 12px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
        background-image: url('/@/assets/images/user/common_icon_next_mini.png');
      }
      &:nth-child(1) {
        span::before {
          background-image: url('/@/assets/images/user/mine_icon_lscx.png');
        }
      }
      &:nth-child(2) {
        span::before {
          background-image: url('/@/assets/images/user/mine_icon_qbdz.png');
        }
      }
      span {
        padding-left: 25px;
        position: relative;
        &::before {
          content: '';
          width: 19px;
          height: 19px;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background-repeat: no-repeat;
          background-size: auto 100%;
          background-position: center;
        }
      }
    }
  }
</style>
