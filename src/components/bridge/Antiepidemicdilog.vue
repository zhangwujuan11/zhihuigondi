<template>
	<el-dialog
	  title="详情"
	  :visible.sync="$store.state.wokerdilog"
	  width="90%"
	  >
	  <el-table
	  :data="tabledilog"
	   stripe
	   :header-cell-style="{border:'1px'}"
	   style="width: 100%">
		 <el-table-column
		   prop="name"
		   label="姓名">
		 </el-table-column> 
		 <el-table-column
		  width="180"
		   prop="company"
		   label="单位">
		 </el-table-column> 
		 <el-table-column
		 width="150"
		   prop="cardNo"
		   label="身份证号">
		 </el-table-column> 
		 <el-table-column
		   prop="temperatureStatus"
		   label="体温状态">
		   <template slot-scope="scope">
			   {{scope.row.temperatureStatus | temperatureStatus}}
		   </template>
		 </el-table-column> 
		 <el-table-column
		   prop="temperature"
		   label="体温">
		 </el-table-column> 
		 <el-table-column
		   prop="nucleicStatus"
		   label="核酸状态">
		   <template slot-scope="scope">
			   {{scope.row.nucleicStatus | nucleicStatus}}
		   </template>
		 </el-table-column> 
		 <el-table-column
		   prop="levelStatus"
		   label="健康码">
		   <template slot-scope="scope">
			   {{scope.row.levelStatus | levelStatus}}
		   </template>
		 </el-table-column> 
		 <el-table-column
		   prop="scanTime"
		   label="考勤日期">
		 </el-table-column> 
		 <el-table-column
		   prop="gotimeStatus"
		   label="上班打卡状态">
		   <template slot-scope="scope">
			   {{scope.row.gotimeStatus | gotimeStatus}}
		   </template>
		 </el-table-column> 
		 <el-table-column
		   prop="offtimeStatus"
		   label="下班打卡状态">
		   <template slot-scope="scope">
			   {{scope.row.offtimeStatus | offtimeStatus}}
		   </template>
		 </el-table-column> 
		 <el-table-column
		  width="120"
		   prop="gotimeTime"
		   label="上班打卡时间">
		 </el-table-column> 
		 <el-table-column
		  width="120"
		   prop="offtimeTime"
		   label="下班打卡时间">
		 </el-table-column> 
	  </el-table>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="$store.state.wokerdilog = false">关 闭</el-button>
	    <el-button type="success" @click="exportmingx">导出明细</el-button>
		 <el-button type="primary" @click="exporthuizong">导出汇总</el-button>
	  </span>
	  <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
	  	:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
	  </el-pagination>
	</el-dialog>
</template>

<script>
	import {antiepidemicdetail} from '@/utils/synthesize'
	export default{
		filters:{
			temperatureStatus(e){
				if(e == "0"){
					return '未检测'
				}else if(e=='1'){
					return '体温正常'
				}else if(e=='-1'){
					return '体温异常'
				}
			},
			nucleicStatus(e){
				if(e == "0"){
					return '未检测'
				}else if(e=='1'){
					return '检测正常'
				}else if(e=='-1'){
					return '检测异常'
				}
			},
			levelStatus(e){
				if(e == "0"){
					return '黄码'
				}else if(e=='1'){
					return '绿码'
				}else if(e=='-1'){
					return '红码'
				}
			},
			gotimeStatus(e){
				if(e == "0"){
					return '未打卡'
				}else if(e=='1'){
					return '考勤正常'
				}else if(e=='-1'){
					return '考勤异常'
				}
			},
			offtimeStatus(e){
				if(e == "0"){
					return '未打卡'
				}else if(e=='1'){
					return '考勤正常'
				}else if(e=='-1'){
					return '考勤异常'
				}
			}
		},
		props:["dilogodata",'start',"end"],
		data(){
			return{
				tabledilog:[],
				compay:'',
				currentPage: 1,// 默认显示第几页
				totalCount: 1,// 总条数，根据接口获取数据长度(注意：这里不能为空)
				pageSizes: [1, 2, 3, 4],// 个数选择器（可修改）
				PageSize: 10,// 默认每页显示的条数（可修改）
			}
		},
		mounted(){
			
		},
		methods:{
			// 显示第几页
			handleCurrentChange(val) {
				antiepidemicdetail({
					pageSize:10,
					pageNum:val,
					starTime:this.start,
					endTime:this.end,
					company:this.compay
				}).then(res=>{
					this.tabledilog=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			// 导出明细
			exportmingx(){
				 window.open(process.env.VUE_APP_BASE_API + "front/v1/face/detail/export?starTime="+this.start+"&endTime="+this.end+"&company="+this.compay)
			},
			// 导出汇总
			exporthuizong(){
				window.open(process.env.VUE_APP_BASE_API + "front/v1/face/months/export?starTime="+this.start+"&endTime="+this.end+"&company="+this.compay)
			}
		},
		watch:{
			dilogodata(val){
				this.compay=val
				if(val != ''){
					antiepidemicdetail({
						pageSize:10,
						pageNum:1,
						starTime:this.start,
						endTime:this.end,
						company:val
					}).then(res=>{
						this.tabledilog=res.items
						this.totalCount=res.total
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	/deep/ .el-table tr {
		color: black !important;
	}
	/deep/.el-table th.el-table__cell>.cell{
		padding-left: 0;
		padding-right: 0;
		color: black;
	}
	/deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
		background: white !important;
	}
	/deep/.el-table .cell{
		padding-left:0;
		padding-right: 0;
	}
	
</style>