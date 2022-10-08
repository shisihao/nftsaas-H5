<template>
  <div class="main-section">
    <van-popup
      v-model:show="state.show"
      position="bottom"
      @closed="onClose"
      round
    >
      <div class="title">
        做任务，领取{{ paraphrase({ value: 'integral', options: integralOptions }) }}
      </div>
      <div class="content">
        <div class="card">
          <div class="card-l">
            <img src="@/assets/images/integral/integral_icon_qd.png" alt="">
            <div>
              <p>每日签到</p>
              <p class="integral">+2 {{ paraphrase({ value: 'integral', options: integralOptions }) }}</p>
            </div>
          </div>
          <div class="card-r">
            <div class="card-btn"> 签到 </div>
          </div>
        </div>
        <div class="card">
          <div class="card-l">
            <img src="@/assets/images/integral/integral_icon_gmcp.png" alt="">
            <div>
              <p>购买藏品</p>
              <p class="integral">+2 {{ paraphrase({ value: 'integral', options: integralOptions }) }}</p>
            </div>
          </div>
          <div class="card-r">
            <div class="card-btn"> 1/2 </div>
          </div>
        </div>
        <div class="card">
          <div class="card-l">
            <img src="@/assets/images/integral/integral_icon_yqhy.png" alt="">
            <div>
              <p>邀请好友</p>
              <p class="integral">+2 {{ paraphrase({ value: 'integral', options: integralOptions }) }}</p>
            </div>
          </div>
          <div class="card-r">
            <div class="card-btn"> 去完成 </div>
          </div>
        </div>
        <div class="card">
          <div class="card-l">
            <img src="@/assets/images/integral/integral_icon_qdrz.png" alt="">
            <div>
              <p>注册并认证</p>
              <p class="integral">+2 {{ paraphrase({ value: 'integral', options: integralOptions }) }}</p>
            </div>
          </div>
          <div class="card-r">
            <div class="card-btn disabled"> 已完成 </div>
          </div>
        </div>
        <div class="card">
          <div class="card-l">
            <img src="@/assets/images/integral/integral_icon_dzsc.png" alt="">
            <div>
              <p>点赞收藏</p>
              <p class="integral">+2 {{ paraphrase({ value: 'integral', options: integralOptions }) }}</p>
            </div>
          </div>
          <div class="card-r">
            <div class="card-btn disabled"> 已完成 </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, reactive, defineExpose } from 'vue'
import { integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import store from '@/store/index'

let info = computed(() => store.state.user.info)

const state = reactive({
  show: false,
})

const init = (value) => {
  state.show = true
}

defineExpose({ init })

const onCancel = () => {
  state.show = false
}

const onClose = () => {}
</script>

<style lang="scss" scoped>
.main-section {
  :deep(.van-popup) {
    background-color: var(--root-bg-color1);
  }
  .title {
    margin-top: 25px;
    font-size: 18px;
    padding: 0 30px;
  }
  .content {
    padding: var(--root-page-spacing);
    .card {
      background-color: var(--root-bg-color2);
      padding: 19px 16px;
      border-radius: 12px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .card-l {
        display: flex;
        align-items: center;
        font-size: 16px;
        img {
          width: 44px;
          height: 44px;
          margin-right: 12px;
        }
        .integral {
          margin-top: 5px;
          color: var(--root-theme-color);
          font-size: 14px;
        }
      }
      .card-r {
        .card-btn {
          width: 70px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          background-color: #b5d7ff;
          color: var(--root-theme-color);
          border-radius: 22px;
        }
        .disabled {
          background-color: var(--root-text-color4);
          color: var(--root-text-color5);
        }
      }
    }
    .button {
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
      .van-button {
        width: 117px;
        height: 36px;
      }
      .cancel {
        color: var(--root-text-color5);
        background-color: var(--root-button-color1);
      }
      .submit {
        color: var(--root-text-color5);
        background-color: var(--root-theme-color);
      }
    }
  }
}
</style>
