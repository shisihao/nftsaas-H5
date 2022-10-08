<template>
  <div class="trade-container">
    <div class="zs-content-hd">
      <div class="title">交易信息</div>
      <van-icon @click="accordion = !accordion" class="icon" :name="accordion ? 'arrow-up' : 'arrow-down'" />
    </div>
    <div class="zs-content-bd" :class="{ active: accordion }">
      <div class="content-list" v-for="(item, index) in list" :key="index">
        <div class="content-bd-l">
          <div class="circle"></div>
          <div class="line"></div>
        </div>
        <div class="content-bd-r">
          <div class="title">{{ item.name }}</div>
          <div class="description">
            <div class="description-title">交易时间</div>
            <div class="description-content">{{ item.trade_time }}</div>
            <div class="description-title">链上hash</div>
            <div class="description-content">{{ item.hash }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { getGoodsTrade } from '@/api/goods'

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
.trade-container {
  padding: 0 12px;
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

.content-list {
  display: flex;
}

.content-bd-l {
  display: flex;
  flex: 1;
  margin-right: 12px;
  flex-direction: column;
  align-items: center;
  padding-bottom: 12px;

  .circle {
    width: 14px;
    height: 14px;
    background: var(--root-theme-color);
    border-radius: 50%;
    position: relative;

    &::after {
      position: absolute;
      content: '';
      left: 50%;
      top: 50%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--root-bg-color1);
      transform: translate(-50%, -50%);
      z-index: 999;
    }
  }

  .line {
    height: 131px;
    width: 1px;
    border-right: 1px dotted var(--root-text-color3);
    margin: 5px 0;
  }
}

.content-bd-r {
  flex: 9;

  .list-item {
    font-size: 18px;
    margin-bottom: 18px;
  }

  .description {
    padding: 18px 12px 0;
    font-size: 12px;
    color: var(--root-text-color3);

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