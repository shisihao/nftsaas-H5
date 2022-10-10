<template>
  <div class="section user-section">
    <div class="user-info padding">
      <div class="avatar-uploader">
        <default-avatar :src="info ? `${domin}${info.avatar}` : ''" />
      </div>
      <div class="user-detail">
        <div class="name">
          {{ info?.name }}
        </div>
        <div class="multinomial">
          <div class="attestation" :class="statusClass">
            {{ info && paraphrase({ value: info.cer_status, options: attestationOptions }) }}
          </div>
          <div class="integral" @click="$globleFun.onGoto('/integral')">
            {{ paraphrase({ value: 'integral', options: integralOptions }) }}
            {{ info?.balance || 0 }}
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div class="padding">
      <div class="equity">
        <div>
          权益中心
        </div>
        <div @click="$globleFun.onGoto('/interest')">
          点击进入>
        </div>
      </div>
    </div>
    <common-fun class="padding" />
    <my-service class="padding" />
    <my-goods class="padding" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import CommonFun from './components/CommonFun.vue'
import MyService from './components/MyService.vue'
import MyGoods from './components/MyGoods.vue'
import store from '@/store/index'
import { DominKey, getToken } from '@/utils/auth'
import { attestationOptions, integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'

const domin = getToken(DominKey)

let info = computed(() => store.state.user.info)

let statusClass = computed(() => {
  if (info.value?.cer_status === -1) {
    return  'attestation-primary'
  } else if (info.value?.cer_status === 1) {
    return  'attestation-success'
  } else if (info.value?.cer_status === 2) {
    return  'attestation-danger'
  }
})


</script>

<style lang="scss" scoped>
  .user-section {
    background-image: linear-gradient(rgba(var(--root-theme-color-rgb), 0.2), var(--root-bg-color1));
    background-size: 100% 200px;
    background-repeat: no-repeat;
    overflow: hidden;
    .padding {
      padding: 0 var(--root-page-spacing);
    }
    .user-info {
      margin-top: 24px;
      display: flex;
      .avatar-uploader {
        flex-shrink: 0;
        width: 80px;
        height: 80px;
      }
      .user-detail {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        .name {
          font-size: 20px;
          @include textoverflow()
        }
        .multinomial {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .attestation {
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            padding:0 10px;
            position: relative;
            font-size: 12px;
            border-radius: 0 0 10px 0;
            &::before {
              content: '';
              width: 20px;
              height: 20px;
              position: absolute;
              left: -10px;
              top: 50%;
              transform: translateY(-50%);
              background-image: url('@/assets/images/user/mine_icon_rz.png');
              background-repeat: no-repeat;
              background-size: 100%;
              background-position: center;
            }
          }
          .attestation-primary {
            color: var(--root-text-color1);
            background-color: rgba(0, 0, 0, 0.1);
          }
          .attestation-danger {
            color: var(--root-auxiliary-color1);
            background-color: rgba(255, 94, 94, 0.1);
          }
          .attestation-success {
            color: var(--root-text-color1);
            background-color: rgba(0, 0, 0, 0.1);
          }
          .integral {
            background-color: rgba(var(--root-theme-color-rgb), 0.1);
            color: var(--root-theme-color);
            padding: 4px 8px;
            font-size: 13px;
            border-radius: 10px;
          }
        }
      }
    }
    .equity {
      margin-top: 24px;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 19px 0;
      border-radius: 6px;
      background-image: url('@/assets/images/user/equities_card_bg.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-color: var(--root-theme-color);
      &::before {
        content: '';
        position: absolute;
        left: var(--root-page-spacing);
        width: 20px;
        height: 20px;
        background-image: url('@/assets/images/user/mine_equities_card.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      div:nth-child(1) {
        margin-left: 50px;
        font-size: 18px;
        color: var(--root-text-color5);
      }
      div:nth-child(2) {
        margin-right: var(--root-page-spacing);
        color: var(--root-text-color5);
      }
    }
  }
</style>
