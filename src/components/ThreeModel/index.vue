<template>
  <div class="model-section">
    <iframe v-if="item?.is_three && item.three_url?.three_type === 'gltf'" class="threejs" scrolling="no" :src="`${domin}threejs/3d_gltf.html?gltf=${item.three_url?.three_gltf}&bg=${config?.back_image}`" frameborder="0"></iframe>
    <iframe v-else-if="item?.is_three && item.three_url?.three_type === 'obj'" class="threejs" scrolling="no" :src="`${domin}threejs/3d.html?obj=${item.three_url?.three_obj}&mtl=${item.three_url?.three_mtl}&bg=${config?.back_image}`" frameborder="0"></iframe>
    <div v-else-if="item?.is_video && config" class="video-box" :style="{ paddingBottom: `${item.video_url?.height / item.video_url?.width * 100}%` }">
      <iframe class="iframevideo" scrolling="no" :src="`${domin}threejs/video.html?video=${item.video_url?.filename}&limitsecond=${limitsecond(config, item)}`" frameborder="0"></iframe>
    </div>
    <van-image v-else fit="cover" :src="Array.isArray(item?.images) ? `${domin}${item?.images[0]}` : ''" />
    <div v-show="item?.is_three" class="cover-touch"></div>
    <img v-show="item?.is_three" class="full-screen" src="@/assets/images/public/mine_icon_cangping_fangda.png" alt="" @click="onFullScreen" />
    <van-popup v-model:show="show" class="threejs-popup" closeable :duration="0">
      <iframe v-if="item?.is_three && item.three_url?.three_type === 'gltf'" class="threejs-content" scrolling="no" :src="`${domin}threejs/3d_gltf.html?fullscreen=true&gltf=${item.three_url?.three_gltf}&bg=${config?.back_image}`" frameborder="0"></iframe>
      <iframe v-if="item?.is_three && item.three_url?.three_type === 'obj'" class="threejs-content" scrolling="no" :src="`${domin}threejs/3d.html?fullscreen=true&obj=${item.three_url?.three_obj}&mtl=${item.three_url?.three_mtl}&bg=${config?.back_image}`" frameborder="0"></iframe>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { DominKey, getToken } from '@/utils/auth'
import store from '@/store/index'

const domin = getToken(DominKey)

let config = computed(() => store.state.user.config)

const show = ref(false)

const limitsecond = computed(() => {
  return (config, item) => {
    if (config?.video_seconds && !item?.modelType) {
      return config?.video_seconds || 0
    } else {
      return ''
    }
  }
})

defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const onFullScreen = () => {
  show.value = true
}

</script>

<style lang="scss" scoped>
.model-section {
  width: 100%;
  position: relative;
  min-height: 40px;
  .van-image {
    min-height: 40px;
    :deep(.van-image__error), :deep(.van-image__loading) {
      background-color: transparent;
    }
  }
  .van-image, .threejs {
    width: 100%;
    display: block;
  }
  .threejs {
    height: 525px;
  }
  .video-box {
    width: 100%;
    position: relative;
    .iframevideo {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .cover-touch {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .full-screen {
    width: 28px;
    height: 28px;
    position: absolute;
    left: 50%;
    margin-left: -14px;
    bottom: 10px;
  }
  :deep(.threejs-popup) {
    width: 100%;
    max-width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--root-bg-color2);
    .threejs-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
