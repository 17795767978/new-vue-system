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
    },
    {
      name: 'addResource',
      method: 'POST',
      path: '/api/base/resource/add',
      mockPath: '/api/base/resource/add',
      params: {
        resourceName: '',
        resourceParentId: '',
        resourceTitle: '',
        resourceUrl: '',
        resourceSort: '',
        resourceImage: '',
        resourceComponent: '',
        enabled: ''
      },
      desc: '新增资源'
    }
  ]
}
