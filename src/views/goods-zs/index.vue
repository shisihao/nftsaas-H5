<template>
<div class="container">
<goods-zs :data="data"></goods-zs>
<goods-trade :data="data"></goods-trade>
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

<style scoped>
.container{
  padding: 8px var(--root-page-spacing) ;
}
</style>