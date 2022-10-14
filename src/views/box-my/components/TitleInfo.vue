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