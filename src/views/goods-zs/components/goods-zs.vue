<template>
  <div class="zs-container">
    <div class="zs-header">
      <logo-title />
    </div>
    <div class="card-section">
      <navigation-title title="认证信息" fontSize="16" />
      <block-control>
        <div class="card-wrapper">
          <div class="zs-content-bd" :class="{ active: accordion }">
            <div class="zs-content-info">
              <div class="img-wrap" v-if="props.data.goods?.images">
                <van-image lazy-load fit="cover"
                  :src="Array.isArray(props.data.goods?.images) && `${domin}${props.data.goods?.images[0]}`" />
              </div>
              <div class="name">{{ props.data.goods?.name }}</div>
              <div class="title-icon">
                <svg-icon icon-class="serial" class-name="icon-serial" />
                {{`${props.data.goods?.serial}#${props.data.num}/${props.data.goods?.cast_goods_stock}`}}
              </div>
            </div>
            <div class="zs-content-bd-list">
              <div class="title">拥有者</div>
              <div class="avatar-item">
                <van-image lazy-load fit="cover" round :src="`${domin}${info?.avatar}`" class="avatar" />
                <div class="content">{{ info?.name }}</div>
              </div>
            </div>
            <div class="zs-content-bd-list">
              <div class="title">创作者</div>
              <div class="avatar-item">
                <van-image lazy-load fit="cover" round :src="`${domin}${props.data?.goods?.author_avatar}`" class="avatar" />
                <div class="content">{{ props.data?.goods?.author }}</div>
              </div>
            </div>
            <div class="zs-content-bd-list">
              <div class="title">发行方</div>
              <div class="content">{{ props.data.goods?.issuer }}</div>
            </div>
            <div class="zs-content-bd-list">
              <div class="title">链上标识</div>
              <div class="content hash">{{ centrEllipsis(props.data?.identification, 18) }}</div>
            </div>
            <div class="zs-content-bd-list">
              <div class="title">合约地址</div>
              <div class="content hash">{{ centrEllipsis(props.data?.goods?.address, 18) }}</div>
            </div>
          </div>
        </div>
      </block-control>
    </div>
  </div>
</template>

<script  setup>
import { getImageUrl } from '@/utils/index'
import { DominKey, getToken } from '@/utils/auth'
import store from '@/store/index'
import { computed, ref } from "vue"
import LogoTitle from '@/views/dashboard/components/LogoTitle.vue'
import { centrEllipsis } from '@/utils/index'
import NavigationTitle from '@/components/NavigationTitle/index.vue'
import BlockControl from '@/components/BlockControl/index.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
const info = computed(() => store.state.user.info)
const domin = getToken(DominKey)
const accordion = ref(false)
</script>

<style lang="scss" scoped>
.card-section {
  margin-top: var(--root-page-spacing);
  background-color: var(--root-bg-color2);
  border-radius: 12px;
  padding: 24px 12px;
  :deep(.card-wrapper) {
    padding-top: 24px;
  }
}
.zs-container {
  padding: 0;
  background-color: var(--root-bg-color1);
  border-radius: 12px;
}

.zs-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.zs-content {
  background: var(--root-bg-color2);
  padding: 0 10px 10px;
  border-radius: 16px;
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

.zs-content-info {
  padding-bottom: 15px;
  .img-wrap {
    width: 140px;
    height: 140px;
    border-radius: 8px;
    overflow: hidden;
    margin: 15px auto;
  }
  .name {
      @include textoverflow();
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: var(--root-text-color1);
  }
  .title-icon {
    position: relative;
    width: fit-content;
    margin: 12px auto;
    @include textoverflow();
    color: var(--root-text-color1);
    .icon-serial {
      font-size: 12px;
      color: var(--root-theme-color);
    }
  }
}

.zs-content-bd {
  background-color: var(--root-bg-color1);
  padding: 12px;

  .zs-content-bd-list {
    margin-top: 12px;
    background-color: var(--root-bg-color2);
    padding: 12px;
    border-radius: 8px;
    .avatar-item {
      display: flex;
      align-items: center;
      .avatar {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
    }
    .title {
      flex-shrink: 0;
      color: var(--root-text-color3);
      width: 90px;
      margin-bottom: 12px;
    }

    .content {
      @include textoverflow();
    }
  }
}

.zs-content-bd .zs-content-bd-list .hash {
  margin-bottom: 15px;
  @include textoverflow(3);
}
</style>