<template>
  <div class="card-section">
    <navigation-title title="版权信息" fontSize="16" />
    <block-control>
      <div class="card-wrapper">
        <template v-for="(item, index) in copyrightOptions" :key="index">
          <div v-if="row[item.value]" class="copyright-item">
            <van-divider>{{ item.label }}</van-divider>
            <div class="copyright-info">
              <div v-if="item.value !== 'issuer'" class="avatar">
                <default-avatar v-if="item.value === 'author'" :src="`${domin}${row.author_avatar}`" />
                <default-avatar v-else-if="item.value === 'user' && row.avatar" :src="`${domin}${row.avatar}`" />
                <default-avatar v-else-if="item.value === 'user' && !row.avatar" />
              </div>
              <div class="name">
                {{ row[item.value] }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </block-control>
  </div>
</template>

<script setup>
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import BlockControl from '@/components/BlockControl/index.vue'
import DefaultAvatar from '@/components/DefaultAvatar/index.vue'
import { DominKey, getToken } from '@/utils/auth'

const domin = getToken(DominKey)

const props = defineProps({
  row: {
    type: Object,
    default: () => {
      return {
        author: '',
        author_avatar: '',
        issuer: '',
        user: '',
        avatar: ''
      }
    }
  }
})

const copyrightOptions = [
  { label: '拥有者', value: 'user' },
  { label: '创作者', value: 'author' },
  { label: '发行方', value: 'issuer' }
]

</script>

<style lang="scss" scoped>
.card-wrapper {
  padding-top: 24px;
  .copyright-item {
    background-color: var(--root-bg-color2);
    padding: 20px 12px;
    border-radius: 8px;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    .van-divider {
      margin: 0;
      color: var(--root-text-color2);
      &::before, &::after {
        border-color: var(--root-bg-color2);
      }
    }
    .copyright-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 38px;
        height: 38px;
        margin-top: 16px;
      }
      .name {
        margin-top: 8px;
        @include textoverflow(1)
      }
    }
  }
}
</style>