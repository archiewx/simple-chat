import axios from 'axios'

export const getQiniuSignature = params => axios.post('/qiniu/upSignature', null, {params}).then(res => res.data)
export const getUpUrls = params => axios.get('http://uc.qbox.me/v1/query', {params}).then(res => res.data)
export const getMSignature = params => axios.post('/qiniu/manageSignature', null, {params}).then(res => res.data)
