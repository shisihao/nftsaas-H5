<template>
  <div class="setting-section">
    <div class="card">
      <van-cell-group>
        <van-cell class="avatar-cell" title="头像">
          <template #value>
            <default-avatar v-if="info?.avatar" :src="info ? `${domin}${info.avatar}` : ''" />
            <default-avatar v-else />
          </template>
        </van-cell>
        <van-cell title="昵称" is-link :value="info?.name" @click="onChangeName" />
        <van-cell title="手机号" is-link :value="info && mosaicTel(info.phone)" @click="$globleFun.onGoto('/replacePhone')"/>
      </van-cell-group>
    </div>
    <div class="card">
      <van-cell-group>
        <van-cell title="实名认证" is-link @click="$globleFun.onGoto(info.cer_status === -1 ? '/authentication' : '/authentication-result')" />
      </van-cell-group>
    </div>
    <div class="card">
      <van-cell-group>
        <van-cell title="修改登录密码" is-link @click="$globleFun.onGoto('/change-password')" />
        <van-cell title="支付密码" is-link @click="$globleFun.onGoto('/verify-account')" />
      </van-cell-group>
    </div>
    <div class="card">
      <van-cell-group>
        <van-cell title="关于我们" is-link @click="$globleFun.onGoto('/about')" />
      </van-cell-group>
    </div>
    <div class="card sign-out-wrapper">
      <van-cell-group>
        <div class="sign-out" @click="onSignOut">
          退出登录
        </div>
      </van-cell-group>
    </div>
    <sign-out ref="signOut" />
    <name-popup ref="namePopup" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import store from '@/store/index'
import { mosaicTel } from '@/filters/index'
import SignOut from './components/SignOut.vue'
import NamePopup from './components/NamePopup.vue'
import { DominKey, getToken } from '@/utils/auth'

const domin = getToken(DominKey)

let signOut = ref(null)
let namePopup = ref(null)
let info = computed(() => store.state.user.info)

const onSignOut = () => {
  signOut.value.init()
}

const onChangeName = () => {
  namePopup.value.init(info.value)
}

</script>

<style lang="scss" scoped>
.setting-section {
  .card {
    margin-top: 12px;
    .van-cell-group {
      &:after {
        border-color: var(--root-dividing-color1);
      }
      .van-cell {
        background-color: var(--root-bg-color1);
        color: var(--root-text-color1);
        &:after {
          border-color: var(--root-dividing-color1);
        }
        &.avatar-cell {
          align-items: center;
          :deep(.van-cell__value) {
            width: 42px;
            height: 42px;
            flex: none;
          }
        }
      }
    }
  }
  .sign-out-wrapper {
    .sign-out {
      background-color: var(--root-bg-color1);
      padding: 16px 0;
      text-align: center;
    }
  }
}
</style>
