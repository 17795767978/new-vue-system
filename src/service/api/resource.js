export const ResourceApi = {
  resource: [
    {
      name: 'list',
      method: 'POST',
      path: '/api/base/resource/list',
      mockPath: '/api/base/resource/list',
      params: {
        userAccount: '',
        userPassword: '',
        userGender: '',
        userReallName: '',
        enabled: ''
      },
      desc: '新增用户'
    },
    {
      name: 'updateRole',
      method: 'POST',
      path: '/api/base/role/correlationPermissions',
      mockPath: '/api/base/role/correlationPermissions',
      params: {
        resourceIds: [],
        roleId: ''
      },
      desc: '角色绑定权限（资源）'
    }
  ]
}
