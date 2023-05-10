import request from '@/utils/request.js'

// 检查整改列表(我的待办)
export function userRelatedList(data){
	return request({
		url:'rectifies/v2/pending/actions/search',
		method:'get',
		params:{
			limit:8,
			offset: (data.page - 1) * 8,
			status:data.status,
			keyword:data.keyword
		}
	})
}

// 检查整改列表(我的发起)
export function usersurpost(data){
	return request({
		url:'rectifies/v2/initiate/actions/search',
		method:'get',
		params:{
			limit:8,
			offset: (data.page - 1) * 8,
			status:data.status,
			keyword:data.keyword
		}
	})
}

// 检查整改列表(全部)
export function getalllist(data){
	return request({
		url:'/rectifies/v2/userRelated/actions/search',
		method:'get',
		params:{
			limit:8,
			offset: (data.page - 1) * 8,
			status:data.status,
			keyword:data.keyword
		}
	})
}
// 获取标段
export function biaoduan(data){
	return request({
		url:'v1/section/section/search',
		method:'get'
	})
}

// 标段部门对应负责人
export function getUserList(data){
	return request({
		url:"accounts/v1/departments/" + data + "/users",
		method:'get'
	})
}

// 发起整改
export function subform(data){
	return request({
		url:'rectifies/v2',
		method:'post',
		data:data
	})
}

// 保存草稿
export function saveAsDraft(data){
	return request({
		url:'rectifies/v2/actions/saveAsDraft',
		method:'post',
		data:data
	})
}
// 草稿变正式整改单
export function regiletoformal(data){
	return request({
		url:'/rectifies/v2/'+data.rectifyId+'/draft/actions/convertFormal',
		method:'put',
		data
	})
}
// 指定id的整改单详情
export function reformeid(data){
	return request({
		url:'rectifies/v2/' + data,
		method:'get'
	})
}
// 保存整改单修改
export function savechange(data){
	return request({
		url:'/rectifies/v2/' + data.rectifyId,
		method:'put',
		data
	})
}
// 删除整改单
export function delform(data){
	return request({
		url:'/rectifies/v2/' + data,
		method:'DELETE'
	})
}
// 整改单导出
export function exportform(data){
	return request({
		url:'/rectifies/v2/'+ data +'/actions/exportExcel',
		method:'get'
	})
}

// 整改单撤回
export function revoke(data){
	return request({
		url:'/rectifies/v2/'+ data +'/actions/revoke',
		method:'post'
	})
}
// 修改整改单子内容
export function cahngzcon(data){
	return request({
		url:'/rectifies/v2/' + data.rectifyId + '/problems/' + data.problemId,
		method:'put',
		data:data.data
	})
}

// 施工方处理整改单子问题
export function activehandle(data){
	return request({
		url:'/rectifies/v2/problems/' + data.id + '/actions/handle',
		method:'post',
		data:data.from
	})
}

// 审核流程
export function cheked(data){
	return request({
		url:'/rectifies/v2/' + data.rectifyId + '/problems/' + data.problemId + '/actions/approve',
		method:'post',
		data:data.data
	})
}