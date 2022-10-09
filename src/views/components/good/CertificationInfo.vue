<template>
  <div class="card-section">
    <navigation-title title="认证信息" fontSize="16" />
    <block-control>
      <div class="card-wrapper">
        <template v-for="(item, index) in certificationOptions" :key="index">
          <div v-if="row[item.value]" class="certification-item">
            <div class="certification-box">
              <div class="item-indicate">
                <div class="item-title">
                  {{ item.label }}
                </div>
                <div class="item-copy" @click="onCopy(row[item.value])">
                  <svg-icon icon-class="copy" class-name="grid-icon"/>
                </div>
              </div>
              <div class="item-hash">
                {{ centrEllipsis(row[item.value], 18) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </block-control>
  </div>
</template>

<script setup>
import { showToast } from 'vant'
import useClipboard from 'vue-clipboard3'
import to from 'await-to-js'
import { centrEllipsis } from '@/utils/index'
import SvgIcon from '@/components/YuSvgIcon'
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import BlockControl from '@/components/BlockControl/index.vue'

const { toClipboard } = useClipboard()

const props = defineProps({
  row: {
    type: Object,
    default: () => {
      return {
        identifications: '',
        address: '',
        hash: '',
      }
    }
  }
})

const certificationOptions = [
  { label: '链上标识', value: 'identifications' },
  { label: '合约地址', value: 'address' },
  { label: '链上HASH', value: 'hash' }
]

const onCopy = async (value) => {
  let err, clipboard
  [ err, clipboard ] = await to(toClipboard(String(value)))
  if (err) return showToast('复制失败')
  showToast('复制成功')
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  .certification-item {
    padding: 14px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    background-color: rgba(var(--root-theme-color-rgb), 0.1);
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background-image: var(--root-button-color1);
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.3;
    }
    &:not(:last-child) {
      margin-bottom: 14px;
    }
    .certification-box {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      .item-indicate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--root-text-color2);
        .item-copy {
          font-size: 12px;
        }
      }
      .item-hash {
        margin-top: 14px;
      }
    }
  }
}
</style>