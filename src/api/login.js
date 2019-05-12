import axios from 'axios'

export function sendMsg(params) {
  return axios.post('/sendMessage', params)

 }

 export function getUserInfo(params) {
  return axios.post('/login/miniSiteRegister', params)

 }
