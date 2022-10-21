<template>
  <div class="main-section">
    <van-popup
      v-model:show="state.show"
      position="bottom"
      @closed="onClosed"
      round
      safe-area-inset-bottom
    >
      <div class="title">
        做任务，领取{{ paraphrase({ value: 'integral', options: integralOptions }) }}
      </div>
      <div class="content">
        <div class="card" v-for="(item,index) in state.taskList" :key="index">
          <div class="card-l">
            <img :src="getImageUrl(paraphrase({ value: item.hook, options: taskOptions, l: 'icon' }))" alt="">
            <div>
              <p>{{item.name}}</p>
              <p class="integral">+{{item.reward }}{{ paraphrase({ value: 'integral', options: integralOptions }) }}</p>
            </div>
          </div>
          <div class="card-r">
            <div class="card-btn disabled" v-if="item.state == 1"> 已完成 </div>
            <div v-else @click="onTask(item.hook)">
              <div v-if="item.progress > 0">
                <div class="card-btn"> {{item.progress}}/{{item.number}} </div>
              </div>
              <div class="card-btn" v-else> 
                {{ item.hook === 'sign:in' ? '签到' : '去完成' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { showToast } from 'vant'
import store from '@/store/index'
import { getImageUrl } from '@/utils/index'
import globleFun from '@/utils/link'
import { integralOptions, taskOptions } from '@/utils/explain'
import { paraphrase } from '@/filters/index'
import { tasksList, subTasks } from '@/api/setting'

let info = computed(() => store.state.user.info)
const emit = defineEmits(['refresh'])

const state = reactive({
  show: false,
  taskList: []
})


const init = (value) => {
  getList()
}

const getList = () =>{
  tasksList().then(({ data }) =>{
    state.taskList = [...data.day, ...data.more, ...data.once];
    state.show = true
  })
}

const onTask = (hook) =>{
  const toastHooks = ["share:goods", "show:goods", "collect:goods"]
  const buyHooks = ["buy:goods", "integral:goods"]

  if(hook === 'sign:in') {
    subTasks({ hook }).then(()=>{
      getList()
      emit("refresh")
      showToast("操作成功")
    })
  }
  
  if(hook === "real:name:auth") {
    globleFun.onGoto('/authentication')
  }

  if(hook === "invite:friend") {
    if (info.value?.cer_status !== 1) {
      showToast('请先实名认证')
    } else {
      globleFun.onGoto('/invitation')
    }
  }

  if(buyHooks.includes(hook)) {
    globleFun.onGoto('/dashboard')
  }

  if(toastHooks.includes(hook)) {
    showToast("请下载App进行操作")
  }
}

defineExpose({ init })

const onCancel = () => {
  state.show = false
}

const onClosed = () => {}
</script>

<style lang="scss" scoped>
.main-section {
  :deep(.van-popup) {
    max-width: 375px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: var(--root-bg-color1);
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 25px 30px 15px 30px;
  }
  .content {
    padding: 0 var(--root-page-spacing) var(--root-page-spacing) var(--root-page-spacing);
    max-height: 60vh;
    overflow-y: auto;
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
          background-color: rgba(var(--root-theme-color-rgb), 0.1);
          color: var(--root-theme-color);
          border-radius: 22px;
        }
        .disabled {
          background-color: var(--root-button-color1);
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
