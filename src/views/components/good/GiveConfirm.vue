<template>
  <div>
    <div class="give-confirm-contain">
      <van-popup v-model:show="state.show" round position="bottom" >
        <div class="title">
          转赠藏品
        </div>
        <div class="content">
          <p>是否将“{{ row?.goods?.name }}”转赠给用户「{{ state.name }}」</p>
          <div class="goods-item">
            <div class="goods-img">
              <van-image
                lazy-load
                fit="cover"
                :src="Array.isArray(row?.goods?.images) && `${domin}${row.goods.images[0]}` "
              />
            </div>
            <div class="goods-name">
              {{ row?.goods?.name }}
            </div>
            <div class="goods-num">
              <span>{{ `${row?.goods?.serial}#${row.num}/${row?.goods?.cast_goods_stock}` }}</span>
            </div>
            <!-- <div class="collection-gather">
              <div class="avatar">
                <default-avatar v-if="row?.goods?.author_avatar" :src="`${domin}${row.goods.author_avatar}`" />
                <default-avatar v-else />
              </div>
              <div class="name">
                {{ row?.goods?.author }}
              </div>
            </div> -->
          </div>
        </div>
        <div class="button-row">
          <van-button class="btn btn-close" round @click="onClose">
            取消
          </van-button>
          <van-button class="btn btn-submit" round loading-text="请求中..." :loading="state.btnLoading" @click="onSubmit">
            确认转赠
          </van-button>
        </div>
      </van-popup>
    </div>
    <pay-pass-popup ref="payPassPopup" />
    <pay-input-popup ref="payInputPopup" @pay-password="onPayPassword" />
  </div>
</template>

<script setup>
import { ref, reactive, defineExpose, inject, computed } from 'vue'
import store from '@/store/index'
import globleFun from '@/utils/link'
import { DominKey, getToken } from '@/utils/auth'
import { integralOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import { giveGoods } from '@/api/goods'
import PayPassPopup from '../order/PayPassPopup.vue'
import PayInputPopup from '../order/PayInputPopup.vue'
import { showSuccessToast } from 'vant'

const domin = getToken(DominKey)

const row = inject('item')

const info = computed(() => store.state.user.info)

const payPassPopup = ref(null)
const payInputPopup = ref(null)

const getInitialData = () => ({
  show: false,
  btnLoading: false,
  name: '',
  form: {
    user_goods_id: 0,
    account: '',
    pay_password: '',
    interest_goods_id: '',
    interest_goods_num: ''
  }
})

const state = reactive(getInitialData())

const init = (value) => {
  state.name = value.name
  state.form.account = value.account
  state.form.user_goods_id = row.value.id
  state.form.interest_goods_id = value.interest_goods_id
  state.form.interest_goods_num = value.interest_goods_num
  state.show = true
}

defineExpose({ init })

const onClose = () => {
  Object.assign(state, getInitialData())
}

const onSubmit = () => {
  if (!info.value.paypass_status) {
    payPassPopup.value.init()
  } else {
    payInputPopup.value.init()
  }
}

const onPayPassword = (value) => {
  state.form.pay_password = value
  state.btnLoading = true
  giveGoods(state.form)
    .then((response) => {
      showSuccessToast(response.msg)
      onClose()
      globleFun.onGoto(-1, 'go')
    })
    .finally(() => {
      state.btnLoading = false
    })
}
</script>

<style lang="scss" scoped>
.give-confirm-contain {
  :deep(.van-popup) {
    width: 288px;
    border-radius: 12px;
    padding-bottom: 20px;
    overflow: visible;
    .title {
      font-size: 18px;
      color: var(--root-text-color1);
      text-align: center;
      margin-top: 24px;
    }
    .content {
      font-size: 14px;
      line-height: 1.5;
      color: var(--root-text-color3);
      margin-top: 14px;
      padding: 0 var(--root-page-spacing);
      text-align: center;
      p {
        display: inline-block;
        text-align: left;
      }
      .goods-item {
        margin-top: 10px;
        .goods-img {
          width: 128px;
          height: 128px;
          margin: 0 auto;
          .van-image {
            border-radius: 8px;
            overflow: hidden;
          }
        }
        .goods-name {
          margin-top: 10px;
          @include textoverflow()
        }
        .goods-num {
          margin-top: 10px;
          span {
            word-break:break-all;
            color: var(--root-text-color2);
            position: relative;
            padding-left: 18px;
            &::before {
              content: '';
              width: 14px;
              height: 14px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100%;
              background-image: url('@/assets/images/public/common_icon_number.png');
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        }
        .collection-gather {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .avatar {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
          }
          .name {
            padding-left: 6px;
            font-size: 13px;
            color: var(--root-text-color2);
            @include textoverflow()
          }
        }
      }
    }
    .button-row {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 16px;
        height: auto;
        padding: 8px 22px;
      }
      .btn-close {
        color: var(--root-text-color3);
        border-radius: 44px;
        background-color: rgba(75, 75, 89, 0.1);
      }
      .btn-submit {
        color: var(--root-bg-color1);
        border-radius: 44px;
        background-image: var(--root-button-color1);
      }
    }
  }
}
</style>
