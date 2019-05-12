import axios from 'axios'
 export function spreaderFlow(userid) {
    return axios.get('/api/promotions/personal/'+userid)
  
   }
  