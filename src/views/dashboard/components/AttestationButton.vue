<template>
  <div class="attestation" @click="$globleFun.onGoto('/authentication')">
    <img src="/@/assets/images/dashboard/home_icon_renzheng.png" alt="">
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.attestation {
  width: 375px;
  height: 36px;
  position: fixed;
  left: 50%;
  margin-left: -187.5px;
  bottom: 0;
  margin-bottom: calc(env(safe-area-inset-bottom) + 50px + 20px);
  z-index: 99;
  img {
    width: 101px;
    height: 36px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
