import request from '@/utils/request.js'

//质量整改
export function userRelatedList(data){
	return request({
		url:'/rectifies/v2/actions/classify',
		method:'get',
		params:data
	})
}
// 趋势分析
export function statAmountByMonth(data){
	return request({
		url:'/rectifies/v2/actions/statAmountByMonth',
		method:'get',
		params:data
	})
}

// 类型分析
export function echartone(data){
	return request({
		url:'/rectifies/v2/actions/statByHidDanger',
		method:'get',
		params:data
	})
}

// 责任人分析
export function zeren(data){
	return request({
		url:'/rectifies/v2/actions/statByProcessor',
		method:'get',
		params:data
	})
}

