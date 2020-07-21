const express = require('express')
const app = express()
/**
 * NOCTURNE MOCK SERVER
 * ==================================
 * Author: Vicco Wang
 * Date: 2019.04.20
 * ==================================
 *
 */

// cross origin
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(express.json())

// user login
app.post('/api/base/login/login', function (req, res) {
  const { userAccount, userPassword } = req.body
  if (userAccount && userPassword) {
    res.json({ 'head': { 'code': '200', 'msg': '成功', 'success': 'true' }, 'code': '200', 'data': { 'userInfo': { 'auditStatus': false, 'createTime': 1559183929958, 'createUser': null, 'describes': null, 'enabled': '1', 'lineUuids': null, 'orgId': null, 'orgName': null, 'roleIds': [], 'roleName': null, 'roles': [], 'updateTime': 1559183929958, 'updateUser': 'xpguo', 'userAccount': 'admin', 'userGender': '1', 'userId': '1', 'userMobile': null, 'userOrgUuid': '1', 'userPassword': 'e10adc3949ba59abbe56e057f20f883e', 'userRealName': '系统管理员', 'userTelephone': null }, 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaXNzIjoiemh4IiwidXNlck5hbWUiOiJhZG1pbiIsImV4cCI6MTU5Nzg5MDMxNywidXNlcklkIjoiMSIsImlhdCI6MTU5NTI5ODMxNywianRpIjoiMjM4NDg3ODEzODQ1NDAzMDlmM2MifQ.RotGBI6X3zYeBYqJB5UAdWGi90gSbuhRnC2slUFzXhI' }, 'message': '成功' })
  }
})

// user info
app.post('/user/info', function (req, res) {
  if (req.headers.authorization) {
    res.json({
      'head': {
        'success': 'true'
      },
      'data': {
        'token': req.headers.authorization,
        'userAccount': 'Administrator',
        'userName': 'Admin',
        'userStatus': '0',
        'roles': [
          'admin',
          'user'
        ]
      }
    })
  }
})

// logout
app.post('/user/logout', function (req, res) {
  if (req.headers.authorization) {
    res.json({
      'head': {
        'msg': '成功',
        'success': 'true',
        'code': '200'
      }
    })
  }
})

app.listen(3000, function () {
  console.info('server is running, enjoy it!')
})
