/**
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 */
import { JOIN_CHAT } from './mutation-types'
import io from 'socket.io-client'

export default {
  [JOIN_CHAT] (state) {
    state.socket = io()
  }
}
