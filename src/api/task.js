import axios from "axios"

export function doCreateTask(params){
	return axios.post('/api/promotions',params)
}
export function getTaskList(param){
	return axios.get('/api/promotions/list/'+param)
}
export function getTaskDetail(id){
	return axios.get('/api/promotions/'+id)
}

export function addScanNum(params){
	return axios.put('/api/promotions/',params)
}

export function changeStatus(params){
	return axios.put('/api/promotions/',params)
}