<template>
  <div id="app" class="app-wrapper">
    <router-view />
  </div>
</template>

<script setup>
import store from '@/store/index'
import { hexToRgb } from '@/utils/index'
import { themeColor } from '@/utils/explain'

// 配置信息
store.dispatch('user/getConfig')
  .then((response) => {
    const defaultColor = response.design_style?.default_color ?? themeColor

    document.documentElement.style.setProperty(`--root-theme-color`, defaultColor)
    document.documentElement.style.setProperty(`--root-theme-color-rgb`, hexToRgb(defaultColor).toString())

    document.querySelector('link[rel="icon"]').href = `${response.cdn_domain}${response.design_style.inside_logo}`
  })
</script>
