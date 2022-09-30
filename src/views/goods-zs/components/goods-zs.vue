<template>
  <div class="zs-container">
    <div class="zs-header">
      <img class="logo" :src="getImageUrl('public/logo2.png')" alt="">
      <div>殿藏·数藏官方认证</div>
    </div>
    <div class="divider"></div>
    <div class="zs-content">
      <div class="zs-content-hd">
        <div class="title">藏品数据</div>
        <van-icon @click="accordion = !accordion" class="icon" :name="accordion ? 'arrow-up' : 'arrow-down'" />
      </div>
      <div class="zs-content-bd" :class="{ active: accordion }">
        <div class="img-wrap" v-if="props.data.goods?.images">
          <van-image lazy-load fit="cover"
            :src="Array.isArray(props.data.goods?.images) && `${domin}${props.data.goods?.images[0]}`" />
        </div>
        <div class="zs-content-bd-list">
          <div class="title">藏品名称</div>
          <div class="content">{{ props.data.goods?.name }}</div>
        </div>
        <div class="zs-content-bd-list">
          <div class="title">藏品编号</div>
          <div class="content title-icon">{{`${props.data.goods?.serial}#${props.data.num}/${props.data.goods?.cast_goods_stock}`}}</div>
        </div>
        <div class="zs-content-bd-list">
          <div class="title">持有者</div>
          <div class="content">{{ info?.name }}</div>
        </div>
        <div class="zs-content-bd-list">
          <div class="title">发行方</div>
          <div class="content">{{ props.data.goods?.issuer }}</div>
        </div>
        <div class="zs-content-bd-list">
          <div class="title">发行时间</div>
          <div class="content">{{ props.data.created_at }}</div>
        </div>
        <div class="zs-content-bd-list">
          <div class="title">链上hash</div>
          <div class="content hash">{{ props.data.hash }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { getImageUrl } from '/@/utils/index'
import { DominKey, getToken } from '/@/utils/auth'
import store from '/@/store/index'
import { computed, ref } from "vue"

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})
const info = computed(() => store.state.user.info)
const domin = getToken(DominKey)
const accordion = ref(false)
</script>

<style lang="scss" scoped>
.zs-container {
  padding: 12px 15px 0px;
  background-color: var(--root-bg-color1);
  border-radius: 12px;
  margin-bottom: 12px;
}

.zs-header {
  display: flex;
  align-items: center;
  font-size: 20px;

  .logo {
    width: 50px;
    height: 50px;
    margin-right: 26px;
    margin-bottom: 9px;
  }
}

.divider {
  height: 1px;
  background: var(--root-dividing-color1);
}

.zs-content-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 15px 0;

  .icon {
    color: var(--root-text-color3);
  }
}

.zs-content-bd {
  
  .img-wrap {
    width: 100%;
    height: 321px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 18px;
  }

  .zs-content-bd-list {
    display: flex;
    margin-bottom: 24px;

    .title {
      flex-shrink: 0;
      color: var(--root-text-color3);
      width: 90px;
    }

    .content {
      @include textoverflow();
    }
    .title-icon {
      position: relative;
      padding-left: 18px;
    }
    .title-icon::before {
      content: '';
      width: 12px;
      height: 12px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-image: url('/@/assets/images/public/common_icon_number.png');
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.active {
  height: 0;
  overflow: hidden;
}

.zs-content-bd .zs-content-bd-list .hash {
  margin-bottom: 15px;
  @include textoverflow(3);
}
</style>