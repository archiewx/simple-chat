/**
 *  creator: zheng
 *  date: 2017/8/16
 *  email: zhenglfsir@gmail.com
 */

var Mock = require('mockjs')
var friends = [
  {
    uid: '1',
    name: 'developer',
    online: false,
    pic: 'http://img.sc115.com/uploads/allimg/110217/2011021715481789.jpg',
    selected: false
  },
  {
    uid: '2',
    name: '组长',
    online: false,
    pic: 'http://pic.ffpic.com/files/tupian/tupian33.jpg',
    lastMsg: '',
    selected: false
  },
  {
    uid: '3',
    name: '总监',
    online: false,
    pic: 'http://img4.yytcdn.com/artist/fan/150731/0/-M-0ba991ae5522808a2c772eb069080748_0x0.jpg',
    lastMsg: '',
    selected: false
  }
]
// for (let i = 0; i < 7; i++) {
//   friends.push(Mock.mock({
//     uid: Mock.Random.guid(),
//     name: Mock.Random.cname(),
//     pic: Mock.Random.image('300x300'),
//     lastMsg: '',
//     online: Mock.Random.boolean(),
//     selected: false
//   }))
// }
/* eslint-disable no-unused-vars */
function isEmptyObject (o) {
  for (let attr in o) {
    return !1
  }
  return !0
}

const msgs = []
module.exports = {
  bootstrap (app) {
    // socket 设置
    var http = require('http').createServer(app)
    var io = require('socket.io')(http)
    var globalSocket = null
    io.on('connection', function (socket) {
      console.log('[connect]')
      globalSocket = socket
      socket.on('message', data => {
        msgs.push(data)
        const user = friends.find(cv => cv.uid === data.to.uid)
        user.lastMsg = data.content
        socket.broadcast.emit('syncMessage', data.from.uid)
      })
      socket.on('disconnect', reason => {
        console.log('[disconnect]', reason)
        socket.broadcast.emit('syncUser')
      })
    })

    app.use('*', function (req, res, next) {
      next()
    })

    app.use(require('express-session')({
      secret: 'chat',
      resave: false,
      saveUninitialized: true,
      cookie: {secure: true}
    }))

    app.post('/chat/login', function (req, res) {
      const socket = app.get('socket')
      const name = req.query.name
      const user = friends.find(cv => cv.name === name)
      if (user) {
        globalSocket && globalSocket.broadcast.emit('login', user.uid)
        req.session.uid = user.uid
        user.online = true
        res.json({
          msg: '登陆成功',
          data: user
        })
      } else {
        const pic = req.query.pic
        if (!pic) {
          return res.json({
            msg: '未注册',
            code: 110
          })
        }
        const newUser = Mock.mock({
          uid: Mock.Random.guid(),
          name,
          lastMsg: '',
          pic,
          online: true,
          selected: false
        })
        globalSocket && globalSocket.broadcast.emit('syncUser')
        friends.push(newUser)
        res.json({
          msg: '注册成功',
          data: newUser
        })
      }
    })

    app.post('/chat/user', function (req, res) {
      res.json({
        msg: '请求成功',
        data: friends.find(cv => cv.uid === req.query.id)
      })
    })

    app.post('/chat/users', function (req, res) {
      res.json({
        msg: '请求成功',
        data: friends.filter(cv => cv.uid !== req.query.id)
      })
    })
    app.post('/chat/msgs', function (req, res) {
      const toId = req.query.toId  // 接收方id
      const fromId = req.query.fromId // 发送方id
      res.json({
        msg: '请求成功',
        data: msgs.filter(cv => {
          return (cv.to.uid === toId && cv.from.uid === fromId) || (cv.from.uid === toId && cv.to.uid === fromId)
        })
      })
    })
    app.use('/oss', require('./oss'))
    app.use('/qiniu', require('./qiniu'))
    return http
  }
}
