<template>
  <div class="replace-phone">
    <div v-if="state.step === 1">
      <div class="logo-wrap">
        <logo />
      </div>
      <div class="account">当前账号</div>
      <div class="phone">{{ phone }}</div>
      <div class="next-btn" @click="state.step = 2">下一步</div>
    </div>
    <div v-if="state.step === 2">
      <affirmPhone></affirmPhone>
    </div>
  </div>
</template>

<script  setup>
import { computed, reactive } from 'vue'
import { getImageUrl } from '@/utils/index'
import store from '@/store/index'
import affirmPhone from './components/affirmPhone.vue'
import { mosaicTel } from '@/filters/index'
import Logo from '../components/common/Logo.vue'

const state = reactive({
  step: 1
})

const phone = computed(() => mosaicTel(store.state.user.info?.phone))

</script>

<style lang="scss" scoped>
.replace-phone {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  padding-top: 20px;
  .logo-wrap {
    margin: 0 auto 39px;
  }

  .account {
    color: var(--root-text-color3);
    font-size: 12px;
    margin-bottom: 10px;
    text-align: center;
  }

  .phone {
    font-size: 18px;
    color: var(--root-text-color1);
    margin-bottom: 50px;
    text-align: center;
  }

  .next-btn {
    width: 343px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
    background: var(--root-theme-color);
    color: var(--root-text-color5);
    border-radius: 22px;
  }
}
</style>