<template>
  <div class="container">
    <goods-zs :data="data"></goods-zs>
    <goods-trade :data="data"></goods-trade>
    <div class="tips">恭喜您，已拥有该藏品</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { getMyGoodsDetail } from '@/api/goods'
import goodsZs from './components/goods-zs.vue'
import goodsTrade from './components/goods-trade.vue'

const data=ref([])
const route = useRoute();

getMyGoodsDetail({ user_goods_id:route.query.id }).then(res => {
  data.value=res.data
});

</script>

<style lang="scss" scoped>
.container{
  padding: 8px var(--root-page-spacing);
  .tips {
    width: 335px;
    height: 44px;
    background-color: rgba(var(--root-theme-color-rgb), 0.5);
    border-radius: 16px;
    margin: 20px 0;
    color: var(--root-theme-color);
    text-align: center;
    line-height: 44px;
    font-size: 16px;
  }
}
</style>