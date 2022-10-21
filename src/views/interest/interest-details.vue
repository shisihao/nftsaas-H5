<template>
  <div class="details-section">
    <deatils-header :item="item"></deatils-header>
    <deatils-content :data="{list,item}"></deatils-content>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { interestList } from '@/api/interest'
import deatilsHeader from './components/deatils-header.vue'
import deatilsContent from './components/deatils-content.vue'

const route = useRoute()
const item = route.query

const list = ref([])

interestList({ label: item.type })
  .then(res => {
    list.value = res.data
  })
</script>

<style scoped>
.details-section {
  background-color: var(--root-bg-color1);
  min-height: calc(100vh - 46px);
}
</style>