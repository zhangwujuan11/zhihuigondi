<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>考勤管理</span>
			</template>
			<template v-slot:contont>
			   <div>
				  <div class="control">
					  <el-date-picker
					    v-model="startmounthyear"
					    type="date"
					    style="width:200px;margin: 0 15px;"
					    placeholder="选择日期"
					    format="yyyy 年 MM 月 dd 日"
					    value-format="yyyy-MM-dd"
					    >
					  </el-date-picker>
					  <el-date-picker
					    v-model="endmounthyear"
					    type="date"
					    style="width:200px;margin: 0 15px;"
					    placeholder="选择日期"
					    format="yyyy 年 MM 月 dd 日"
					    value-format="yyyy-MM-dd"
					    >
					  </el-date-picker>
						<el-button type="success" @click="serchdata">搜索</el-button>
						<el-button type="success" @click="exportxsl">导出</el-button>
				   </div>
				    <el-table
				      :data="tableData"
				       stripe
					   :header-cell-style="
					   {background:'linear-gradient(180deg,rgba(10, 74, 216, 0.70) 30%,rgba(5, 49, 146, 0.30))',
					   color:'#00CFFF !important',
					   border:'none'
					   }"
					   @row-click="showrow"
				       style="width: 100%">
					   <el-table-column type="index"></el-table-column>

						<el-table-column
						width="300"
						  prop="type"
						  label="类型">
						</el-table-column>
				       <el-table-column
				         prop="sums"
				         label="总人数">
				       </el-table-column>
					   <el-table-column
					   prop="scanNormal"
					   label="考勤正常人次">
					   </el-table-column>
					   <el-table-column
					   prop="scanAbnormal"
					     label="考勤异常人次">
					   </el-table-column>
					  <!-- <el-table-column
					     prop="greenLevel"
					     label="绿码人数">
					   </el-table-column>
					   <el-table-column
					     prop="yellowLevel"
					     label="黄码人数">
					   </el-table-column>
					   <el-table-column
					     prop="redLevel"
					     label="红码人数">
					   </el-table-column>
					   <el-table-column
					     prop="nucleicNormal"
					     label="核酸正常人数">
					   </el-table-column>
					   <el-table-column
					     prop="nucleicAbnormal"
					     label="核酸异常人数">
					   </el-table-column>
					   <el-table-column
					   prop="temperatureNormal"
					     label="体温正常人数">
					   </el-table-column>
					   <el-table-column
					     prop="temperatureAbnormal"
					     label="体温异常人数">
					   </el-table-column>
					   <el-table-column
					     prop="temperatureNo"
					     label="未测体温人数">
					   </el-table-column> -->
				     </el-table>
					 <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
			   </div>
			</template>
		</Titlel>
		<!-- 详情 -->
		<Antiepidemicdilog :dilogodata="dilogodata" :start="startmounthyear" :end="endmounthyear"></Antiepidemicdilog>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import Antiepidemicdilog from '@/components/bridge/Antiepidemicdilog.vue'
	import {antiepidemic} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		inject:["reload"],
		components:{
			Titlel,
			Antiepidemicdilog
		},
		filters:{
			pay(e){
				return e/100
			}
		},
		 data() {
		      return {
				startmounthyear:'',
				endmounthyear:'',
				tableData: [],//table
				currentPage: 1,// 默认显示第几页
				totalCount: 1,// 总条数，根据接口获取数据长度(注意：这里不能为空)
				pageSizes: [1, 2, 3, 4],// 个数选择器（可修改）
				PageSize: 20,// 默认每页显示的条数（可修改）
				wokerdilog:false,
				dilogodata:''
		      }
		    },
		mounted() {
			this.getLastMonthFirstDay()
			this.getLastMonthLastDay()
			// 列表
			this.$nextTick(()=>{
				antiepidemic({
					pageSize:20,
					pageNum:1,
					starTime:this.startmounthyear,
					endTime:this.endmounthyear,
					company:''
				}).then(res=>{
					this.tableData=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			})
			
		},
		methods:{
			// 显示第几页
			handleCurrentChange(val) {
				antiepidemic({
					pageSize:20,
					pageNum:val,
					starTime:this.startmounthyear,
					endTime:this.endmounthyear,
					company:''
				}).then(res=>{
					this.tableData=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			// 搜索按钮
			serchdata(){
				antiepidemic({
					pageSize:20,
					pageNum:1,
					starTime:this.startmounthyear,
					endTime:this.endmounthyear,
					company:''
				}).then(res=>{
					this.tableData=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			},
			//日期
			getLastMonthFirstDay() {
			   let date = new Date();
			    date.setDate(0);
			    var y = date.getFullYear(); //获取年份
			    var m = date.getMonth() + 1; //获取月份
			    m = m < 10 ? "0" + m : m; //月份补 0
				this.startmounthyear=[y, m, '01'].join("-")
			},
			getLastMonthLastDay() {
			   let date = new Date();
			    date.setDate(0);
			    var y = date.getFullYear(); //获取年份
			    var m = date.getMonth() + 1; //获取月份
			    var d = new Date(y, m, 0).getDate(); //获取当月最后一日
			    m = m < 10 ? "0" + m : m; //月份补 0
			    d = d < 10 ? "0" + d : d; //日数补 0
				this.endmounthyear= [y, m, d].join("-")
			},
			exportxsl(){
				 window.open(process.env.VUE_APP_BASE_API + "front/v1/face/sum/export?starTime="+this.startmounthyear+"&endTime="+this.endmounthyear)
			},
			showrow(i){
				this.dilogodata=i
				this.$store.state.wokerdilog=true
			}
		}
	}
</script>

<style scoped>
	/deep/  .el-table, .el-table__expanded-cell {
	    background-color: transparent;
	}
	/deep/ .el-table tr {
	    background-color: transparent!important;
		color: white;
	}
	/deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
	   background-color: transparent;
	}
	/deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
		background: rgba(2, 82, 173, 0.3);
	}
	/deep/.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
		border-bottom:1px dashed rgba(53, 99, 161, 1);
	}
	/deep/.el-table--border::after, .el-table--group::after, .el-table::before{
		background-color: transparent;
	}
	/deep/ .el-table tbody tr:hover > td {
	    background-color: transparent !important;
	}
	/*  */
	.control{
		display: flex;
		justify-content: end;
		/* height: 34px; */
		margin: 20px 0;
		background-color: transparent;
	}
	.elserch{
		margin-left: 20px;
		height: 34px;
	}
	/deep/.el-input-group__prepend{
		width: 100px !important;
		padding: 0 !important;
		box-sizing: border-box;
	}
	/deep/.el-select{
		width: 100%;
		left: 20px;
	}
	/deep/.el-input-group__append{
		background-color: #5FB760;
		color: white;
		border-color: #5FB760 ;
	}
	/deep/.el-input__inner{
		line-height: 34px;
		height: 34px;
	}
	/deep/.el-input__icon{
		line-height: 34px;
	}
	.qcordzip{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		line-height: 34px;
	}
	.qcordzip img{
		width: 53px;
	}
	/deep/.cell{
		text-align: center;
	}
	/deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
		background:linear-gradient(180deg, rgba(3,87,176,0) 0%, rgba(61,159,207,0.7) 100%);
		color:  #00C5F2;
		border: 1px solid #52CCFF;
	}
	i{
		font-size: 20px;
	}
	/deep/.el-dialog__footer{
		text-align: center;
	}
	img{
		width: 40px;
		height: 40px;
	}
	/deep/.el-table .cell{
	    font-size: 12px;
	    text-align: center;
	    max-width: 300px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
		}
	/deep/.el-table__row{
		cursor: pointer;
	}
</style>