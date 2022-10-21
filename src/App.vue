<template>
  <div id="app" class="app-wrapper">
    <router-view />
  </div>
</template>

<script setup>
import store from '@/store/index'
import { useRouter } from 'vue-router'
import { hexToRgb } from '@/utils/index'
import { themeColor, integralOptions, equityOptions } from '@/utils/explain'
import getPageTitle from '@/utils/get-page-title'

const router = useRouter()

// 配置信息
store.dispatch('user/getConfig')
  .then((response) => {
    // 默认颜色
    const defaultColor = response.design_style?.default_color ?? themeColor
    // 赋值指定颜色
    document.documentElement.style.setProperty(`--root-theme-color`, defaultColor)
    document.documentElement.style.setProperty(`--root-theme-color-rgb`, hexToRgb(defaultColor).toString())
    // ico
    document.querySelector('link[rel="icon"]').href = `${response.cdn_domain}${response.design_style.inside_logo}`
    // 设置积分名称
    let options = []
    if (response.design_style?.template_id === 1) {
      integralOptions.forEach(element => {
        element.label = response.integral_config?.name
        element.icon = response.integral_config?.image
      })
      // 设置权益积分名称
      options = equityOptions.map(element => {
        if (element.value === 'free_integral') {
          return {
            ...element,
            label:`免${response.integral_config?.name}`
          }
        } else {
          return element
        }
      })

    } else if (response.design_style?.template_id === 2) {
      options = equityOptions.filter(element => {
        return !['free_integral'].includes(element.value)
      })
    }
    store.commit('user/SET_EQUITYOPTIONS', options)
    // 刷新后，首次展示页面title
    document.title = getPageTitle(router.currentRoute.value.meta.title)
  })
</script>
