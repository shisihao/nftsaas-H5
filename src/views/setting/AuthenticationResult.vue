<template>
  <div class="main-contain">
    <div class="certify-result" v-if="state.item">
      <div class="certify-img" :class="paraphrase({ value: state.item.status, options: statusOptions, l: 'icon' })">
      </div>
      <div class="certify-title">
        {{ paraphrase({ value: state.item.status, options: attestationOptions }) }}
      </div>
      <van-cell-group>
        <van-cell title="姓名" :value="state.item.name" />
        <van-cell title="证件号码" :value="state.item.number" />
      </van-cell-group>
      <div v-if="state.item.status === 2" class="certify-row">
        <van-button
          round
          block
          type="primary"
          class="submit-button"
          @click="$globleFun.onGoto('/authentication', 'replace')"
        >
          重新认证
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { getCertify } from '@/api/certification'
import { paraphrase } from '@/filters/index'
import { attestationOptions } from '@/utils/explain'
import store from '@/store/index'

const statusOptions = [
  { label: '认证失败', icon: 'certify-success', value: 1 },
  { label: '认证成功', icon: 'certify-fail', value: 2 }
]

const state = reactive({
  item: null
})

getCertify()
  .then((response) => {
    state.item = response.data
  })

</script>

<style lang="scss" scoped>
.main-contain {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  .certify-result {
    padding-top: 30px;
    .certify-img {
      width: 75px;
      height: 87px;
      margin: auto;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
    .certify-title {
      text-align: center;
      font-size: 16px;
      margin-top: 20px;
      font-weight: 500;
    }
    .certify-success {
      background-image: url('@/assets/images/public/set_certification_icon_success.png');
    }
    .certify-fail {
      background-image: url('@/assets/images/public/set_certification_icon_failure.png');
    }

    .van-cell-group {
      margin-top: 30px;
      &:after {
        border-color: var(--root-dividing-color1);
      }
      .van-cell {
        padding: var(--root-page-spacing);
        color: var(--root-text-color1);
        &:after {
          border-color: var(--root-dividing-color1);
        }
        :deep(.van-cell__value) {
          color: var(--root-text-color1);
        }
      }
    }
    .certify-row {
      padding: 0 var(--root-page-spacing);
      .submit-button {
        margin-top: 48px;
        background-image: var(--root-button-color1);
      }
    }
  }
}
</style>