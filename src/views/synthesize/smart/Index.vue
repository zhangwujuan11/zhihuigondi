<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>智慧张拉</span>
			</template>
			<template v-slot:contont>
			   <div>
				   <div class="control">
					   <el-button type="warning" @click="setsmart()" style="margin-right: 10px;">新增</el-button>
					    <el-button type="primary" @click="exsmart()" style="margin-right: 10px;">导出</el-button>
					   <el-input placeholder="请输入桥名" v-model="queryfrom.bridgerName"></el-input>
					   <el-input placeholder="请输入梁片" v-model="queryfrom.girderName"></el-input>
						<el-button type="primary" @click="getList()">搜索</el-button>
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
						
						<!-- <el-table-column
						type="index"
						label="序号" 
						>
				        </el-table-column> -->
				       <el-table-column
				         prop="bridgerName"
				         label="桥名" >
				       </el-table-column>
				       <el-table-column
				         prop="girderName"
				         label="梁片">
				       </el-table-column>
					   
					   <el-table-column
					     prop="holeNo"
					     label="孔号">
					   </el-table-column>
					   <el-table-column
					     prop="designTensileForce"
					     label="设计张拉力">
					   </el-table-column>
					   <el-table-column
					     prop="designExtend"
					     label="设计伸长量">
					   </el-table-column>
					   <el-table-column
					     prop="tensileForce"
					     label="张拉力">
					   </el-table-column>
					   <el-table-column
					     prop="extend"
					     label="伸长量">
						  
					   </el-table-column>
					   <el-table-column
					   prop="extendOffset"
					     label="伸长量偏差">
					   </el-table-column>
					   <el-table-column label="操作">
							<template slot-scope="scope">
								<el-link type="primary" style="margin-right: 10px;" icon="el-icon-edit"  :underline="false" @click="setsmart(scope.row)">修改</el-link>
								<el-link type="danger" icon="el-icon-delete"  :underline="false" @click="opens(scope.row)">删除</el-link>
						    </template>
					   </el-table-column>
				     </el-table>
					 <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						 :page-size="queryfrom.pageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
			   </div>
			</template>
		</Titlel>
		<el-dialog
		  :title="title"
		  :visible.sync="dialogVisible"
		  width="70%"
		  >
			<el-form :model="form" :rules="rule" label-width="100px" ref="formName">
			  <el-form-item label="桥名" prop="bridgerName">
			    <el-input v-model="form.bridgerName"></el-input>
			  </el-form-item>
			 <el-form-item label="梁片名" prop="girderName">
			   <el-input v-model="form.girderName"></el-input>
			 </el-form-item>
			 <el-form-item label="孔号">
			   <el-input v-model="form.holeNo"></el-input>
			 </el-form-item>
			 <el-form-item label="设计伸长量">
			   <el-input v-model="form.designExtend"></el-input>
			 </el-form-item>
			 <el-form-item label="设计张拉力">
			   <el-input v-model="form.designTensileForce"></el-input>
			 </el-form-item>
			 <el-form-item label="伸长量偏差">
			   <el-input v-model="form.extendOffset"></el-input>
			 </el-form-item>
			 <el-form-item label="张拉力">
			   <el-input v-model="form.tensileForce"></el-input>
			 </el-form-item>
			 <el-form-item label="伸长量">
			   <el-input v-model="form.extend"></el-input>
			 </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="subform">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import {smartlist, serchsamrtid, smartupdate, addsmartlist, detelsmart, exportsmart} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		components:{
			Titlel
		},
		 data() {
		      return {
				  queryfrom:{
					pageNum:1,
					pageSize:10,
					bridgerName:'',
					girderName:''
				  },
				 totalCount: 1, 
				 form:{
					bridgerName:'',
					designExtend:'',
					designTensileForce:'',
					extend:'',
					extendOffset:'',
					girderName:'',
					holeNo:'',
					tensileForce:'',
				 },
				rule:{
				  bridgerName: [{ required: true, message: '请输入桥名', trigger: 'blur' }],
				  girderName: [{ required: true, message: '请输入梁名', trigger: 'blur' }]
				 },
				dialogVisible:false,//修改、增加
		        tableData: [],//table
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				title:''
		      }
		    },
		mounted() {
			this.getList()
		},
		methods:{
			// 获取数据列表
			getList(){
				smartlist(this.queryfrom).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			},
			
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
			// 显示第几页
			handleCurrentChange(val) {
				this.queryfrom.pageNum=val
				this.getList()
				this.currentPage = val
			},
			
			// 新增\修改
			setsmart(val){
				if(val){
					this.title="修改"
					serchsamrtid(val.id).then(res=>{
						this.form=res.data
						 this.dialogVisible=true
					})
				}else{
					this.title="新增"
					this.form={
					bridgerName:'',
					designExtend:'',
					designTensileForce:'',
					extend:'',
					extendOffset:'',
					girderName:'',
					holeNo:'',
					tensileForce:'',
				 }
				 this.dialogVisible=true
				}
			},
			// 提交表单
			subform(){
				if(this.form.id){
					smartupdate(this.form).then(res=>{
						if(res.code == 200){
							this.$message.success('修改成功')
							this.dialogVisible=false
							this.getList()
						}else{
							this.$message.error(res.message)
						}
					})
				}else{
					this.$refs["formName"].validate((valid) => {
					  if (valid) {
						  addsmartlist(this.form).then(res=>{
						  	if(res.code ==200){
						  		this.$message.success('新增成功')
						  		this.dialogVisible=false
						  		this.getList()
						  		}else{
						  			this.$message.error(res.message)
						  		}
						  })
					  }else{
						  return false;
					  }
					  })
						
				}
			},
			opens(val){
			 this.$confirm('确认删除该条数据？', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
					}).then(() => {
						detelsmart(val.id).then(res=>{
							if(res.code == 200){
								this.$message({
								  type: 'success',
								  message: '删除成功!'
								})
								this.getList()
							}else{
							this.$message.error(res.message)	
							this.getList()
							}
						})
					}).catch(() => {
					  this.$message({
						type: 'info',
						message: '已取消删除'
					  });          
					});
			},
			exsmart(){
				exportsmart({
					bridgerName:this.queryfrom.bridgerName,
					girderName:this.queryfrom.girderName
					}).then(res=>{
					this.downloadFiles(res)
				})
			},
			// 解码下载方法
			downloadFiles(data) {
			   if (typeof window.chrome !== 'undefined') {
			       var link = document.createElement('a');
			       link.href = window.URL.createObjectURL(data);
			       link.download = "张拉数据.xls";
			       link.click();
			   } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
			       var blob = new Blob([data], { type: 'application/force-download' });
			       window.navigator.msSaveBlob(blob, "张拉数据.xls");
			   } else {
			       var file = new File([data], "张拉数据.xls", { type: 'application/force-download' });
			       window.open(URL.createObjectURL(file));
							}
						},
						
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
		align-items: center;
	}
	/deep/.control .el-input{
		width: 200px ;
		margin-right: 20px;
	}
</style>