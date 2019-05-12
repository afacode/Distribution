import axios from 'axios'

 export function getDesinerList(params) {
  return axios.get('/designer/listDesigners',{params:params})

 }
