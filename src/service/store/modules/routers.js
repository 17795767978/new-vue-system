// import _flattenDeep from 'lodash/flattenDeep'
import { constantRouterMap } from '@/router/staticRoutes'
import { aysncRoutesMap } from '@/router/aysncRoutes'
import api from '@/plugins/api'
import { ROUTER_DEFAULT_CONFIG } from '@/config/settings'
// layout component
import Layout from '@/components/layout'
// async load
const _import_ = file => () => import('@/views/' + file + '.vue')

/**
 * 判断传入的权限是否能和路由匹配
 * @param {} roles
 * @param {*} route
 */
function hasPermission (roles, route) {
  // admin is the super user
  // if (roles.indexOf('admin') >= 0) return true
  // 跳转路由不包含meta.role,则表示不需要验证权限
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 通过权限过滤出可供访问的路由表
 * @param {*} asyncRoutesMap
 * @param {*} roles
 */
function filterAsyncRoutes (asyncRoutesMap, roles) {
  const filterRoutes = asyncRoutesMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        filterAsyncRoutes(route.children, roles)
      }
      return true
    }
    return false
  })
  return filterRoutes
}

/**
 * 过滤获取主页路由
 * @param {*} routes
 */
function getHomePage (routes) {
  //
  let homeRoutes = []
  //
  function getHomeRoutes (selectRoutes) {
    for (let i = 0; i < selectRoutes.length; i++) {
      const route = selectRoutes[i]
      if (route.children) {
        getHomeRoutes(route.children)
      }
      if (route.meta && route.meta.isHome) {
        homeRoutes.push(route)
        break
      }
    }
  }
  //
  getHomeRoutes(routes)
  //
  return homeRoutes
}

/**
 * 动态路由创建, 可以读取静态文件,也可以后端维护实现权限分级菜单;
 *
 * @param {Array} remoteRoutes 远程获取到的路由表数据
 * @returns {Array} 重构的vue路由表
 */
function generateNewRoutes (remoteRoutes) {
  let addRouters = []
  /**
   * 创建子路由
   * @param { Array } childRoute
   */
  const _createRoutes = (childRoute) => {
    const newRoute = childRoute.map(route => {
      const addChildRoute = {
        path: route.path,
        name: route.name,
        component: _import_(route.component),
        meta: { ...route.meta }
      }
      // 如果有子路由,则递归创建
      if (route.children && route.children.length) {
        addChildRoute.children = _createRoutes(route.children)
      }
      return addChildRoute
    })
    return newRoute
  }

  /**
   * 创建父路由
   */
  remoteRoutes.forEach(route => {
    let newRoute = {
      path: route.path,
      component: Layout,
      meta: { ...route.meta }
    }
    // 判断是否有子路由
    if (route.children && route.children.length) {
      newRoute.children = _createRoutes(route.children)
    }
    addRouters.push(newRoute)
  })
  return addRouters
}

// 递归roles

function getRoles (roles) {
  let roleData = []
  function filterRoles (roles) {
    roles.forEach(role => {
      role.roles.forEach(i => {
        roleData.push(i)
      })
      if (role.children && role.children.length > 0) {
        filterRoles(role.children)
      }
    })
  }
  filterRoles(roles)
  return roleData
}

const routers = {
  //
  state: {
    homepage: null, // 系统进入首屏（首页）
    addRouters: null, // 动态添加的路由表
    router: constantRouterMap // 静态路由表或和动态路由表合并后的总路由表
  },

  mutations: {
    SET_ROUTERS: (state, { addRoutes, routerRawData }) => {
      state.addRouters = addRoutes
      state.router = constantRouterMap.concat(addRoutes)
      const homePageRoute = getHomePage(addRoutes)
      state.homepage = homePageRoute.length
        ? homePageRoute[0]
        : {
          name: 'Homepage',
          path: '/Homepage/home'
        }
    },
    RESET_ROUTERS: (state, router) => {
      state.homepage = null
      state.addRouters = null
      state.router = constantRouterMap
    }
  },

  actions: {
    generateRouters: (context, roles) => {
      // 获取静态路由
      if (ROUTER_DEFAULT_CONFIG.isUseStaticRouter) {
        return new Promise((resolve, reject) => {
          // 这里通过权限来过滤出该权限所拥有的动态路由表,然后再SET_ROUTERS
          let rolesData = getRoles(roles)
          console.log(getRoles(roles))
          const addRoutes = filterAsyncRoutes(aysncRoutesMap, rolesData)
          context.commit('SET_ROUTERS', { addRoutes, routerRawData: null })
          resolve({
            addRoutes,
            homepage: context.state.homepage
          })
        })
      // 获取动态路由
      } else {
        return api['platformMenu.list']({ userRoles: roles }).then(routerRawData => {
          const addRoutes = generateNewRoutes(routerRawData)
          context.commit('SET_ROUTERS', { addRoutes, routerRawData })
          return {
            addRoutes,
            homepage: context.state.homepage
          }
        })
        // }
      }
    }
  }

}

export default routers
