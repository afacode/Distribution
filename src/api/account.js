import axios from 'axios'
// 余额接口
export function account(params) {
  return axios.get('/api/accounts/'+params)

 }

