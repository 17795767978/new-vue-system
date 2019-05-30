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
app.post('/user/login', function (req, res) {
  const { userAccount, userPassword } = req.body
  if (userAccount && userPassword) {
    res.json({
      'head': {
        'success': 'true'
      },
      'data': {
        'token': 'A7D8SKLJZ87D-S8S8AS78DF6S787AS8D7FJCZ685C8DAA-ASD876XIZ'
      }
    })
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
