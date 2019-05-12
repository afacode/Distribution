import axios from 'axios'
// 余额接口
export function accept(params) {
  return axios.post('/api/promotions/accept', params)

 }

 export function checked(params) {
  return axios.post('/api/accounts/checkedPassword', params)

 }
 export function promotions(promotionId) {
  return axios.get('/api/promotions/'+promotionId)

 }

 
