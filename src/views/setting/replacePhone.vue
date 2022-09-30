<template>
  <div class="replace-phone">
    <div v-if="state.step === 1">
      <div class="logo-wrap">
        <img :src="getImageUrl('setting/login_icon_logo.png')" alt="">
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
import { getImageUrl } from '/@/utils/index'
import store from '/@/store/index'
import affirmPhone from './components/affirmPhone.vue'
import { mosaicTel } from '/@/filters/index'

const state = reactive({
  step: 1
})

const phone = computed(() => mosaicTel(store.state.user.info?.phone))

</script>

<style lang="scss" scoped>
.replace-phone {

  .logo-wrap {
    width: 255px;
    height: 88px;
    margin: 36px auto 39px;

    img {
      width: 100%;
      height: 100%;
    }
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
    background: var(--root-button-color1);
    border-radius: 22px;
  }
}
</style>