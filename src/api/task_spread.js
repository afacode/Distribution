import axios from 'axios'
export function spreadUrl(params) {
   return axios.post('/api/visits/spreadUrl',params)
 
  }
 