import request from '@/utils/request.js'
import axios from 'axios'
//梁片信息列表
export function bridgelist(data){
	return request({
		url:'/v1/girders/actions/search',
		method:'get',
		params:data
	})
}
// 二维码接口
export function qrcode(){
	return request({
		url:'/v1/girders/qrcode',
		method:'post',
		responseType:'blob'
	})
}
// 修改梁片
export function updatabridge(data){
	return request({
		url:'/v1/girders/' + data.girderId,
		method:'put',
		data:data
	})
}

// 梁片审批
export function checkgridge(data){
	return request({
		url:'/v1/girders/' + data.id + '/actions/approve',
		method:'put',
		data:data
	})
}
// 梁片出库
export function outStock(data){
	return request({
		url:'/v1/girders/' + data.id + '/actions/outStock',
		method:'put',
		data:data
	})
}

// 大气数据监测
export function weather(data){
	return request({
		url:'/v1/weather/weather/search',
		method:'get',
		params:data
	})
}
//施工单位列表
export function teams(data){
	return request({
		url:'/v1/human/buildingUnits',
		method:'get',
		params:data
	})
}

// 施工单位-工队
export function human(data){
	return request({
		url:'/v1/human/buildingUnits/' + data.id,
		method:'get',
		params:data.data
	})
}
// 农名工管理
export function workerName (data) {
	return request({
		url:'/v1/human/workers/'+data.deptId+'/serach',
		method:'get',
		params:data
	})
}

// 农名工管理-详情-劳务队伍
export function buildingUnits (data) {
	return request({
		url:'/v1/human/buildingUnits/' + data,
		method:'get',
	})
}
// 农名工管理修改
export function Unitsopdata (data) {
	return request({
		url:'/v1/human/workers/' + data.workerId,
		method:'PUT',
		data:data
	})
}

// 农名工管理搜索
export function workerserch (data) {
	return request({
		url:'/v1/human/workers/actions/search',
		method:'get',
		params:data
	})
}
// 导入文件
export function workzip(data){
	return request({
		url:'v1/communal/files/import/actions/upload',
		method:'post',
		async: false,
		cache: false,
		processData: false,// 告诉axios不要去处理发送的数据(重要参数)
		contentType: false,   // 告诉axios不要去设置Content-Type请求头
		data:data,
	})
}
//导入农名工数据
export function handleExcel(data){
	return request({
		url:"/v1/human/workers/actions/import/"+ data.deptId,
		method:'post',
		data:{
			"objectKey": data.objectKey,
			"objectUrl": data.objectUrl
		}
	})
}
// 导入农名工头像
export function handleherder(data){
	return request({
		url:'/v1/human/workers/avatars/actions/import',
		method:'post',
		data:data
	})
}

// 新增农名工
export function addwokers (data){
	return request({
		url:'v1/human/workers',
		method:'post',
		data:data
	})
}

// 删除农名工
export function deletwokers (data){
	return request({
		url:'v1/human/workers/' + data,
		method:'DELETE'
	})
}

// 农名工工资列表
export function workerSalary(data){
	return request({
		url:"/v1/human/workers/salary/actions/search",
		method:'get',
		params:data
	})
}

// 农名工工资新增
export function addgongzi(data){
	return request({
		url:'/v1/human/workers/salary/',
		method:'post',
		data:data
	})
}

// 农名工工资修改
export function updatagongzi(data){
	return request({
		url:'/v1/human/workers/salary/'+data.id,
		method:'put',
		data:data
	})
}

// 删除农名工工资
export function detlegongzi(data){
	return request({
		url:'/v1/human/workers/salary/' + data,
		method:'DELETE'
	})
}
// 导入工资zip
export function handlegongzi(data){
	return request({
		url:'/v1/human/workers/salary/actions/import/' + data.id,
		method:'post',
		data:{
			"objectKey": data.objectKey,
			"objectUrl": data.objectUrl
		}
	})
}

