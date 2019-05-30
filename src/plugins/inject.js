import Vue from 'vue'
import store from '@/plugins/store'
import router from '@/plugins/router'
import api from './api'
import axios from './axios'
import promise from './promise'
import { Loading, MessageBox } from 'element-ui'
// element-ui styles
import '@/styles/element-variables.scss'
// global extends styles
import '@/styles/index.scss'
//
import '@/assets/iconfont/iconfont.css'
// beauti context
import BeautiContext from '@/components/beautiContext'
// nextPage
import NextPage from '@/components/nextPage/'
// system theme
import loadCurrentTheme from '@/service/expands/theme'

Vue.use(promise)
Vue.use(Loading.directive)
Vue.use(NextPage, { router, store })
Vue.use(BeautiContext)
Vue.use(loadCurrentTheme, { store })

export default {
  install (Vue) {
    Vue.prototype.$api = api
    Vue.prototype.$ajax = axios
    // 框架基础需求的element-ui components
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$ELEMENT = { size: 'small' }
  }
}
