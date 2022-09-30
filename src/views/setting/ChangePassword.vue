<template>
  <div class="change-section">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="state.form.old_password"
          type="password"
          name="old_password"
          label="旧密码"
          placeholder="请输入旧密码"
          autocomplete="off"
          clearable
          :rules="[{ required: true, message: '请填写旧密码' }]"
        />
        <van-field
          v-model="state.form.password"
          type="password"
          name="password"
          label="新密码"
          placeholder="请输入新密码"
          autocomplete="off"
          clearable
          :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <van-field
          v-model="state.form.password_confirmation"
          type="password"
          name="password_confirmation"
          label="确认密码"
          placeholder="请再次输入新密码"
          autocomplete="off"
          clearable
          :rules="[{ required: true, message: '请填写确认密码' }]"
        />
      </van-cell-group>
      <div class="change-row">
        <div class="password-tips">
          *限6-20个字符以内，建议使用数字字母组合，区分大小写
        </div>
        <van-button
          round
          block
          class="submit-button"
          type="primary"
          native-type="submit"
          loading-text="请求中..."
          :loading="state.btnLoading"
        >
          确认
        </van-button>
        <div class="forget" @click="$globleFun.onGoto('/forgot')">
          忘记密码？
        </div>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { changePassword } from '/@/api/user'
import { showToast } from 'vant'
import globleFun from '/@/utils/link'

const validatorPassWord = (value, rule) => {
  if (value.length < 6) return '密码不能小于6位'
  if (value.length > 20) return '密码不能大于20位'
  return true
}

const validatorPassWord1 = (value, rule) => {
  if (value !== state.form.password) return '两次密码输入不一致'
  return true
}

const state = reactive({
  btnLoading: false,
  form: {
    old_password: '',
    password: '',
    password_confirmation: ''
  },
  rules: {
    old_password: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord }
    ],
    password: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord }
    ],
    password_confirmation: [
      { required: true, message: '不能为空' },
      { validator: validatorPassWord1 }
    ],
  }
})

const onSubmit = () => {
  state.btnLoading = true
  changePassword(state.form)
    .then(({ msg = '修改成功' }) => {
      showToast(msg)
      globleFun.onGoto('/setting')
    })
    .finally(() => {
      state.btnLoading = false
    })
}

</script>

<style lang="scss" scoped>
.change-section {
  overflow: hidden;
  .van-form {
    margin-top: 10px;
    .van-cell-group {
      background: none;
      background-color: var(--root-bg-color1);
      &::after {
        border-width: 0;
      }
      .van-cell {
        background-color: var(--root-bg-color1);
        :deep(.van-field__label) {
          color: var(--root-text-color1);
        }
        :deep(.van-field__value) {
          input {
            color: var(--root-text-color1);
          }
        }
        &::after {
         border-color: var(--root-dividing-color1); 
        }
      }
    }
    .change-row {
      padding: 0 var(--root-page-spacing);
      .password-tips {
        margin-top: 24px;
        font-size: 12px;
        color: var(--root-text-color2);
      }
      .submit-button {
        margin-top: 50px;
        background-image: var(--root-button-color1);
      }
      .forget {
        margin-top: 30px;
        font-size: 16px;
        text-align: center;
        color: var(--root-text-color2);
      }
    }
  }
}
</style>
