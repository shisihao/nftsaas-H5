<template>
  <div class="title-section">
    <div class="title">
      {{ item?.box?.name }}
    </div>
    <div class="label">
      <span v-for="(x, y) in item?.box?.tags" :key="y">
        {{ x?.name }}
      </span>
    </div>
  </div>
</template>

<script setup>

defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

</script>

<style lang="scss" scoped>
  .title-section {
    background-color: var(--root-bg-color2);
    border-radius: 12px;
    padding: 20px 0;
    margin-top: 15px;
    .title {
      text-align: center;
      font-size: 22px;
      font-weight: 500;
    }
    .goods-num {
      margin-top: 10px;
      font-size: 12px;
      color: var(--root-text-color2);
      text-align: center;
      span {
        position: relative;
        padding-left: 16px;
        word-break:break-all;
        &::before {
          content: '';
          width: 12px;
          height: 12px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          background-image: url('@/assets/images/public/common_icon_number.png');
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
    .label {
      text-align: center;
      margin-top: 10px;
      span {
        display: inline-block;
        border-radius: 4px;
        font-size: 12px;
        color: var(--root-text-color3);
        border: 1px solid var(--root-text-color3);
        padding: 3px 8px;
        margin-right: 8px;
        margin-bottom: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>