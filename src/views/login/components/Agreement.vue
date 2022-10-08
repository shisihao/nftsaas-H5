<template>
  <div class="agreement-section">
    <van-checkbox v-model="checkedValue" @change="onChange">我已阅读并同意<span @click.stop="onConfig('register')">《{{settings.title}}用户协议》</span>和<span @click.stop="onConfig('privacy')">《{{settings.title}}隐私协议》</span></van-checkbox>

    <van-popup 
      v-model:show="show"
      closeable
    >
      <div class="wrapper" v-html="content">
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import settings from '@/settings'
import store from '@/store/index'

const router = useRouter()
let show = ref(false)
let content = ref('')

let config = computed(() => store.state.user.config)

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

const onConfig = (type) => {
  show.value = true

  content.value = config.value[type]
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
    :deep(.van-popup) {
      width: 90vw;
      max-width: calc(375px - 10vw);
      height: 90vh;
      padding: 15px;
      background-color: #fff;
      color: var(--root-text-color4);
      .wrapper {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
</style>
