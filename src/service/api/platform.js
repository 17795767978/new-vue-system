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
      name: 'dataList',
      method: 'POST',
      path: '/api/base/user/getDataPermissionsByUserId',
      mockPath: '/api/base/user/getDataPermissionsByUserId',
      params: {
        id: ''
      },
      desc: '获取数据列表'
    },
    {
      name: 'correlationDataPermissions',
      method: 'POST',
      path: '/api/base/role/correlationDataPermissions',
      mockPath: '/api/base/role/correlationDataPermissions',
      params: {
        roleId: '',
        resourceIds: ''
      },
      desc: '绑定角色数据权限'
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
