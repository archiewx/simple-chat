/**
 *  creator: zheng
 *  date: 2017/8/15
 *  email: zhenglfsir@gmail.com
 */
import axios from 'axios'

export const login = params => axios.post('/chat/login', null, {params}).then(res => res.data)
export const getUser = params => axios.post('/chat/user', null, {params}).then(res => res.data)
export const getUsers = params => axios.post('/chat/users', null, {params}).then(res => res.data)

export const getMessagesById = params => axios.post('/chat/messages', null, {params}).then(res => res.data)

export const getMessages = params => axios.post('/chat/msgs', null, {params}).then(res => res.data)
