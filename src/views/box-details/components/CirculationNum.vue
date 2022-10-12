<template>
  <div class="circulation-section">
    <div class="circulation">
      <b>发行</b>
      <span>{{ item.total_stock }}份</span>
    </div>
    <div class="surplus">
      剩余 <span>{{ item.stock }}份</span>
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
  .circulation-section {
    background-color: var(--root-bg-color2);
    border-radius: 12px;
    padding: 18px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 2.5%;
      top: -0.5px;
      width: 95%;
      border-top: 1px dashed var(--root-dividing-color1);
    }
    .circulation {
      border: 1px solid var(--root-theme-color);
      font-size: 14px;
      border-radius: 4px;
      display: flex;
      b {
        color: #fff;
        font-weight: normal;
        padding: 2px 6px;
        background-color: var(--root-theme-color);
      }
      span {
        padding: 2px 6px;
        color: var(--root-theme-color);
      }
    }
    .surplus {
      span {
        color: var(--root-theme-color);
      }
    }
  }
</style>