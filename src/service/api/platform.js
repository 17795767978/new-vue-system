export const PlatformApi = {
  platformMenu: [
    {
      name: 'list',
      method: 'POST',
      path: '/api/base/user/getPermissionsByUserId',
      mockPath: '/api/base/user/getPermissionsByUserId',
      params: {
        id: ''
      },
      desc: '获取菜单列表'
    },
    {
      name: 'buttonList',
      method: 'POST',
      path: 'api/user/my/buttonListByMenu',
      mockPath: 'api/user/my/buttonListByMenu',
      params: {},
      desc: '获取按钮权限'
    }
  ]
}
