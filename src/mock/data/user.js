/**
 *  creator: zheng
 *  date: 2017/8/15
 *  email: zhenglfsir@gmail.com
 */
import Mock from 'mockjs'

const user = {
  uid: 1,
  name: 'developer',
  pic: 'http://img.sc115.com/uploads/allimg/110217/2011021715481789.jpg'
}

const friends = [
  {
    uid: 2,
    name: '组长',
    online: true,
    pic: 'https://img.aitaotu.cc:8089/Thumb/2016/0314/34e624854fcee8f31d1c2180d0e31cd6.jpg',
    lastMsg: '',
    selected: false
  },
  {
    uid: 3,
    name: '总监',
    online: false,
    pic: 'http://img4.yytcdn.com/artist/fan/150731/0/-M-0ba991ae5522808a2c772eb069080748_0x0.jpg',
    lastMsg: ''
  }
]

for (let i = 0; i < 5; i++) {
  friends.push(Mock.mock({
    uid: Mock.Random.guid(),
    name: Mock.Random.cname(),
    pic: Mock.Random.image('300x300'),
    lastMsg: '',
    online: false,
    selected: false
  }))
}

export {
  user, friends
}
