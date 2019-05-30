/**
 * USER API
 * Namespace: User
 */

export const UserApi = {
  user: [
    {
      name: 'login',
      method: 'POST',
      path: '/api/base/login/login',
      mockPath: '/api/base/login/login',
      params: {
        userAccount: '',
        userPassword: ''
      },
      desc: '用户登录'
    },
    {
      name: 'logout',
      method: 'POST',
      path: '/api/base/login/logout',
      mockPath: '/api/base/login/logout',
      params: {
        userAccount: '',
        userId: ''
      },
      desc: '用户注销'
    },
    // {
    //   name: 'info',
    //   method: 'POST',
    //   path: '/user/info',
    //   mockPath: '/user/info',
    //   params: {},
    //   desc: '获取用户信息'
    // },
    {
      name: 'password.edit',
      method: 'POST',
      path: '/user/password/edit',
      mockPath: '/user/password/edit',
      params: {
        oldPassword: '',
        newPassword: ''
      },
      desc: '修改登录用户密码'
    }
  ]
}
