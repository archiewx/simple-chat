/**
 *  creator: zheng
 *  date: 2017/8/15
 *  email: zhenglfsir@gmail.com
 */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { user, friends } from './data/user'

export default {
  bootstrap () {
    const mock = new MockAdapter(axios)
    mock.onGet('/chat/user').reply(config => {
      if (config.parmas) {
        return [200, {
          msg: '获取成功',
          data: friends.find(cv => cv.uid === config.parmas.id)
        }]
      } else {
        return [200, {
          msg: '获取成功',
          data: user
        }]
      }
    })
    // mock.onGet('/chat/users').reply(200, {
    //   msg: '获取成功',
    //   data: friends
    // })
    mock.onGet('/chat/messages').reply(200, {
      msg: '获取成功'
    })
  }
}
