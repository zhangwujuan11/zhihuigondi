import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  bridgechange:false,
	  checkpass:false,
	  bridgeupset:false,
	  rectification:false,//检查整改、发起整改
	  havedatadilog:false,//草稿
	  notStarted:false,//未开始
	  safedilog:false,//质量安全
	  uplodezip:false,//上传农名工花名册
	  uploadheader:false,//上传农名工头像
	  uplodeg:false,//导入农名工工资
	  mangentuplode:false,//项目成员管理头像导入
	  mangentup:false,//项目成员管理导入
	  wokerdilog:false,//考勤管理详情
	  teamtable:false,//实验table
	  teamtablecon:false,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
