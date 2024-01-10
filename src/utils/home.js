import request from '@/utils/request.js'

export function invest(data){
	return request({
		url:'v1/home/invest/search/list',
		method:'get',
		data: {
		    status: "1"
		}
	})
}
export function homnescon(){
	return request({
		url:'v1/page/search/list',
		method:'get'
	})
}
export function siteinfo(){
	return request({
		url:'front/v1/siteinfo/list/3?limit=3&offset=1&orderByColumn=id&isAsc=desc',
		method:'get'
	})
}
export function charttwo(){
	return request({
		url:'v1/homepage/work/statistics',
		method:'get'
	})
}
export function chaetthree(data){
	return request({
		url:'/v1/human/workers/salary/workers/statistics',
		method:"get",
		params:data
	})
}
export function chartfour(){
	return request({
		url:'v1/homepage/securities/statistics',
		method:'get'
	})
}
export function chartdowntwo(data){
	return request({
		url:'v1/homepage/buildProgress/statistics',
		method:'get',
		params:data
	})
}

export function chartdownthree(data){
	return request({
		url:'v1/homepage/rectifies/statistics',
		method:'get',
		params:data
	})
}





// partybuild
// 快捷访问
export function partbulidask(){
	return request({
		url:'/front/v1/partybuild/list/0',
		method:'get'
	})
}
// 党建活动
export function dangjain(data){
	return request({
		url:'/front/v1/partybuild/list/' +data,
		method:'get'
	})
}

// 详情
export function builddetail(data){
	return request({
		url:'/front/v1/partybuild/' + data,
		method:'get'
	})
}




// cams
export function cams(data){
	return request({
		url:'front/v1/camera/getCamera/' + data.id,
		method:'get',
		params:{
		    cameraType:data.cameraType,
		    cno:data.cno
		},
	})
}
export function camslist (data){
	return request({
		url:'front/v1/camera/list/1',
		method:'get'
	})
}
// 日常管理柱状图
export function dailystatistics(){
	return request({
		url:'/v1/homepage/daily/statistics',
		method:'get'
	})
}
// 党员非党员
export function partyecharts(){
	return request({
		url:'/v1/partyMemberManagement/actions/echarts',
		method:'get'
	})
}



// echart获取日期
export function serchall(data){
	return request({
		url:'/v1/echartsManagement/list',
		method:'get'
	})
}