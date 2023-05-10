import request from '@/utils/request.js'

// 左侧list
export function folderfile(data){
	return request({
		url:'/front/v1/folderfile/list/0',
		method:'get'
	})
}

export function listid(data){
	return request({
		url:'/front/v1/folderfile/list/'+data,
		method:'get'
	})
}
