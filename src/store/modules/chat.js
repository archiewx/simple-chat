/**
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 */
import * as types from '../mutation-types'
import api from '../../api'
import Mock from 'mockjs'

const state = {
  session: {},
  friends: [],
  msgs: [],
  currentMsgs: [],
  toUser: {},
  message: '',
  error: false,
  el: null,
  toBottom: true
}
const getters = {
  getSession: state => state.session,
  getUsers: state => state.friends,
  getCurrentMsgs: state => state.currentMsgs,
  getToUser: state => state.toUser,
  getMessage: state => state.message
}
const mutations = {
  [types.SEND_MESSAGE] (state, msg) {
    state.msgs.push(msg)
    state.currentMsgs.push(msg)
    const user = state.friends.find(cv => msg.to.uid === cv.uid)
    user.lastMsg = msg.content
    state.message = ''
  },
  [types.GET_USERS] (state, users) {
    state.friends = users
  },
  [types.SAVE_SESSION] (state, user) {
    state.session = user
  },
  [types.CHANGE_FRIEND] (state, {msgs, user}) {
    state.currentMsgs = msgs
    state.toUser = user
  },
  [types.SYNC_MESSAGE] (state, {msgs, toId}) {
    console.log(msgs, toId)
    state.currentMsgs = msgs
    const user = state.friends.find(cv => toId === cv.uid)
    console.log(user)
    user.lastMsg = msgs[msgs.length - 1].content
  },
  [types.REQUEST_ERROR] (state, errMsg) {
    state.error = true
  },
  [types.SYNC_USER] (state, users) {
    console.log('[sync users]', users)
    state.friends = users
  },
  [types.NEW_USER] (state, user) {
    console.log('[new user]', user)
    state.friends.push(user)
  },
  [types.USER_ONLINE] (state, uid) {
    const user = state.friends.find(cv => cv.uid === uid)
    user.online = true
  },
  [types.LOAD_SCROLL_BOX] (state, el) {
    state.el = el
  },
  [types.SCROLL_BOTTOM] (state, toButton) {
    state.toBottom = toButton
  }
}
const actions = {
  getUsers ({commit, state}) {
    api.chatApi.getUsers({id: state.session.uid})
      .then(res => {
        commit(types.GET_USERS, res.data)
      })
  },
  sendMessage ({commit, state, dispatch}) {
    const msg = Mock.mock({
      id: Mock.Random.increment(),
      from: {
        uid: state.session.uid,
        name: state.session.name,
        pic: state.session.pic
      },
      to: {
        uid: state.toUser.uid,
        name: state.toUser.name,
        pic: state.toUser.pic
      },
      content: state.message,
      createTime: Mock.Random.now('second')
    })
    if (state.message.length > 0) {
      commit(types.SEND_MESSAGE, msg)
    }
  },
  login ({commit, dispatch}, user) {
    api.chatApi.login(user)
      .then(res => {
        if (res.data) {
          commit(types.SAVE_SESSION, res.data)
          dispatch('getUsers')
          dispatch('joinChat')
        } else {
          commit(types.REQUEST_ERROR, res.msg)
        }
      })
  },
  async changeFriend ({commit, state}, id) {
    let msgs = []
    await api.chatApi.getMessages({fromId: state.session.uid, toId: id})
      .then(res => {
        msgs = res.data
      })
    await api.chatApi.getUser({id})
      .then(res => {
        commit(types.CHANGE_FRIEND, {msgs, user: res.data})
      })
  },
  syncMessage ({commit, state}, toId) {
    api.chatApi.getMessages({fromId: state.session.uid, toId})
      .then(res => {
        if (res.data.length !== 0) {
          commit(types.SYNC_MESSAGE, {msgs: res.data, toId})
        }
      })
  },
  syncUser ({commit, state}) {
    api.chatApi.getUsers({id: state.session.uid})
      .then(res => {
        commit(types.SYNC_USER, res.data)
      })
  },
  userOnline ({commit, state}, uid) {
    const user = state.friends.find(cv => cv.uid === uid)
    if (user) {
      commit(types.USER_ONLINE, uid)
    } else {
      api.chatApi.getUser({id: uid})
        .then(res => {
          commit(types.NEW_USER, res.data)
        })
    }
  },
  loadScrollBox ({commit}, el) {
    commit(types.LOAD_SCROLL_BOX, el)
  },
  scrollBottom ({commit}, toBottom) {
    commit(types.SCROLL_BOTTOM, toBottom)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
