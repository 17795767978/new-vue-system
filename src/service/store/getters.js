const getters = {
  // 平台
  systemTheme: state => state.platform.systemTheme,
  theme: state => state.platform.theme,
  shortcutMenu: state => state.platform.shortcutMenu,
  sidebarState: state => state.platform.sidebarState,
  headerHeight: state => state.platform.headerHeight,
  tagTabHeight: state => state.platform.tagTabHeight,
  // 用户
  userAccount: state => state.user.userAccount,
  userName: state => state.user.userName,
  userId: state => state.user.userId,
  // userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  initLineId: state => state.user.initLineId,
  // 路由
  addRouters: state => state.routers.addRouters,
  asyncRouter: state => state.routers.router,
  homepage: state => state.routers.homepage,
  // 页面
  cachedViews: state => state.views.cachedViews,
  visitedViews: state => state.views.visitedViews,
  // echarts状态
  renderId: state => state.query.renderId,
  queryId: state => state.query.queryId
}

export default getters
