import axios from 'axios'

export const getSignature = params => axios.post('/oss/signature', null, {params}).then(res => res.data)
