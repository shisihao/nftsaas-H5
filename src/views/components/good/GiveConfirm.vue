<template>
  <div>
    <div class="give-confirm-contain">
      <van-popup v-model:show="state.show" round position="bottom" @closed="onClosed">
        <div class="title">
          转赠给用户「{{ state.name }}」
        </div>
        <div class="content">
          <div class="goods-item">
            <div class="goods-img">
              <van-image
                lazy-load
                fit="cover"
                :src="Array.isArray(row[state.type]?.images) && `${domin}${row[state.type].images[0]}` "
              />
            </div>
            <p>是否确认转赠</p>
            <div class="goods-name">
              {{ row[state.type]?.name }}
            </div>
            <div v-if="state.type === 'goods'" class="goods-num">
              <span>
                <svg-icon icon-class="serial" class-name="icon-serial" />
                {{ `${row?.goods?.serial}#${row.num}/${row?.goods?.cast_goods_stock}` }}
              </span>
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
            确认
          </van-button>
        </div>
      </van-popup>
    </div>
    <pay-pass-popup ref="payPassPopup" />
    <pay-input-popup ref="payInputPopup" @pay-password="onPayPassword" />
  </div>
</template>

<script setup>
import { ref, reactive, inject, computed } from 'vue'
import { showSuccessToast } from 'vant'
import store from '@/store/index'
import { paraphrase } from '@/filters/index'
import globleFun from '@/utils/link'
import { DominKey, getToken } from '@/utils/auth'
import { integralOptions } from '@/utils/explain'
import { sleep } from '@/utils/index'
import { goodGive } from '@/api/goods'
import { boxGive } from '@/api/box'
import PayPassPopup from '../order/PayPassPopup.vue'
import PayInputPopup from '../order/PayInputPopup.vue'

const domin = getToken(DominKey)

const row = inject('item')

const info = computed(() => store.state.user.info)

const payPassPopup = ref(null)
const payInputPopup = ref(null)

const getInitialData = () => ({
  show: false,
  btnLoading: false,
  name: '',
  type: 'goods',
  form: {
    user_goods_id: 0,
    user_box_id: 0,
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
  state.form.interest_goods_id = value.interest_goods_id
  state.form.interest_goods_num = value.interest_goods_num

  if ('box' in row.value) state.type = 'box'
  state.type === 'box' ? state.form.user_box_id = row.value.id : state.form.user_goods_id = row.value.id

  state.show = true
}

defineExpose({ init })

const onClose = () => {
  state.show = false
}

const onClosed = () => {
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
  const type = state.type === 'box'
  const api = type ? boxGive(state.form) : goodGive(state.form)

  api
    .then((response) => {
      showSuccessToast(response.msg)
      onClose()
      sleep(600)
        .then(() => {
          globleFun.onGoto(type ? '/box-list' : '/user', 'replace')
        })
    })
    .finally(() => {
      state.btnLoading = false
    })
}
</script>

<style lang="scss" scoped>
.give-confirm-contain {
  :deep(.van-popup) {
    max-width: var(--root-max-width);
    right: 0;
    margin: 0 auto;
    padding-bottom: 20px;
    overflow: hidden;
    .title {
      font-size: 18px;
      font-weight: 500;
      background-color: var(--root-bg-color1);
      text-align: center;
      padding: 20px 0;
    }
    .content {
      font-size: 14px;
      line-height: 1.5;
      margin-top: 14px;
      padding: 0 var(--root-page-spacing);
      text-align: center;
      p {
        display: inline-block;
        text-align: left;
        color: var(--root-text-color3);
        margin-top: 6px;
      }
      .goods-item {
        padding: 20px 0;
        background-image: linear-gradient(rgba(var(--root-theme-color-rgb), 0.2) 10%, var(--root-bg-color2) 50%);
        border-radius: 12px;
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
          font-size: 18px;
          margin-top: 6px;
          color: var(--root-text-color1);
        }
        .goods-num {
          margin-top: 10px;
          span {
            word-break:break-all;
            color: var(--root-text-color2);
            .icon-serial {
              font-size: 12px;
              color: var(--root-theme-color);
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
      margin-top: 22px;
      display: flex;
      justify-content: space-around;
      .btn {
        font-size: 16px;
        height: auto;
        width: 40%;
        padding: 10px 0;
      }
      .btn-close {
        color: var(--root-text-color5);
        border-radius: 44px;
        background-color: var(--root-button-color1);
      }
      .btn-submit {
        color: var(--root-text-color5);
        border-radius: 44px;
        background-color: var(--root-theme-color);
      }
    }
  }
}
</style>
