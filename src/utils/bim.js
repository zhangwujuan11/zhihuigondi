import request from '@/utils/request.js'

export function firstbim(data){
	return request({
		url:'v1/bimface/viewToken',
		method:'get'
	})
}

export function initColor(){
	return request({
		url:'v1/bimface/elements/actions/color',
		method:'get'
	})
}

export function getdata(ele_info){
	return request({
		url:"v1/bimface/elements/" + ele_info.elementId,
		method:'get'
	})
	
}

// 堆积图
export function pileByMonth(data){
	return request({
		url:'/v1/bimface/progress/actions/pileByMonth',
		method:'get'
	})
}

// 构件列表
export function elementName(data){
	return request({
		url:'/v1/bimface/elements',
		method:'get',
		params:data
	})
}
// 构建组件详情
export function detailpart(data){
	return request({
		url:'/v1/bimface/elements/' + data,
		method:'get',
	})
}

// 构建组件详情修改
export function updatadetail(data){
	return request({
		url:'/v1/bimface/elements/' + data.id,
		method:"put",
		data:data.data
	})
}

// 桩检数据详情
export function bridgedetailnew(data){
	return request({
		url:'/v1/bridge/get/' + data,
		method:'get'
	})
}

// bim视频
export function tvshow(){
	return request({
		url:'/v1/bimRender/list',
		method:'get',
		params:{title:''}
	})
}