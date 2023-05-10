import request from '@/utils/request.js'

export function siteinfo(data){
	return request({
		url:'/front/v1/siteinfo/list/1',
		method:'get'
	})
}

export function siteinfot(data){
	return request({
		url:'/front/v1/siteinfo/list/2',
		method:'get'
	})
}

export function newsdetails(data){
	return request({
		url:'/front/v1/siteinfo/' + data,
		method:'get'
	})
}

export function newsli(data){
	return request({
		url:'/front/v1/siteinfo/list/3',
		method:'get',
		params:data
	})
}