<template>
  <div class="main-contain">
    <div class="contain">
      <div class="content">
        <div class="banner">
          <logo />
          <div class="content-text">
            {{ config && config.about }}
          </div>
        </div>
        <div class="card">
          <van-cell-group>
            <van-cell title="用户协议" is-link @click="$globleFun.onGoto('/agreement?type=register')" />
            <van-cell title="隐私协议" is-link @click="$globleFun.onGoto('/agreement?type=privacy')" />
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import store from '@/store/index'
import Logo from '../components/common/Logo.vue'

const config = computed(() => store.state.user.config)

</script>

<style lang="scss" scoped>
.main-contain {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  .contain {
    background-color: var(--root-bg-color1);
    .banner{
      padding-top: var(--root-page-spacing);
      background-color: var(--root-bg-color2);
      overflow: hidden;
    }
    .content-text {
      padding: 40px var(--root-page-spacing) 30px;
      font-size: 16px;
      color: var(--root-text-color2);
      line-height: 1.5;
    }
    .card {
      margin-top: 12px;
      .van-cell-group {
        &:after {
          border-color: var(--root-dividing-color1);
        }
        .van-cell {
          background-color: var(--root-bg-color2);
          color: var(--root-text-color1);
          &:after {
            border-color: var(--root-dividing-color1);
          }
        }
      }
    }
  }
}
</style>
