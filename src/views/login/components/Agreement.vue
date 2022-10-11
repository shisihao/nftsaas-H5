<template>
  <div class="agreement-section">
    <van-checkbox v-model="checkedValue" @change="onChange">我已阅读并同意<span @click.stop="$globleFun.onGoto('/public-agreement?type=register')">《用户协议》</span>和<span @click.stop="$globleFun.onGoto('/public-agreement?type=privacy')">《隐私协议》</span></van-checkbox>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store/index'

const router = useRouter()

const config = computed(() => store.state.user.config)

const props = defineProps({
  checkedValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:checkedValue'])

const checkedValue = computed({
  get: () => props.checkedValue,
  set: (value) => emit('update:checkedValue', value),
})

const onChange = (value) => {
  checkedValue.value = value
}

</script>

<style lang="scss" scoped>
  .agreement-section {
    .van-checkbox {
      align-items: flex-start;
      :deep(.van-checkbox__icon--checked) {
        .van-icon {
          background-color: var(--root-theme-color);
          border-color: var(--root-theme-color);
        }
      }
      :deep(.van-checkbox__label) {
        font-size: 12px;
        color: var(--root-text-color1);
        margin-left: 5px;
        span {
          color: var(--root-theme-color);
        }
      }
    }
  }
</style>