// 项目成员管理列表
export function managementlist(data){
	return request({
		url:'/v1/human/proEmployees/actions/search',
		method:'get',
		params:data
	})
}

// 新增项目成员管理
export function addmanagement(data){
	return request({
		url:'/v1/human/proEmployees/',
		method:'post',
		data:data
	})
}
// 项目成员管理修改
export function managementchange(data){
	return request({
		url:'/v1/human/proEmployees/'+ data.employeeId,
		method:'put',
		data:data
	})
}

// 项目成员管理删除
export function deletmanagement(data){
	return request({
		url:'/v1/human/proEmployees/' + data,
		method:'DELETE'
	})
}

// 项目成员管理头像导入
export function handlemanagementheader(data){
	return request({
		url:'/v1/human/proEmployees/avatars/actions/import',
		method:'post',
		data:data
	})
}

// 项目成员管理导入
export function managemenuplod(data){
	return request({
		url:'/v1/human/proEmployees/actions/import',
		method:'post',
		data:data
	})
}

// 项目成员工资列表
export function mangegongzilist(data){
	return request({
		url:'/v1/human/proEmployeesSalary/search',
		method:'get',
		params:data
	})
}

// 分包商设备台账列表
export function enquip(data){
	return request({
		url:'/v1/enquipment/enquip/search',
		method:'get',
		params:data
	})
}

// 物料进出列表
export function assets(data){
	return request({
		url:'/v1/assest/search',
		method:'get',
		params:data
	})
}

// 人脸考勤记录列表
export function faceAttendance(data){
	return request({
		url:'/front/v1/face/list',
		method:'get',
		params:data
	})
}

// 考勤管理列表
export function antiepidemic(data){
	return request({
		url:'/front/v1/face/sum',
		method:'get',
		params:data
	})
}

//考勤管理详情
export function antiepidemicdetail(data){
	return request({
		url:'/front/v1/face/detail',
		method:'get',
		params:data
	})
}
// // 超声基桩桥梁检测列表
// export function ultrasonic (data){
// 	return request({
// 		url:'/v1/bridge/action/search',
// 		method:'get',
// 		params:data
// 	})
// }

// 搅拌站
export function jiaolist(data){
	return axios({
		url:'https://gt.starhope.net/beam//v1/laboratory/mixingStation/list',
		method:'get',
		params:data,
		headers:{
			Authorization:localStorage.getItem('tocken')
		}
	})
}


// 项目物料统计表
export function materialcount(data){
	return request({
		url:'/v1/materialcount/search',
		method:'get',
		params:data
	})
}
// 拌合站实验数据列表
export function cement(data){
	return request({
		url:'/v1/cementlab/search',
		method:'get',
		params:data
	})
}

// 拌合站实验数据详情
export function cementdetail(data){
	return request({
		url:'/v1/cementlab/getCementLabItemByKey?id=' + data,
		method:'get'
	})
}

// 超声基桩桥梁检测列表
export function ultrasonic (data){
	return request({
		url:'/v1/bridge/action/search',
		method:'get',
		params:data
	})
}




// 混凝土实验团队列表
export function experimentconcrete(data){
	return request({
		url:'/v1/labs/steel/lab/dept/list?type=concert',
		method:'get'
	})
}

// 混凝土实验列表
export function concrete(data){
	return request({
		url:'/v1/labs/concrete/samples',
		method:'get',
		params:data
	})
}
// 监理单位
export function jianli(){
	return request({
		url:'accounts/v1/supervisor/departments',
		method:'get'
	})
}
// 施工单位
export function shigong(){
	return request({
		url:'accounts/v1/builder/departments',
		method:'get'
	})
}

// 新增混凝土抗压试验数据
export function addconcrete(data){
	return request({
		url:'/v1/labs/concrete/samples/create',
		method:'post',
		data:data
	})
}
// 修改混凝土抗压试验数据
export function updateconcrete(data){
	return request({
		url:'/v1/labs/concrete/samples/update/' + data.sampleNo,
		method:'post',
		data:data
	})
}
// 删除混凝土抗压试验数据
export function deletconcrete(data){
	return request({
		url:'/v1/labs/concrete/samples/delete/' + data,
		method:'post'
	})
}

