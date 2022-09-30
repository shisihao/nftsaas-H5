<template>
  <div class="main-section">
    <van-popup
      v-model:show="state.show"
      position="bottom"
      @closed="onClose"
    >
      <div class="title">
        修改昵称
      </div>
      <div class="content">
        <van-form ref="form" @submit="onSubmit">
          <van-cell-group>
            <van-field
              v-model="state.form.name"
              clearable
              name="name"
              placeholder="请输入昵称"
              maxlength="10"
              autocomplete="off"
              input-align="center"
              :rules="state.rules.name"
            />
          </van-cell-group>
          <div class="tips">
            *限10个字符以内，支持中英数字及下划线
          </div>

          <div class="button">
            <van-button class="cancel" round block plain @click="onCancel">
              取消
            </van-button>
            <van-button class="submit" round block native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, reactive, defineExpose } from 'vue'
import store from '/@/store/index'
import { putUser } from '/@/api/user'
import globleFun from '/@/utils/link'
import { showToast } from 'vant'
import { isSpace } from '/@/utils/validate'

defineProps({
  title: {
    type: String,
    default: ''
  },
})

const validatorName = (value) => {
  if (isSpace(value)) return '不能包含空格'
  if (value.length < 3 || value.length > 10) return '昵称在3-10个字符之间'
  return true
}

let info = computed(() => store.state.user.info)
let form = ref(null)

const state = reactive({
  show: false,
  form: {
    name: '',
    avatar: ''
  },
  rules: {
    name: [
      { required: true, message: '请填写昵称' },
      { validator: validatorName }
    ]
  }
})

const init = (value) => {
  state.form.name = { ...value }.name
  state.show = true
}

defineExpose({ init })

const onCancel = () => {
  state.form.name = ''
  state.show = false
}

const onClose = () => {
  form.value.resetValidation()
}

const onSubmit = () => {
  if (state.form.name === info.value.name) {
    return showToast('昵称未改变')
  }

  putUser(state.form)
    .then(() => {
      onCancel()
      showToast('修改成功')
      store.dispatch('user/getInfo')
    })
}
</script>

<style lang="scss" scoped>
.main-section {
  :deep(.van-popup) {
    background-color: var(--root-bg-color1);
    padding-bottom: 50px;
  }
  .title {
    margin-top: 25px;
    font-size: 18px;
    text-align: center;
  }
  .content {
    .van-cell-group {
      margin: 0 40px;
      background: none;
      &::after {
        content: '';
        border: 0;
      }
      .van-cell {
        background: none;
        background-color: transparent;
        overflow: visible;
        :deep(.van-cell__value) {
          position: relative;
          .van-field__body {
            background-color: var(--root-bg-color2);
            padding: 10px 10px;
            input {
              color: var(--root-text-color1);
            }
          }
          .van-field__error-message {
            position: absolute;

          }
        }
      }
    }
    .tips {
      margin-top: 12px;
      font-size: 12px;
      text-align: center;
      color: var(--root-text-color3);
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
        color: var(--root-theme-color);
        background: none;
        border: 1px solid var(--root-theme-color);
      }
      .submit {
        color: var(--root-text-color1);
        background-image: var(--root-button-color1);
      }
    }
  }
}
</style>
