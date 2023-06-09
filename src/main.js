import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
// 加载Vant 核心组件库
import Vant from 'vant'
// 加载Vant 全局样式
import 'vant/lib/index.css'
// 加载动态设置 rem 基准值
import 'amfe-flexible'
import './utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
