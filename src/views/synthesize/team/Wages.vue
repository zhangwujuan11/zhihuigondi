<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>农名工工资</span>
			</template>
			<template v-slot:contont>
			   <div>
				   <div class="control">
					   <el-button type="primary" @click="$router.back()">上一级</el-button>
					   <el-date-picker
					     v-model="mounthyear"
					     type="month"
					     style="width:155px;margin: 0 15px;"
					     placeholder="选择日期"
					     format="yyyy 年 MM 月"
					     value-format="yyyy-MM"
					     >
					   </el-date-picker>
					   <el-button type="primary" @click="$store.state.uplodeg=true">导入</el-button>
					    <el-button type="warning" @click="addwid()">新增</el-button>
						<div class="elserch">
						  <el-input placeholder="请输入姓名" v-model="serdata" class="input-with-select">
						   <el-select v-model="select" slot="prepend" placeholder="全部">
						      <el-option label="全部" :value="140101"></el-option>
						    </el-select>
						    <el-button slot="append" @click="serchdata">搜索</el-button>
						  </el-input>
						</div>
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
						<el-table-column label="操作">
						 <template slot-scope="scope">
						  <div>
							  <i @click="changerow(scope.row)" class="el-icon-edit"></i>
							  <i @click="deletrow(scope.row)" class="el-icon-circle-close"></i>
						  </div>
						</template>
						</el-table-column>
						<el-table-column
						type="index"
						label="序号" 
						>
				        </el-table-column>
				       <el-table-column
				         label="年月" >
						 <template slot-scope="scope">
							 {{scope.row.year}}-{{scope.row.month}}
						 </template>
				       </el-table-column>
				       <el-table-column
					      width="180"
				         prop="deptName"
				         label="工队">
				       </el-table-column>
					   <el-table-column
					     prop="workerName"
					     label="姓名">
					   </el-table-column>
					   <el-table-column
					     prop="typeOfWork"
					     label="工种/职务">
					   </el-table-column>
					   <el-table-column
					     width="180"
					     prop="bankName"
					     label="开户行名称">
					   </el-table-column>
					   <el-table-column
					    width="250"
					     prop="cardNo"
					     label="工资卡账号">
					   </el-table-column>
					   <el-table-column
					     prop="payBefore"
					     label="预支工资(元)">
							 <template slot-scope="scope">
									{{scope.row.payBefore | pay}}
							 </template>
					   </el-table-column>
					   <el-table-column
					     prop="cutCount"
					     label="代缴代扣(元)">
						 <template slot-scope="scope">
						 	{{scope.row.cutCount | pay}}
						 </template>
					   </el-table-column>
					   <el-table-column
					     prop="temperatureSubsidies"
					     label="高温补助"
						 >
						 <template slot-scope="scope">
						 	{{scope.row.temperatureSubsidies | pay}}
						 </template>
					   </el-table-column>
					   <el-table-column
					     prop="grossPay"
					     label="本月应付工资(元)">
						  <template slot-scope="scope">
						  	{{scope.row.grossPay | pay}}
						  </template>
					   </el-table-column>
				     </el-table>
					 <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
			   </div>
			</template>
		</Titlel>
		<!-- 上传zip -->
		<Uplodezip></Uplodezip>
		 
		<!-- 新增 -->
		<el-dialog
		  title="新增"
		  :visible.sync="wokerdilog"
		  width="50%"
		  >
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="进场时间">
			  	 <el-date-picker
			  	  v-model="entryDate"
			  	  type="month"
			  	  style="width: 100%;"
			  	  placeholder="选择日期"
			  	  format="yyyy 年 MM 月"
				  value-format="yyyy-MM"
			  	  >
			  	</el-date-picker>
			  </el-form-item>
		    <el-form-item label="姓名" prop="workerName">
		      <el-input v-model="ruleForm.workerName"></el-input>
		    </el-form-item>
		    <el-form-item label="身份证" prop="idNum">
		      <el-input v-model="ruleForm.idNum"></el-input>
		    </el-form-item>
			<el-form-item label="开户行名称" prop="bankName">
			  <el-input v-model="ruleForm.bankName"></el-input>
			</el-form-item>
			<el-form-item label="工资卡账号" prop="cardNo">
			  <el-input v-model="ruleForm.cardNo"></el-input>
			</el-form-item>
			<el-form-item label="预支工资(元)" prop="payBefore">
			  <el-input v-model="ruleForm.payBefore"></el-input>
			</el-form-item>
			<el-form-item label="代缴代扣(元)" prop="cutCount">
			  <el-input v-model="ruleForm.cutCount"></el-input>
			</el-form-item>
		   <el-form-item label="高温补助(元)" prop="temperatureSubsidies">
		     <el-input v-model="ruleForm.temperatureSubsidies"></el-input>
		   </el-form-item>
		   <el-form-item label="应付工资(元)" prop="grossPay">
		     <el-input v-model="ruleForm.grossPay"></el-input>
		   </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="wokerdilog = false">关 闭</el-button>
		    <el-button type="primary" @click="submit('ruleForm')">提 交</el-button>
		  </span>
		</el-dialog>
		
		<!-- 修改 -->
		<el-dialog
		  title="修改"
		  :visible.sync="wokerdilogtwo"
		  width="50%"
		  >
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <!-- <el-form-item label="进场时间"> -->
			  	<!-- <el-date-picker
			  	  v-model="entryDate"
			  	  type="month"
			  	  style="width: 100%;"
			  	  placeholder="选择日期"
			  	  format="yyyy 年 MM 月"
				  value-format="yyyy-MM"
			  	  >
			  	</el-date-picker> -->
			  <!-- </el-form-item> -->
		    <el-form-item label="姓名" prop="workerName">
		      <el-input v-model="ruleForm.workerName"></el-input>
		    </el-form-item>
		   <!-- <el-form-item label="身份证" prop="idNum">
		      <el-input v-model="ruleForm.idNum"></el-input>
		    </el-form-item> -->
			<el-form-item label="开户行名称" prop="bankName">
			  <el-input v-model="ruleForm.bankName"></el-input>
			</el-form-item>
			<el-form-item label="工资卡账号" prop="cardNo">
			  <el-input v-model="ruleForm.cardNo"></el-input>
			</el-form-item>
			<el-form-item label="预支工资(元)" prop="payBefore">
			  <el-input v-model="ruleForm.payBefore"></el-input>
			</el-form-item>
			<el-form-item label="代缴代扣(元)" prop="cutCount">
			  <el-input v-model="ruleForm.cutCount"></el-input>
			</el-form-item>
		   <el-form-item label="高温补助(元)" prop="temperatureSubsidies">
		     <el-input v-model="ruleForm.temperatureSubsidies"></el-input>
		   </el-form-item>
		   <el-form-item label="应付工资(元)" prop="grossPay">
		     <el-input v-model="ruleForm.grossPay"></el-input>
		   </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="wokerdilogtwo = false">关 闭</el-button>
		    <el-button type="primary" @click="submitchange('ruleForm')">提 交</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import Uplodezip from '@/components/team/Uplodezip.vue'
	import {workerSalary,workerserch, addgongzi, updatagongzi, detlegongzi} from '@/utils/synthesize.js'
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
				select:'',//下拉款
				tableData: [],//table
				currentPage: 1,// 默认显示第几页
				totalCount: 1,// 总条数，根据接口获取数据长度(注意：这里不能为空)
				pageSizes: [1, 2, 3, 4],// 个数选择器（可修改）
				PageSize: 20,// 默认每页显示的条数（可修改）
				wokerdilog:false,
				wokerdilogtwo:false,//修改dilog
				// 新增
				ruleForm: {
				 	"bankName": "",
					"cardNo": "",
					"cutCount": null,
					"grossPay": null,
					"idNum": "",
					"month": "",
					"payBefore": null,
					"telephone": "",
					"temperatureSubsidies": null,
					"workerId": "",
					"workerName": "",
					"year":""
				},
				rules: {
				 idNum: [{ required: true, message: '请输入', trigger: 'blur' }],
				 bankName: [{ required: true, message: '请输入', trigger: 'blur' }],
				 cardNo: [{ required: true, message: '请输入', trigger: 'blur' }],
				 typeOfWork: [{ required: true, message: '请输入', trigger: 'blur' }],
				 workerName: [{ required: true, message: '请输入', trigger: 'blur' }]
				},
				entryDate:'',
				mounthyear:''
		      }
		    },
		mounted() {
			this.parentid=this.$route.query.parentid
			this.ruleForm.deptId=this.$route.query.parentid
			// 列表
			workerSalary({
				deptId:this.parentid,
				limit:20,
				month:'',
				offset:1,
				year:'',
				workerName:''
			}).then(res=>{
				this.tableData=res.data.items
				this.totalCount=res.data.total
			}).catch(()=>{
				this.$message.error('请求错误')
			})
		},
		methods:{
			// 搜索指定信息
			serchdata(){
				workerSalary({
					deptId:this.parentid,
					limit:20,
					month:this.mounthyear.substring(5,8),
					offset:1,
					year:this.mounthyear.substring(0,4),
					workerName:this.serdata
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			},
			// 显示第几页
			handleCurrentChange(val) {
				workerSalary({
					deptId:this.parentid,
					limit:20,
					month:'',
					offset:20*(val - 1),
					year:'',
					workerName:''
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			submit(formName){
				let str= this.entryDate
				this.ruleForm.year=str.substring(0,4)
				this.ruleForm.month=str.substring(5,8)
				this.ruleForm.cutCount=this.ruleForm.cutCount *100
				this.ruleForm.grossPay=this.ruleForm.grossPay *100
				this.ruleForm.payBefore=this.ruleForm.payBefore *100
				this.ruleForm.temperatureSubsidies=this.ruleForm.temperatureSubsidies*100
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  addgongzi(this.ruleForm).then(res=>{
						  if(res.code == 200){
							  this.wokerdilog=false
							  this.$message.success("添加成功")
							  this.reload()
						  }else{
							 this.$message.error(res.message) 
						  }
					  }).catch(()=>{
						  this.$message.error("失败") 
					  })
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			// 修改工人数据
			changerow(i){
				this.ruleForm=i
				this.wokerdilogtwo=true
			},
			// 提交修改
			submitchange(){
				this.ruleForm.cutCount=this.ruleForm.cutCount *100
				this.ruleForm.grossPay=this.ruleForm.grossPay *100
				this.ruleForm.payBefore=this.ruleForm.payBefore *100
				this.ruleForm.temperatureSubsidies=this.ruleForm.temperatureSubsidies*100
				updatagongzi(this.ruleForm).then(res=>{
					if(res.code == 200){
					  this.wokerdilog=false
					  this.$message.success("修改成功")
					  this.reload()
					}else{
					 this.$message.error(res.message) 
					}
				})
			},
			addwid(){
				this.wokerdilog=true
			},
			deletrow(i){
				this.$confirm('是否确认删除'+ i.workerName+'的数据记录', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					detlegongzi(i.id).then(res=>{
						if(res.code == 200){
							this.$message.success(res.data)
							this.reload()
						}
					})
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			}
			
		},
		watch:{
			mounthyear(val){
				workerSalary({
						deptId:this.parentid,
						limit:20,
						month:val.substring(5,8),
						offset:1,
						year:val.substring(0,4),
						workerName:''
					}).then(res=>{
						this.tableData=res.data.items
						this.totalCount=res.data.total
					}).catch(()=>{
						this.$message.error('请求错误')
					})
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
		width: 50px;
		height: 50px;
	}
	/deep/.el-table .cell{
	    font-size: 12px;
	    text-align: center;
	    max-width: 250px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;}
	/deep/.el-table .el-table__cell{
		padding: 2px 0;
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