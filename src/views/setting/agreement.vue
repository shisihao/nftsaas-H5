<template>
<div class="main-contain">
  <div class="contain">
    <div class="content">
      <div class="card">
        <div class="content-text" v-html="config && config[query.type]">
       </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store/index'

const router = useRouter()
let query = router.currentRoute.value.query

let config = computed(() => store.state.user.config)

const typeOptions = [
  { type: 'register', title: '用户协议' },
  { type: 'privacy', title: '隐私协议' },
  { type: 'cast', title: '规则说明' }
]

</script>

<style lang="scss" scoped>
.main-contain {
  min-height: calc(100vh - 46px);
  background-color: var(--root-bg-color1);
  .contain {
    .content-text{
      padding: var(--root-page-spacing);
      color: var(--root-text-color2);
      line-height: 1.5;
      word-break: break-all;
    }
  }
}
</style>
