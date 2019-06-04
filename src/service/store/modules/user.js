import { getToken, setToken, removeToken } from '@/service/expands/auth'
import api from '@/plugins/api'
// import { constantRouterMap } from '@/router/staticRoutes'
/**
 * User STORE
 */

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
    roles: null // 权限应该是返回个数组对象
  },

  mutations: {
    SET_TOKEN (state, data) {
      state.userInfo = data.userInfo
      // state.userId = data.userInfo.userId
      state.token = data.token
      setToken(data.token)
    },
    REMOVE_TOKEN (state, data) {
      state.token = null
      removeToken()
    },
    SET_USERINFO (state, data) {
      // state.userId = data.userId
      state.userAccount = data.userAccount
      state.userName = data.userName
      state.userStatus = data.userStatus
      state.roles = data.roles // static roles
      // state.avatar = data.avatar
    },
    RESET_USERINFO (state, data) {
      // state.userId = ''
      state.userAccount = ''
      state.userName = ''
      state.userStatus = ''
      // state.avatar = ''
      state.roles = null
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
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
          commit('SET_TOKEN', { token: res.token, userInfo: res.userInfo })
          localStorage.setItem('id', res.userInfo.userId)
          // commit('SET_ROUTERS', res.userResource)
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
        //
        localStorage.removeItem('id')
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
        // if (state.userInfo) {
        //   if (!state.userInfo.roles) {
        //     state.userInfo.roles = ['admin', 'user']
        //   }
        //   commit('SET_USERINFO', state.userInfo)
        //   resolve(state.userInfo)
        // } else {
        //   reject(state.userInfo)
        // }
        api['platformMenu.list']({
          id: localStorage.getItem('id')
        }).then(res => {
          const data = res
          if (data && data.length > 0) {
            commit('SET_ROLES', data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

}

export default user
