import axios from 'axios'
import request from '@/utils/request.js'

//登录
export function login (data){
	return axios({
		url:process.env.VUE_APP_BASE_API + '/accounts/v1/actions/loginByPassword',
		method:'post',
		data:data
	})
}

// 身份信息
export function getUserInfo(){
	return request({
		url:'/accounts/v1/users',
		method:'get'
	})
}
// 修改密码
export function reserpwd(data){
	return request({
		url:'/accounts/v1/updatePwd',
		method:'put',
		params:data
	})
}
// 菜单栏消息
export function news(data){
	return request({
		url:'/front/v1/msg/list',
		method:'get',
		params:data
	})
}

// 菜单栏消息已读
export function ready(data){
	return request({
		url:'front/v1/msg/read',
		method:'get',
		params:{
			msgId:data
		}
	})
}