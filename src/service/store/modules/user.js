import { getToken, setToken, removeToken } from '@/service/expands/auth'
import api from '@/plugins/api'
import store from '@/plugins/store'
import moment from 'moment'

// import { constantRouterMap } from '@/router/staticRoutes'
/**
 * User STORE
 */
let data = moment(new Date()).valueOf()
let currentHour = moment(new Date()).format('HH:00')
let dateBefore = data - 24 * 3600 * 1000 * 7
dateBefore = moment(dateBefore).format('YYYY-MM-DD')
data = moment(data).format('YYYY-MM-DD')
const user = {
  state: {
    // userId: '',
    userAccount: '',
    userName: '',
    userStatus: '',
    userId: '',
    userInfo: {},
    // avatar: '../static/myAvatar200.png', // static
    token: getToken(),
    // routers: {
    //   addRouters: [],
    //   router: constantRouterMap,
    //   homepage: '/homepage/home'
    // },
    roles: null, // 权限应该是返回个数组对象
    initLineId: '',
    formData: {
      orgId: '',
      lineId: '',
      lineIds: [],
      lineOrgId: '',
      lineLineId: ''
    }
  },

  mutations: {
    SET_TOKEN (state, data) {
      state.userInfo = data.userInfo
      state.token = data.token
      setToken(data.token)
    },
    REMOVE_TOKEN (state, data) {
      state.token = null
      removeToken()
    },
    SET_USERINFO (state, data) {
      state.userId = data
      state.userName = localStorage.getItem('userName')
    },
    RESET_USERINFO (state, data) {
      state.userId = ''
      state.userAccount = ''
      state.userName = ''
      state.userStatus = ''
      // state.avatar = ''
      state.roles = null
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LINEID: (state, lineId) => {
      state.initLineId = lineId
    },
    SET_FORM_DATA: (state, formData) => {
      state.formData = formData
    }
    // SET_ROUTERS (state, router) {
    //   state.routers.addRouters = router
    //   state.routers.router = constantRouterMap.concat(router)
    // }
  },

  actions: {
    /**
     * 用户登录
     * 需要通过mutation在浏览器中创建Token cookie保证一定的登录实效性;
     *
     * @param {any} {commit}
     * @param {any} params
     * @returns
     */
    userLogin ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        // commit('SET_TOKEN', 'asdasdasdcascasdasdasdasdasdasdasdasdasdasdgvsdfgsdfsadfasfdas')
        // resolve()
        api['user.login'](params).then(res => {
          localStorage.setItem('userName', res.userInfo.userAccount)
          commit('SET_TOKEN', { token: res.token, userInfo: res.userInfo })
          localStorage.setItem('id', res.userInfo.userId)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 用户注销
     * 需要通过mutations移除浏览器的Token cookie,并做一些相关注销处理
     *
     * @param {any} {commit}
     * @returns
     */
    userLogout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 重置用户相关信息
        commit('REMOVE_TOKEN')
        // 重置用户信息
        commit('RESET_USERINFO')
        // 重置浏览记录以及tab页面记录等,该mutation访问 store/views.js
        commit('REMOVE_ALL_VISITED')
        // 重置权限路由表, 该mutation 访问 store/asyncRouter.js
        commit('RESET_ROUTERS')
        // 清除用户的id 清除权限
        localStorage.removeItem('id')
        localStorage.removeItem('userName')
        resolve()
      })
    },
    /**
     * 获取用户信息
     * 返回当前用户的基础信息
     *
     * @param {any} {commit}
     * @param {any} params
     * @returns
     */
    getUserInfo ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        let form = {
          lineType: '1',
          currentDate: data,
          startHour: '06:00',
          endHour: currentHour,
          dateArray: [dateBefore, data],
          startStation: '',
          endStation: '',
          lineIds: []
        }
        store.dispatch('getLineList').then(res => {
          if (res.length > 0) {
            form.lineId = ''
          }
          commit('SET_LINEID', res.length > 0 && res[0].value)
          store.dispatch('getComList').then(res => {
            if (res.length > 0) {
              form.orgId = res[0].value
            }
            store.dispatch('getLineList', form.orgId).then(res => {
              if (res.length > 0) {
                form.lineId = res[0].value
              }
            })
          })
          // store.dispatch('getComSecList').then(res => {
          //   if (res.length > 0) {
          //     form.lineOrgId = res[0].value
          //     store.dispatch('getLineSecList', form.lineOrgId).then(res => {
          //       if (res.length > 0) {
          //         form.lineLineId = res[0].value
          //       }
          //     })
          //   }
          // })
          // store.dispatch('getLineSecList').then(res => {
          //   form.linelineID = res[0].value
          // })
          commit('SET_FORM_DATA', form)
          api['platformMenu.list']({
            id: localStorage.getItem('id')
          }).then(res => {
            const data = res
            if (data.resourceTree && data.resourceTree.length > 0) {
              commit('SET_ROLES', data.resourceTree)
              commit('SET_USERINFO', data.userOrgId)
            } else {
              alert('管理员请先设置权限再登录')
              commit('SET_USERINFO', '')
              commit('SET_ROLES', 'error')
            }
            resolve(res.resourceTree)
          }).catch(err => {
            reject(err)
          })
        })
      })
    }
  }

}

export default user
