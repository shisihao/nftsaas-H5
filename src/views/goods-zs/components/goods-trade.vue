<template>
  <div class="trade-container">
    <div class="card-section">
      <navigation-title title="交易信息" fontSize="16" />
      <block-control>
        <div class="card-wrapper">
          <div class="zs-content-bd" :class="{ active: accordion }">
            <div class="content-list" v-for="(item, index) in list" :key="index">
              <div class="content-bd-r">
                <div class="title">{{ item.name }}</div>
                <div class="description">
                  <template v-if="index == 0">
                    <div class="description-title">铸造时间</div>
                    <div class="description-content">{{ item.created_at }}</div>
                  </template>
                  <template v-else>
                    <div class="description-title">交易时间</div>
                    <div class="description-content">{{ item.trade_time }}</div>
                  </template>
                  <div class="description-title">交易hash</div>
                  <div class="description-content">{{ item.hash }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </block-control>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { getGoodsTrade } from '@/api/goods'
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import BlockControl from '@/components/BlockControl/index.vue'

const accordion = ref(false)
const list = ref([])
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})
watch(() => props.data, () => {
  getGoodsTrade({ user_goods_id: props.data.id }).then(res => {
    list.value = res.data
    list.value.push({
      hash: props.data.goods.hash,
      name: props.data.goods.issuer,
      trade_time: props.data.goods.created_at
    })
  })
})

</script>

<style lang="scss" scoped>
.card-section {
  margin-top: var(--root-page-spacing);
  background-color: var(--root-bg-color2);
  border-radius: 12px;
  padding: 24px 12px;
  :deep(.card-wrapper) {
    padding-top: 24px;
  }
}
.trade-container {
  padding: 12px 0 0;
  background-color: var(--root-bg-color1);
  border-radius: 12px;
}

.zs-content-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 18px 0;

  .title {
    &::before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: -18px;
      vertical-align: middle;
      background: var(--root-button-color3);
    }
  }

  .icon {
    color: var(--root-text-color3);
  }
}

.zs-content-bd {
  background-color: var(--root-bg-color1);
  padding: 12px;
}

.content-list {
  display: flex;
  background-color: var(--root-bg-color2);
  border-radius: 8px;
  padding: 20px 0;
  margin-top: 20px;
  &:nth-child(1) {
    margin-top: 0;
  }
}

.content-bd-r {
  flex: 9;

  .list-item {
    font-size: 18px;
    margin-bottom: 18px;
  }
  .title {
    padding: 0 12px;
  }
  .description {
    padding: 18px 12px 0;
    font-size: 12px;
    color: var(--root-text-color1);

    .description-title {
      margin-bottom: 6px;
    }


    .description-content {
      &:not(:last-child) {
        margin-bottom: 20px;
      }

      @include textoverflow(2)
    }
  }
}


.active {
  height: 0;
  overflow: hidden;
}
</style>