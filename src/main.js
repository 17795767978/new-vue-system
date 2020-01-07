// initialize base framework
import Vue from 'vue'
import config from '@/config'
import store from '@/plugins/store'
import inject from '@/plugins/inject'
import router from '@/plugins/router'
import App from './App'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfontWeather/iconfont.css'
import VueJsonp from 'vue-jsonp'
import axios from 'axios'
import * as filters from './config/filter'
// 全局Filter注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(VueJsonp)
// 全局配置项
Vue.use(config)
// 注入自定义组件和方法
Vue.use(inject)

Vue.use(ElementUI)

Vue.prototype.$echarts = echarts

Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
