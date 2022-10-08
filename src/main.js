import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import globleFun from './utils/link'

import Vant from 'vant'
import { Lazyload } from 'vant' 
import 'vant/lib/index.css'
import '@/plugins/theme.scss'
// import 'lib-flexible/flexible'

import 'normalize.css/normalize.css'
import '@/assets/iconfont/iconfont.css'

import "./assets/iconfont/iconfont.js"
import "./assets/iconfont/iconfont.css"

import './permission'
import "./utils/rem"

const app = createApp(App)

import { useSvgIcon } from "./icons"
useSvgIcon( app )

const getServerConfig = async() => {
  app
      .use(router)
      .use(store)
      .use(Vant)
      .use(Lazyload)
  await router.isReady()
  app.mount('#root', false)

  // 设置全局
  app.config.globalProperties.$globleFun = globleFun

}
getServerConfig()



