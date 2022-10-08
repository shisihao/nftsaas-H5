<template>
  <div class="section user-section">
    <div class="user-info">
      <div class="avatar-uploader">
        <default-avatar v-if="info?.avatar" :src="info ? `${domin}${info.avatar}` : ''" />
        <default-avatar v-else />
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
        <div class="user-id">
          id: {{ info?.show_id }}
        </div>
      </div>
    </div>
    <div class="equity">
      <div>
        权益中心
      </div>
      <div @click="$globleFun.onGoto('/interest')">
        点击进入>
      </div>
    </div>
    <common-fun />
    <my-service />
    <my-goods />
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
    padding: 0 var(--root-page-spacing);
    overflow: hidden;
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
        justify-content: space-around;
        padding-left: 10px;
        .name {
          font-size: 20px;
          @include textoverflow()
        }
        .multinomial {
          display: flex;
          justify-content: space-between;
          .attestation {
            padding-left: 21px;
            position: relative;
            &::before {
              content: '';
              width: 17px;
              height: 17px;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              background-repeat: no-repeat;
              background-size: 100%;
              background-position: center;
            }
          }
          .integral {
            background-image: var(--root-button-color1);
            padding: 2px 8px;
            font-size: 13px;
            border-radius: 10px;
          }
        }
        .attestation-primary {
          color: var(--root-text-color2);
          &::before {
            background-image: url('@/assets/images/user/mine_icon_wrZ.png');
          }
        }
        .attestation-danger {
          color: var(--root-auxiliary-color);
          &::before {
            background-image: url('@/assets/images/user/mine_icon_rzsb.png');
          }
        }
        .attestation-success {
          &::before {
            background-image: url('@/assets/images/user/mine_icon_rzz.png');
          }
        }
        .user-id {
          color: var(--root-text-color2);
        }
      }
    }
    .equity {
      margin-top: 24px;
      width: 100%;
      background-color: var(--root-theme-color);
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-radius: 6px;
      &::before {
        content: '';
        position: absolute;
        left: var(--root-page-spacing);
        bottom: 0;
        width: 53px;
        height: 36px;
        background-image: url('@/assets/images/user/mine_equities_card.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      div:nth-child(1) {
        margin-left: 70px;
      }
      div:nth-child(2) {
        margin-right: var(--root-page-spacing);
      }
    }
  }
</style>
