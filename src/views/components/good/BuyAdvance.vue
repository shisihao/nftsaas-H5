<template>
  <div>
    <div class="buy-advance-section">
      <van-button round @click="onBuyAdvance">提前购x{{ row.interest_prior_total || 0}}</van-button>
    </div>
    <buy-advance-popup ref="buyAdvancePopup" @equity-item="onEquityItem" />
  </div>
</template>

<script setup>
import { computed, ref, reactive, inject } from 'vue'
import BuyAdvancePopup from './BuyAdvancePopup.vue'

let info = computed(() => store.state.user.info)

const buyAdvancePopup = ref(null)
const row = inject('item')

const onBuyAdvance = () => {
  buyAdvancePopup.value.init()
}

const emit = defineEmits(['equityItem'])
const onEquityItem = (value) => {
  emit('equityItem', value)
}

</script>

<style lang="scss" scoped>
.buy-advance-section {
  .van-button {
    margin-left: var(--root-page-spacing);
    padding: 8px 10px;
    background: none;
    font-weight: 400;
    height: auto;
    color: var(--root-text-color5);
    background-color: var(--root-theme-color);
  }
}
</style>