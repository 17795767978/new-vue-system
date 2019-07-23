export const PermissionApi = {
  permission: [
    {
      name: 'add',
      method: 'POST',
      path: '/api/base/user/add',
      mockPath: '/api/base/user/add',
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
      name: 'userList',
      method: 'POST',
      path: '/api/base/user/list',
      mockPath: '/api/base/user/list',
      params: {
        pageSize: '',
        pageNumber: ''
      },
      desc: '用户列表'
    },
    {
      name: 'update',
      method: 'POST',
      path: '/api/base/user/update',
      mockPath: '/api/base/user/update',
      params: {
      },
      desc: '修改用户'
    },
    {
      name: 'delete',
      method: 'POST',
      path: '/api/base/user/delete',
      mockPath: '/api/base/user/delete',
      params: {
        id: ''
      },
      desc: '删除用户'
    },
    {
      name: 'detail',
      method: 'POST',
      path: '/api/base/user/detail',
      mockPath: '/api/base/user/detail',
      param: {
        id: ''
      },
      desc: '查看用户'
    }
  ]
}
