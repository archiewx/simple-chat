/**
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import chat from './modules/chat'
import plugins from './plugins'
import io from 'socket.io-client'

Vue.use(Vuex)

const state = {
  menus: [
    {
      name: 'vue聊天',
      path: '/exp/chat'
    }
  ],
  socket: null
}
state.socket = io()
const serverPlugin = plugins.createWebSocketPlugin(state.socket)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    chat
  },
  plugins: [serverPlugin]
})
