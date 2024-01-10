<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>农名工管理</span>
			</template>
			<template v-slot:contont>
			   <div>
				   <div class="control">
					   <el-button type="primary" @click="backgo">上一级</el-button>
					   <el-button type="primary" @click="$store.state.uplodezip=true">导入</el-button>
					   <el-button type="primary" @click="$store.state.uploadheader=true">头像导入</el-button>
					    <el-button type="warning" @click="addwid()">新增</el-button>
						<div class="elserch">
						  <el-input placeholder="请输入内容" v-model="serdata" class="input-with-select">
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
				         label="个人照片" >
						 <template slot-scope="scope">
							 <img :src="scope.row.avatarUrl" >
						 </template>
				       </el-table-column>
				       <el-table-column
				         prop="workerName"
				         label="姓名">
				       </el-table-column>
					   <el-table-column
					     width="180"
					     prop="deptName"
					     label="劳务队伍">
					   </el-table-column>
					   <el-table-column
					     prop="gender"
					     label="性别">
					   </el-table-column>
					   <el-table-column
					     prop="age"
					     label="年龄">
					   </el-table-column>
					   <el-table-column
					    width="250"
					     prop="home"
					     label="家庭住址">
					   </el-table-column>
					   <el-table-column
					    width="150"
					     prop="idNum"
					     label="身份证">
					   </el-table-column>
					   <el-table-column
					    width="100"
					     prop="telephone"
					     label="联系电话">
					   </el-table-column>
					   <el-table-column
					   width="130"
					     prop="entryDate"
					     label="进场时间"
						 :formatter="getrdate"
						 >
					   </el-table-column>
					   <el-table-column
					     prop="typeOfWork"
					     label="工种">
					   </el-table-column>
					   <el-table-column
					   width="130"
					     prop="outDate"
					     label="退场时间" :formatter="getrdate">
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
		  title="新增工人数据"
		  :visible.sync="wokerdilog"
		  width="50%"
		  >
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="姓名" prop="workerName">
		      <el-input v-model="ruleForm.workerName"></el-input>
		    </el-form-item>
		    <!-- <el-form-item label="劳动队伍" prop="region">
		      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item> -->
		    <el-form-item label="性别" prop="gender">
		      <el-input v-model="ruleForm.gender"></el-input>
		    </el-form-item>
			<el-form-item label="年龄" prop="age">
			  <el-input v-model="ruleForm.age"></el-input>
			</el-form-item>
			<el-form-item label="家庭住址" prop="home">
			  <el-input v-model="ruleForm.home"></el-input>
			</el-form-item>
			<el-form-item label="身份证" prop="idNum">
			  <el-input v-model="ruleForm.idNum"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="telephone">
			  <el-input v-model="ruleForm.telephone"></el-input>
			</el-form-item>
		    <el-form-item label="进场时间" prop="entryDate">
				 <el-date-picker
				  v-model="ruleForm.entryDate"
				  type="date"
				  style="width: 100%;"
				  placeholder="选择日期"
				  format="yyyy 年 MM 月 dd 日"
				  value-format="timestamp">
				</el-date-picker>
		    </el-form-item>
		   <el-form-item label="工种" prop="typeOfWork">
		     <el-input v-model="ruleForm.typeOfWork"></el-input>
		   </el-form-item>
		   <el-form-item label="退场时间" prop="outDate">
		        <el-date-picker
		          v-model="ruleForm.outDate"
		          type="date"
				  style="width: 100%;"
		          placeholder="选择日期"
		          format="yyyy 年 MM 月 dd 日"
		          value-format="timestamp">
		        </el-date-picker>
		   </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="wokerdilog = false">关 闭</el-button>
		    <el-button type="primary" @click="submit('ruleForm')">提 交</el-button>
		  </span>
		</el-dialog>
		
		
		<!-- 修改 -->
		<el-dialog
		  title="修改工人数据"
		  :visible.sync="wokerdilogchange"
		  width="50%"
		  >
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="姓名" prop="workerName">
		      <el-input v-model="ruleForm.workerName"></el-input>
		    </el-form-item>
		    <el-form-item label="劳动队伍" prop="deptId">
		      <el-select v-model="ruleForm.deptId" placeholder="请选择活动区域" style="left: 0;">
		        <el-option v-for="(item,index) in option" :label="item.deptName" :value="Number(item.deptId) "></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="性别" prop="gender">
		      <el-input v-model="ruleForm.gender"></el-input>
		    </el-form-item>
			<el-form-item label="年龄" prop="age">
			  <el-input v-model="ruleForm.age"></el-input>
			</el-form-item>
			<el-form-item label="家庭住址" prop="home">
			  <el-input v-model="ruleForm.home"></el-input>
			</el-form-item>
			<el-form-item label="身份证" prop="idNum">
			  <el-input v-model="ruleForm.idNum"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="telephone">
			  <el-input v-model="ruleForm.telephone"></el-input>
			</el-form-item>
		    <el-form-item label="进场时间" prop="entryDate">
				 <el-date-picker
				  v-model="ruleForm.entryDate"
				  type="date"
				  style="width: 100%;"
				  placeholder="选择日期"
				  format="yyyy 年 MM 月 dd 日"
				  value-format="timestamp">
				</el-date-picker>
		    </el-form-item>
		   <el-form-item label="工种" prop="typeOfWork">
		     <el-input v-model="ruleForm.typeOfWork"></el-input>
		   </el-form-item>
		   <el-form-item label="退场时间" prop="outDate">
		        <el-date-picker
		          v-model="ruleForm.outDate"
		          type="date"
				  style="width: 100%;"
		          placeholder="选择日期"
		          format="yyyy 年 MM 月 dd 日"
		          value-format="timestamp">
		        </el-date-picker>
		   </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="wokerdilogchange = false">关 闭</el-button>
		    <el-button type="primary" @click="changerowsub('ruleForm')">提 交</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import Uplodezip from '@/components/team/Uplodezip.vue'
	import {workerName, addwokers, deletwokers,buildingUnits,Unitsopdata} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		inject:["reload"],
		components:{
			Titlel,
			Uplodezip
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
				wokerdilogchange:false,//修改dilog
				// 新增工人
				ruleForm: {
				 	"age": null,
				 	"deptId": "",
				 	"entryDate": 0,
				 	"gender": "",
				 	"home": "",
				 	"idNum": "",
				 	"outDate": 0,
				 	"telephone": "",
				 	"typeOfWork": "",
				 	"workerName": ""
				},
				rules: {
				 age: [{ required: true, message: '请输入', trigger: 'blur' }],
				 entryDate: [{ required: true, message: '请输入', trigger: 'blur' }],
				 gender: [{ required: true, message: '请输入', trigger: 'blur' }],
				 home: [{ required: true, message: '请输入', trigger: 'blur' }],
				 idNum: [{ required: true, message: '请输入', trigger: 'blur' }],
				 telephone: [{ required: true, message: '请输入', trigger: 'blur' }],
				 typeOfWork: [{ required: true, message: '请输入', trigger: 'blur' }],
				 workerName: [{ required: true, message: '请输入', trigger: 'blur' }]
				},
				option:[]
		      }
		    },
		mounted() {
			this.parentid=this.$route.query.parentid
			this.ruleForm.deptId=this.$route.query.parentid
			// 列表
			workerName({
				limit:20,
				offset:0,
				deptId:this.parentid,
				workerName:''
			}).then(res=>{
				this.tableData=res.data.items
				this.totalCount=res.data.total
			}).catch(()=>{
				this.$message.error('请求错误')
			})
			buildingUnits(this.$route.query.grandeid).then(res=>{
				this.option=res.data.items
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
				workerName({
					limit:20,
					offset:0,
					deptId:this.parentid,
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
				// 改变默认的页数
				workerName({
					limit:20,
					offset:(val - 1) *20,
					deptId:this.parentid,
					workerName:''
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			// 新增
			submit(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  addwokers(this.ruleForm).then(res=>{
						  if(res.code == 200){
							 this.wokerdilog = false
							 this.$message.success("添加成功")
							 this.reload()
						  }else{
							 this.$message.error(res.data.detail) 
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
				this.wokerdilogchange=true
			},
			changerowsub(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  Unitsopdata(this.ruleForm).then(res=>{
						  if(res.code == 200){
							 this.wokerdilog = false
							 this.$message.success("修改成功")
							 this.reload()
						  }else{
							 this.$message.error(res.data.detail) 
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
			
			addwid(){
				this.ruleForm={
				 	"age": null,
				 	"deptId":this.$route.query.parentid,
				 	"entryDate": 0,
				 	"gender": "",
				 	"home": "",
				 	"idNum": "",
				 	"outDate": 0,
				 	"telephone": "",
				 	"typeOfWork": "",
				 	"workerName": ""
				},
				this.wokerdilog=true
			},
			deletrow(i){
				this.$confirm('是否确认删除'+ i.workerName+'的数据记录', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					deletwokers(i.workerId).then(res=>{
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
			},
			// 返回上一级
			backgo(){
				this.$router.push({
					path:'/synthesize/team/index',
					query:{
						isback:true,
						grandeid:this.$route.query.grandeid,
						type:1
					}
					
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