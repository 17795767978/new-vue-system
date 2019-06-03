export const RoleApi = {
  role: [
    {
      name: 'list',
      method: 'POST',
      path: '/api/base/role/list',
      mockPath: '/api/base/role/list',
      params: {
        pageSize: '',
        pageNumber: ''
      },
      desc: '角色列表'
    },
    {
      name: 'detail',
      method: 'POST',
      path: '/api/base/role/detail',
      mockPath: '/api/base/role/detail',
      params: {
        id: ''
      },
      desc: '查看角色'
    },
    {
      name: 'update',
      method: 'POST',
      path: '/api/base/role/update',
      mockPath: '/api/base/role/update',
      params: {
        id: ''
      },
      desc: '修改角色'
    },
    {
      name: 'add',
      method: 'POST',
      path: '/api/base/role/add',
      mockPath: '/api/base/role/add',
      params: {
        roleName: '',
        enabled: ''
      },
      desc: '新增角色'
    },
    {
      name: 'delete',
      method: 'POST',
      path: '/api/base/role/delete',
      mockPath: '/api/base/role/delete',
      param: {
        id: ''
      },
      desc: '删除角色'
    }
  ]
}
