import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '@/views/Home.vue'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {// 首页
    path: '/home',
	component: {
		render: (e) => e("router-view")
	},
	children: [{
			path: '',
			name: 'home',
			component: () => import('@/views/Home.vue')
		},
		{//项目简介
			path: '/home/projectduction',
			name: 'projectduction',
			component: () => import('@/views/home/Projectduction.vue')
		},
		{//工地党建
			path: '/home/partybuild',
			name: 'partybuild',
			component: () => import('@/views/home/Partybuild.vue')
	},
	{//详情
		path: '/home/partydetails',
		name: 'partydetails',
		component: () => import('@/views/home/Partydetails.vue')
	}
	]
  },
 {
	path: "/",
	redirect: '/home'
 },
 {// 工地资讯
	path: '/news/index',
	component: {
		render: (e) => e("router-view")
	},
	children: [
		{
			path: '',
			name: 'news',
			component: () => import('@/views/news/Index.vue'),
		},
		{
			path:'/news/indexdetailed',
			name:'indexdetailed',
			component: () => import('@/views/news/Indexdetailed.vue')
		}
	]  
  },
 {
	path: '/synthesize/bridge/index',
	component: {
		render: (e) => e("router-view")
	},
	children: [{//综合管理-梁片管理
			path: '',
			name: 'bridge',
			component: () => import('@/views/synthesize/bridge/Index.vue'),
		},
		{//综合管理-气象数据管理
			path: '/synthesize/weather/index',
			name: 'weather',
			component: () => import('@/views/synthesize/weather/Index.vue'),
		},
		{//综合管理-施工单位
			path: '/synthesize/team/index',
			name: 'team',
			component: () => import('@/views/synthesize/team/Index.vue'),
		},
		{//综合管理-农名工管理
			path: '/synthesize/team/workers',
			name: 'workers',
			component: () => import('@/views/synthesize/team/Workers.vue'),
		},
		{//综合管理-农名工工资
			path: '/synthesize/team/wages',
			name: 'wages',
			component: () => import('@/views/synthesize/team/Wages.vue'),
		},
		{//综合管理-项目成员管理
			path: '/synthesize/project/management',
			name: 'management',
			component: () => import('@/views/synthesize/project/Management.vue'),
		},
		{//综合管理-项目成员工资
			path: '/synthesize/project/wages',
			name: 'wagestwo',
			component: () => import('@/views/synthesize/project/Wages.vue'),
		},
		{//综合管理-分包商项目
			path: '/synthesize/subcontractor/index',
			name: 'subcontractor',
			component: () => import('@/views/synthesize/subcontractor/Index.vue'),
		},
		{//综合管理-物料进出列表
			path: '/synthesize/assets/index',
			name: 'assets',
			component: () => import('@/views/synthesize/assets/Index.vue'),
		},
		{//综合管理-人脸考勤列表
			path: '/synthesize/faceAttendance/index',
			name: 'faceAttendance',
			component: () => import('@/views/synthesize/faceAttendance/Index.vue'),
		},
		{//综合管理-考勤管理
			path: '/synthesize/antiepidemic/index',
			name: 'antiepidemic',
			component: () => import('@/views/synthesize/antiepidemic/Index.vue'),
		},
		{//综合管理-项目物资统计表
			path: '/synthesize/material/index',
			name: 'material',
			component: () => import('@/views/synthesize/material/Index.vue'),
		},
		{//综合管理-项目物资统计表
			path: '/synthesize/cement/index',
			name: 'cement',
			component: () => import('@/views/synthesize/cement/Index.vue'),
		},
		{//综合管理-超声基桩桥梁检测
			path: '/synthesize/ultrasonic/index',
			name: 'ultrasonic',
			component: () => import('@/views/synthesize/ultrasonic/Index.vue'),
		},
		{//综合管理-混凝土实验列表
			path: '/synthesize/experiment/concreteteam',
			name: 'concreteteam',
			component: () => import('@/views/synthesize/experiment/Concreteteam.vue'),
		},
		{//综合管理-混凝土实验
			path: '/synthesize/experiment/concretet',
			name: 'concretet',
			component: () => import('@/views/synthesize/experiment/Concretet.vue')
		},
		{//综合管理-钢筋实验列表
			path: '/synthesize/experiment/rebarteam',
			name: 'rebarteam',
			component: () => import('@/views/synthesize/experiment/Rebarteam.vue')
		},
		{//综合管理-钢筋实验
			path: '/synthesize/experiment/rebar',
			name: 'rebar',
			component: () => import('@/views/synthesize/experiment/Rebar.vue')
		}
	]
 },
 {
 	path: '/bim/index',
 	component: {
 		render: (e) => e("router-view")
 	},
 	children: [{
 			path: '',
 			name: 'bim',
 			component: () => import('@/views/bim/Index.vue'),
 		}
 	]
 },
 {//质量整改
 	path: '/safe/index',
	name: 'safe',
	component: () => import('@/views/safe/Index.vue'),
 },
 {//检查整改
 	path: '/rectify/index',
 	name: 'rectify',
 	component: () => import('@/views/rectify/Index.vue'),
 },
 {//登录
 	path: '/login',
 	name: 'login',
 	component: () => import('@/views/Login.vue'),
 },
 {//重置密码
 	path: '/resetpwd',
 	name: 'resetpwd',
 	component: () => import('@/views/Resetpwd.vue'),
 },
 {//智能监控
 	path: '/cams',
 	name: 'cams',
 	component: () => import('@/views/cams/Index.vue'),
 },
 {//topnews
	path: '/topnews',
	component: {
		render: (e) => e("router-view")
	},
	children: [{
			path: '',
			name: 'topnews',
			component: () => import('@/views/topnews/Index.vue'),
		},
		{
			path: '/topnews/newsdetail',
			name: 'newsdetail',
			component: () => import('@/views/topnews/newsdetail.vue'),
		},
	]
 },
 {//航拍视频
 	path: '/uavideo',
 	name: 'uavideo',
 	component: () => import('@/views/uavideo/Index.vue'),
 },
 {//文档管理
 	path: '/document',
 	name: 'document',
 	component: () => import('@/views/document/Index.vue'),
 }
]
const router = new VueRouter({
	base:'/front-vue',
  mode: 'hash',
  routes
})
export default router
