/**
 *  creator: zheng
 *  date: 2017/8/15
 *  email: zhenglfsir@gmail.com
 */
import { SEND_MESSAGE } from './mutation-types'

export default {
  createWebSocketPlugin (socket) {
    return store => {
      socket.on('connect', () => {
        console.log('[connected]')
      })
      socket.on('discount', () => {
        console.log('[discount]')
      })
      socket.on('data', data => {
        store.commit('receiveData', data)
      })

      socket.on('message', data => {
        console.log(data)
      })

      socket.on('syncMessage', fromId => {
        console.log('同步消息')
        store.dispatch('syncMessage', fromId)
      })

      socket.on('syncUser', () => {
        console.log('同步好友')
        if (store.state.chat.session.uid) {
          store.dispatch('syncUser')
        }
      })

      socket.on('login', uid => {
        console.log('[login]')
        if (store.state.chat.session.uid) {
          store.dispatch('userOnline', uid)
        }
      })

      store.subscribe(mutation => {
        if (mutation.type === SEND_MESSAGE) {
          socket.send(mutation.payload)
        }
      })
    }
  }
}
