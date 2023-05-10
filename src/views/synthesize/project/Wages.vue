<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>项目成员工资</span>
			</template>
			<template v-slot:contont>
			   <div>
				   <div class="control">
					   <el-date-picker
					     v-model="mounthyear"
					     type="month"
					     style="width:200px;margin: 0 15px;"
					     placeholder="选择日期"
					     format="yyyy 年 MM 月"
					     value-format="yyyy-MM"
					     >
					   </el-date-picker>
						<!-- <div class="elserch">
						  <el-input placeholder="请输入搜索内容" v-model="serdata" class="input-with-select">
						    <el-button slot="append" @click="serchdata">搜索</el-button>
						  </el-input>
						</div> -->
				   </div>
				    <el-table
				      :data="tableData"
				       stripe
					   :header-cell-style="
					   {background:'linear-gradient(180deg,rgba(10, 74, 216, 0.70) 30%,rgba(5, 49, 146, 0.30))',
					   color:'#00CFFF !important',
					   border:'none'
					   }"
				       style="width: 100%">
						<el-table-column
						prop="monthDay"
						label="年月">
				        </el-table-column>
						<el-table-column
						  prop="name"
						  label="姓名">
						</el-table-column>
				       <el-table-column
				         prop="department"
				         label="部门">
				       </el-table-column>
					   <el-table-column
					   prop="attendDays"
					   label="考勤天数" 
					   >
					   </el-table-column>
					   <el-table-column
					     prop="birthdaySubsidy"
					     label="生日补贴">
					   </el-table-column>
					   <el-table-column
					     prop="ageSubsidy"
					     label="司龄补助">
					   </el-table-column>
					   <el-table-column
					     prop="proSubsidy"
					     label="物业补贴费">
					   </el-table-column>
					   <el-table-column
					     prop="onlyChildSubsidy"
					     label="独生子女费">
					   </el-table-column>
					   <el-table-column
					     prop="cerSubsidy"
					     label="证书补贴">
					   </el-table-column>
					   <el-table-column
					     prop="bookSubsidy"
					     label="书报费">
					   </el-table-column>
					   <el-table-column
					     prop="laborSubsidy"
					     label="劳保费">
					   </el-table-column>
					   <el-table-column
					     prop="telSubsidy"
					     label="电话补贴">
					   </el-table-column>
					   <el-table-column
					     prop="computerSubsidy"
					     label="电脑补贴">
					   </el-table-column>
					   <el-table-column
					     prop="fieldSubsidy"
					     label="野外补贴">
					   </el-table-column>
					   <el-table-column
					     prop="sunstrokeSubsidy"
					     label="防暑费">
					   </el-table-column>
					   <el-table-column
					     prop="otherSubsidy"
					     label="其他应发">
					   </el-table-column>
					   <el-table-column
					     prop="baseSalary"
					     label="基本工资">
					   </el-table-column>
					   <el-table-column
					     prop="grossPay"
					     label="应发工资">
					   </el-table-column>
					   <el-table-column
					     prop="pension"
					     label="养老保险">
					   </el-table-column>
					   <el-table-column
					     prop="medical"
					     label="医疗保险">
					   </el-table-column>
					   <el-table-column
					     prop="largeMedical"
					     label="失业保险">
					   </el-table-column>
					   <el-table-column
					     prop="outOfWork"
					     label="大额医疗">
					   </el-table-column>
					   <el-table-column
					     prop="housingFund"
					     label="住房">
					   </el-table-column>
					   <el-table-column
					     prop="annuity"
					     label="企业年金">
					   </el-table-column>
					   <el-table-column
					     prop="tax"
					     label="个人所得税">
					   </el-table-column>
					   <el-table-column
					     prop="cutCount"
					     label="扣款合计">
					   </el-table-column>
					   <el-table-column
					     prop="actualPay"
					     label="实发工资">
					   </el-table-column>
					   <el-table-column
					     prop="note"
					     label="备注">
					   </el-table-column>
				     </el-table>
					 <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
			   </div>
			</template>
		</Titlel>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import Uplodezip from '@/components/team/Uplodezip.vue'
	import {mangegongzilist, addmanagement, managementchange, deletmanagement} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		inject:["reload"],
		components:{
			Titlel,
			Uplodezip
		},
		filters:{
			pay(e){
				return e/100
			}
		},
		 data() {
		      return {
				parentid:'',
				serdata:'',//搜索框
				tableData: [],//table
				currentPage: 1,// 默认显示第几页
				totalCount: 1,// 总条数，根据接口获取数据长度(注意：这里不能为空)
				pageSizes: [1, 2, 3, 4],// 个数选择器（可修改）
				PageSize: 20,// 默认每页显示的条数（可修改）
				wokerdilog:false,
				wokerdilogtwo:false,//修改dilog
				// 新增
				ruleForm: {
				 	"admissionDate": 0,
					"avatarUrl": "",
					"birthday": 0,
					"company": "",
					"department": "",
					"employeeId": 0,
					"gender": "",
					"home": "",
					"idCard": "",
					"jobMajor": "",
					"major": "",
					"name": "",
					"obtainTime": 0,
					"political": "",
					"school": "",
					"schooling": "",
					"telephone": "",
					"title": "",
					"workDate": 0
				},
				rules: {
				 idCard: [{ required: true, message: '请输入', trigger: 'blur' }]
				},
				entryDate:'',
				mounthyear:''
		      }
		    },
		mounted() {
			// 列表
			mangegongzilist({
				limit:20,
				offset:1,
				year:''
			}).then(res=>{
				this.tableData=res.data.items
				this.totalCount=res.data.total
			}).catch(()=>{
				this.$message.error('请求错误')
			})
		},
		methods:{
			// 显示第几页
			handleCurrentChange(val) {
				mangegongzilist({
					limit:20,
					offset:20*(val - 1),
					year:''
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			}
		},
		watch:{
			mounthyear(val){
				if(val != null){
					let obj={
							limit:20,
							offset:1,
							year:this.mounthyear.substring(0,4),
							month:this.mounthyear.substring(5,8)
						}
					mangegongzilist(obj).then(res=>{
						this.tableData=res.data.items
						this.totalCount=res.data.total
					}).catch(()=>{
						this.$message.error('请求错误')
					})
				}else{
					mangegongzilist({
						limit:20,
						offset:1,
						year:''
					}).then(res=>{
						this.tableData=res.data.items
						this.totalCount=res.data.total
					}).catch(()=>{
						this.$message.error('请求错误')
					})
				}
			
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
		height: 34px;
		margin: 20px 0;
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
	/deep/.el-table .el-table__cell{
		padding:0;
	}
	.el-icon-edit{
		color: #cca300;
		margin-right: 5px;
	}
	.el-icon-edit:hover{
		color: white;
	}
	.el-icon-circle-close{
		color: darkred;
	}
	.el-icon-circle-close:hover{
		color: white;
	}
</style>