<template>
  <div class="attestation" @click="$globleFun.onGoto('/authentication')">
    <div class="tip-box">
      <svg-icon icon-class="renzheng" class-name="icon-tip"/>
    </div>
    <b>
      去认证
    </b>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/YuSvgIcon'

</script>

<style lang="scss" scoped>
.attestation {
  width: 100px;
  height: 36px;
  background-color: var(--root-theme-color);
  border-radius: 18px 0 0 18px;
  position: fixed;
  left: 50%;
  margin-left: 87.5px;
  bottom: 0;
  z-index: 99;
  margin-bottom: calc(env(safe-area-inset-bottom) + 50px + 20px);
  display: flex;
  align-items: center;
  .tip-box {
    width: 32px;
    height: 32px;
    background-color: rgba(255, 255, 255, 0.7);
    margin-left: 2px;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.7) inset;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-tip {
      font-size: 18px;
      color: var(--root-theme-color);
    }
  }
  b {
    flex-grow: 1;
    color: var(--root-text-color5);
    text-align: center;
  }
}
</style>
