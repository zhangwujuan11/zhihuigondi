import request from '@/utils/request.js'

export function cams (data){
	return request({
		url:'front/v1/camera/list/1',
		method:'get'
	})
}
export function change_cam(data){
	return request({
		url:'front/v1/camera/getCamera/'+ data.id,
		method:'get',
		params:{
			cameraType:data.cameraType,
			cno: data.cno
		}
	})
}

export function camsgetlist(data){
	return request({
		url:'/device_preset/',
		method:'post',
		data:JSON.parse(data)
	})
}

export function Device(data){
	return request({
		url:'front/v1/camera/ptz/' + data.id + '/' + data.direction,
		method:'get',
		params: {
		  cno: data.cno,
		  cameraType:data.cameraType
		}
	})
}

export function VidoList(data){
	return request({
		url:'front/v1/videoList',
		method:'get'
	})
}

// 监控状态
export function statuscon(data){
	return request({
		url:'/front/v1/camera/status',
		method:'get',
		params:data
	})
}