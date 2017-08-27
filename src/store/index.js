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
import socketPlugin from './plugins'

Vue.use(Vuex)

const state = {
  menus: [
    {
      name: 'vue聊天',
      path: '/exp/chat'
    },
    {
      name: 'oss云上传',
      path: '/exp/ossupload'
    }
  ],
  socket: null
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    chat
  },
  plugins: [socketPlugin]
})
