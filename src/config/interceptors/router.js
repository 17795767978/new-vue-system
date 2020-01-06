import router from '@/plugins/router'
import store from '@/plugins/store'
import { getToken } from '@/service/expands/auth'

const whiteList = ['/login']

export function routerBeforeEachFunc (to, from, next) {
  if (getToken() && to.path !== '/yyjk/sso') {
    if (to.path === '/login') {
      next('/login')
    } else {
      /**
       * 首次进入系统，刷新页面会需要重新获取用户权限信息
       * 如果没有获取到当前用户的权限数据则需要远程获取用户权限
       */
      if (!store.getters.roles) {
        // TODO 还没有权限部分 获取权限列表
        store.dispatch('getUserInfo').then(res => {
          // 根据获取到的用户权限来构建动态路由表,或者做其他事情;
          store.dispatch('generateRouters', res)
            .then(context => {
              router.addRoutes(context.addRoutes)
              // 每次刷新页面都回到dash页面
              // const reg = new RegExp(context.homepage.path + '$')
              // if (!reg.test(to.path) || to.path !== '/') {
              //   next({ name: context.homepage.name, replace: true })
              // } else {
              next({ ...to, replace: true })
              // }
            })
        })
        // 未刷新页面,在系统中跳转路由
      } else {
        if (to.name === null) {
          next({ path: '*', replace: true })
        } else {
          next()
        }
      }
    }
  } else if (to.path === '/yyjk/sso') {
    // 如果是单点登录，判断是否有token，如果有则清除token后再次获取新的用户token
    if (getToken()) {
      store.dispatch('userLogout').then(() => {
        location.reload()
      })
      next()
    } else {
      // 如果没有token 则直接请求登录
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
}
