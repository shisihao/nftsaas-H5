<template>
  <div class="card-section">
    <iframe :src="paySrc" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const paySrc = ref('')

paySrc.value = route.query.paySrc

</script>

<style lang="scss" scoped>
</style>