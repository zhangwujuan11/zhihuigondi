<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>项目成员管理</span>
			</template>
			<template v-slot:contont>
			   <div>
				   <div class="control">
					   <el-button type="primary" @click="$store.state.mangentup=true">成员导入</el-button>
					   <el-button type="primary" @click="$store.state.mangentuplode=true">头像导入</el-button>
					    <el-button type="primary" @click="waork()">模板下载</el-button>
					    <el-button type="warning" @click="addwid()">新增</el-button>
						<div class="elserch">
						  <el-input placeholder="请输入搜索内容" v-model="serdata" class="input-with-select">
						    <el-button slot="append" @click="serchdata">搜索</el-button>
						  </el-input>
						</div>
				   </div>
				    <el-table
				      :data="tableData"
				       stripe
					    v-loading="loading"
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
						prop="name"
						label="姓名" 
						>
				        </el-table-column>
						<el-table-column
						  label="头像" >
							 <template slot-scope="scope">
								 <img :src="scope.row.avatarUrl" >
							 </template>
						</el-table-column>
						<el-table-column
						   width="160"
						  prop="idCard"
						  label="身份证">
						</el-table-column>
						<el-table-column
						width="160"
						prop="company"
						label="单位" 
						>
						</el-table-column>
				       <el-table-column
				         prop="department"
				         label="部门">
				       </el-table-column>
					   <el-table-column
					     prop="title"
					     label="岗位/职位">
					   </el-table-column>
					   <el-table-column
					     prop="gender"
					     label="性别">
					   </el-table-column>
					   <el-table-column
					     prop="political"
					     label="政治面貌">
					   </el-table-column>
					   <el-table-column
					   :formatter="getrdate"
					   width="100"
					     prop="birthday"
					     label="出生日期">
					   </el-table-column>
					   <el-table-column
					   width="120"
					     prop="school"
					     label="毕业学校">
					   </el-table-column>
					   <el-table-column
					   width="100"
					   :formatter="getrdate"
					     prop="admissionDate"
					     label="毕业时间">
					   </el-table-column>
					   <el-table-column
					     prop="schooling"
					     label="学历">
					   </el-table-column>
					   <el-table-column
					     prop="major"
					     label="专业">
					   </el-table-column>
					   <el-table-column
					   :formatter="getrdate"
					   width="100"
					     prop="workDate"
					     label="工作时间">
					   </el-table-column>
					   <el-table-column
					     prop="jobMajor"
					     label="专业技术职务">
					   </el-table-column>
					   <el-table-column
					   width="100"
					   :formatter="getrdate"
					     prop="obtainTime"
					     label="取得时间">
					   </el-table-column>
					   <el-table-column
					     prop="home"
					     label="家庭住址">
					   </el-table-column>
					   <el-table-column
					   width="100"
					     prop="telephone"
					     label="联系电话">
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
			  <el-form-item label="姓名" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="身份证" prop="idCard">
			    <el-input v-model="ruleForm.idCard"></el-input>
			  </el-form-item>
			  <el-form-item label="单位" prop="company">
			    <el-input v-model="ruleForm.company"></el-input>
			  </el-form-item>
			  <el-form-item label="部门" prop="department">
			  <el-input v-model="ruleForm.department"></el-input>
			</el-form-item>
			<el-form-item label="岗位/职务" prop="title">
			  <el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
			  <el-input v-model="ruleForm.gender"></el-input>
			</el-form-item>
			 <el-form-item label="政治面貌">
			    <el-select style="width: 90%;" v-model="ruleForm.political" placeholder="请选择政治面貌">
			      <el-option label="党员" value="党员"></el-option>
			      <el-option label="团员" value="团员"></el-option>
				  <el-option label="群众" value="群众"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="出生日期" prop="birthday">
			    <el-date-picker
			      v-model="ruleForm.birthday"
			      type="date"
			      style="width:100%;"
			      placeholder="选择日期"
			      format="yyyy 年 MM 月 dd 日"
			      value-format="timestamp"
			      >
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="毕业学校" prop="school">
			    <el-input v-model="ruleForm.school"></el-input>
			  </el-form-item>
			  <el-form-item label="毕业时间" prop="admissionDate">
			  	 <el-date-picker
			  	  v-model="ruleForm.admissionDate"
			  	  type="date"
			  	  style="width: 100%;"
			  	  placeholder="选择日期"
			  	  format="yyyy 年 MM 月 dd 日"
			  	  value-format="timestamp"
			  	  >
			  	</el-date-picker>
			  </el-form-item>
			  <el-form-item label="学历" prop="schooling">
				<el-input v-model="ruleForm.schooling"></el-input>
			  </el-form-item>
			  <el-form-item label="专业" prop="major">
			  		<el-input v-model="ruleForm.major"></el-input>
			  </el-form-item>
			<el-form-item label="工作时间" prop="workDate">
				 <el-date-picker
				  v-model="ruleForm.workDate"
				  type="date"
				  style="width: 100%;"
				  placeholder="选择日期"
				  format="yyyy 年 MM 月 dd 日"
				  value-format="timestamp"
				  >
				</el-date-picker>
			</el-form-item>
			<el-form-item label="专业技术职务" prop="jobMajor">
				<el-input v-model="ruleForm.jobMajor"></el-input>
			</el-form-item>
			<el-form-item label="取得时间" prop="jobtainTime">
				 <el-date-picker
				  v-model="ruleForm.jobtainTime"
				  type="date"
				  style="width: 100%;"
				  placeholder="选择日期"
				  format="yyyy 年 MM 月 dd 日"
				  value-format="timestamp"
				  >
				</el-date-picker>
			</el-form-item>
			<el-form-item label="家庭住址" prop="home">
				<el-input v-model="ruleForm.home"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="telephone">
				<el-input v-model="ruleForm.telephone"></el-input>
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
		  <el-form-item label="姓名" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="身份证" prop="idCard">
			<el-input v-model="ruleForm.idCard"></el-input>
		  </el-form-item>
		  <el-form-item label="单位" prop="company">
			<el-input v-model="ruleForm.company"></el-input>
		  </el-form-item>
		  <el-form-item label="部门" prop="department">
		  <el-input v-model="ruleForm.department"></el-input>
		</el-form-item>
		<el-form-item label="岗位/职务" prop="title">
		  <el-input v-model="ruleForm.title"></el-input>
		</el-form-item>
		<el-form-item label="性别" prop="gender">
		  <el-input v-model="ruleForm.gender"></el-input>
		</el-form-item>
		 <el-form-item label="政治面貌">
			<el-select style="width: 90%;" v-model="ruleForm.political" placeholder="请选择政治面貌">
			  <el-option label="党员" value="党员"></el-option>
			  <el-option label="团员" value="团员"></el-option>
			  <el-option label="群众" value="群众"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="出生日期" prop="birthday">
			<el-date-picker
			  v-model="ruleForm.birthday"
			  type="date"
			  style="width:100%;"
			  placeholder="选择日期"
			  format="yyyy 年 MM 月 dd 日"
			  value-format="timestamp"
			  >
			</el-date-picker>
		  </el-form-item>
		  <el-form-item label="毕业学校" prop="school">
			<el-input v-model="ruleForm.school"></el-input>
		  </el-form-item>
		  <el-form-item label="毕业时间" prop="admissionDate">
			 <el-date-picker
			  v-model="ruleForm.admissionDate"
			  type="date"
			  style="width: 100%;"
			  placeholder="选择日期"
			  format="yyyy 年 MM 月 dd 日"
			  value-format="timestamp"
			  >
			</el-date-picker>
		  </el-form-item>
		  <el-form-item label="学历" prop="schooling">
			<el-input v-model="ruleForm.schooling"></el-input>
		  </el-form-item>
		  <el-form-item label="专业" prop="major">
				<el-input v-model="ruleForm.major"></el-input>
		  </el-form-item>
		<el-form-item label="工作时间" prop="workDate">
			 <el-date-picker
			  v-model="ruleForm.workDate"
			  type="date"
			  style="width: 100%;"
			  placeholder="选择日期"
			  format="yyyy 年 MM 月 dd 日"
			  value-format="timestamp"
			  >
			</el-date-picker>
		</el-form-item>
		<el-form-item label="专业技术职务" prop="jobMajor">
			<el-input v-model="ruleForm.jobMajor"></el-input>
		</el-form-item>
		<el-form-item label="取得时间" prop="jobtainTime">
			 <el-date-picker
			  v-model="ruleForm.jobtainTime"
			  type="date"
			  style="width: 100%;"
			  placeholder="选择日期"
			  format="yyyy 年 MM 月 dd 日"
			  value-format="timestamp"
			  >
			</el-date-picker>
		</el-form-item>
		<el-form-item label="家庭住址" prop="home">
			<el-input v-model="ruleForm.home"></el-input>
		</el-form-item>
		<el-form-item label="联系电话" prop="telephone">
			<el-input v-model="ruleForm.telephone"></el-input>
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
	import {managementlist, addmanagement, managementchange, deletmanagement} from '@/utils/synthesize.js'
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
				mounthyear:'',
				loading:true
		      }
		    },
		mounted() {
			// 列表
			managementlist({
				limit:20,
				offset:1,
				employeeName:''
			}).then(res=>{
				this.tableData=res.data.items
				this.totalCount=res.data.total
				this.loading=false
			}).catch(()=>{
				this.$message.error('请求错误')
			})
		},
		methods:{
			// 日期截取
			getrdate(row, column, cellValue, index){
				if(cellValue == null){
					return '-'
				}else{
					var date =new Date(cellValue) ;
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					return year + '-' + month + '-' + day
				}
			},
			// 搜索指定信息
			serchdata(){
				this.loading=true
				managementlist({
					limit:20,
					offset:1,
					employeeName:this.serdata
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
					this.loading=false
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			},
			// 显示第几页
			handleCurrentChange(val) {
				this.loading=true
				managementlist({
					limit:20,
					offset:20*(val - 1),
					employeeName:this.serdata
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
					this.loading=false
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			submit(formName){
				let str= this.entryDate
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  addmanagement(this.ruleForm).then(res=>{
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
				managementchange(this.ruleForm).then(res=>{
					if(res.code == 200){
					  this.wokerdilog=false
					  this.$message.success("修改成功")
					  this.reload()
					}else{
					 this.$message.error(res.message) 
					}
				})
			},
			// 新增
			addwid(){
				this.wokerdilog=true
			},
			deletrow(i){
				this.$confirm('是否确认删除'+ i.name+'的数据记录', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					deletmanagement(i.employeeId).then(res=>{
						if(res.code == 200){
							this.$message.success("删除成功")
							this.reload()
						}
					})
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			waork(){
				window.location.href = "https://wisdom-fq-g228.obs.cn-east-3.myhuaweicloud.com:443/aiying/import/moban/xmcy.xlsx"
			}
		},
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