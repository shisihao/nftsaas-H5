<template>
  <div class="control-section">
    <div class="caret" @click="onHandleCaret">
      {{ paraphrase({ value: state.caretStatus, options: caretOptinos }) }} <van-icon :name="paraphrase({ value: state.caretStatus, options: caretOptinos, l: 'icon' })" />
    </div>
    <div class="caret-wrapper" :class="state.caretStatus ? 'caret-row' : ''">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { paraphrase } from '@/filters/index'

const caretOptinos = [
  { label: '收起', icon: 'arrow-up', value: 0 },
  { label: '展开', icon: 'arrow-down', value: 1 }
]

const state = reactive({
  caretStatus: 0
})
const onHandleCaret = () => {
  state.caretStatus = state.caretStatus ? 0 : 1
}
</script>

<style lang="scss" scoped>
  .control-section {
    position: relative;
    .caret {
      position: absolute;
      color: var(--root-text-color3);
      top: -16px;
      right: 0;
    }
    .caret-wrapper {
      overflow: hidden;
    }
    .caret-row {
      height: 0;
    }
  }
</style>