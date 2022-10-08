<template>
<div class="details-section">
  <deatils-header :item="item"></deatils-header>
  <deatils-content :data="{list,item}"></deatils-content>
</div>
</template>

<script setup>
import deatilsHeader from './components/deatils-header.vue'
import { useRoute } from 'vue-router'
import {ref} from 'vue'
import deatilsContent from './components/deatils-content.vue'
import { interestList } from '@/api/interest'

const route = useRoute();
const item =route.query;
const list = ref([])
interestList({ label: item.type }).then(res => {
  list.value=res.data
})
</script>

<style scoped>
</style>