// 钢筋实验团队列表 
export function experimentrebar(data){
	return request({
		url:'/v1/labs/steel/lab/dept/list?type=steel',
		method:'get'
	})
}
// 钢筋实验列表
export function rebar(data){
	return request({
		url:'/v1/labs/steel/samples',
		method:'get',
		params:data
	})
}
// 新增钢筋实验数据
export function addrebar(data){
	return request({
		url:'/v1/labs/steel/samples/create',
		method:'post',
		data:data
	})
}
// 修改钢筋实验数据
export function updaterebar(data){
	return request({
		url:'/v1/labs/steel/samples/update/' + data.sampleNo,
		method:'post',
		data:data
	})
}
// 删除钢筋实验数据
export function detelrebar(data){
	return request({
		url:'/v1/labs/steel/samples/delete/' + data,
		method:'post'
	})
}

// 钢筋详情1
export function rebardetail(data){
	return request({
		url:'/v1/labs/steel/samples/' + data.sampleNo,
		method:'get',
		params:{
			deptId:data.depid
		}
	})
}
// 钢筋详情2
export function rebardetailt(data){
	return request({
		url:'/v1/labs/steel/details/' + data.sampleNo,
		method:'get',
		params:{
			deptId:data.depid
		}
	})
}
// 钢筋详情3
export function rebardetailh(data){
	return request({
		url:'/v1/labs/steel/getNoRelationDetails/' + data.sampleNo,
		method:'get',
		params:{
			deptId:data.depid,
			keyWord:data.serch
		}
	})
}

// 钢筋实验列表提交
export function subrebar(data){
	return request({
		url:'/v1/labs/steel/update/match/' + data.sampleNo,
		method:'post',
		data:data.array
	})
}


// 混凝土详情1
export function concredetail(data){
	return request({
		url:'/v1/labs/concrete/samples/' + data.sampleNo,
		method:'get',
		params:{
			deptId:data.depid
		}
	})
}
// 混凝土详情2
export function concredetait(data){
	return request({
		url:'/v1/labs/concrete/details/' + data.sampleNo,
		method:'get',
		params:{
			deptId:data.depid
		}
	})
}

// 混凝土详情3
export function concredetaith(data){
	return request({
		url:'/v1/labs/concrete/getNoRelationDetails/' + data.sampleNo,
		method:'get',
		params:{
			deptId:data.depid,
			keyWord:data.serch
		}
	})
}

// 提交混凝土
export function subconcretet(data){
	return request({
		url:'/v1/labs/concrete/update/match/' + data.sampleNo,
		method:'post',
		data:data.array
	})
}


// 智慧张拉列表
export function smartlist(data){
	return request({
		url:'/v1/tensile/actions/search',
		method:'get',
		params:data
	})
}
// 智慧张拉搜索指定id
export function serchsamrtid(data){
	return request({
		url:'/v1/tensile/' + data,
		method:'get'
	})
}
// 修改智慧张拉
export function smartupdate(data){
	return request({
		url:'/v1/tensile/actions/' + data.id,
		method:'put',
		data:data
	})
}
// 新增智慧张拉列表
export function addsmartlist (data){
	return request({
		url:'/v1/tensile',
		method:'POST',
		data:data
	})
}
// 删除智慧张拉数据
export function detelsmart(data){
	return request({
		url:'/v1/tensile/' + data,
		method:'DELETE'
	})
}

//导出智慧张拉数据
export function exportsmart(data){
	return request({
		url:'/v1/tensile/actions/export',
		method:'get',
		params:data,
		responseType:'blob'
	})
}

// 智能喷淋
export function getspray(data){
	return request({
		url:'/v1/spray/actions/search',
		method:'get',
		params:data
	})
}
