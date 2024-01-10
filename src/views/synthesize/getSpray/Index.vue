<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>智能喷淋</span>
			</template>
			<template v-slot:contont>
				<div class="control">
					<div class="elserch">
					  <el-input placeholder="请输入监控点名称" v-model="serdata" class="input-with-select">
						<el-button slot="append" @click="serchdata">搜索</el-button>
					  </el-input>
					</div>
				 </div>
			   <div>
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
						type="index"
						label="序号" 
						>
				        </el-table-column>
				       <el-table-column
					   width="200"
				         prop="monitorName"
				         label="监控点名称">
				       </el-table-column>
				       <el-table-column
				         prop="sprayValue"
				         label="养护状态值">
						 <template slot-scope="scope">
						 		{{scope.row.sprayValue | sprayValue}}
						 </template>
				       </el-table-column>
					   <el-table-column
					   width="200"
					     prop="createTime"
					     label="上报时间">
					   </el-table-column>
				     </el-table>
					 <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						 :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
			   </div>
			</template>
		</Titlel>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import {getspray} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		components:{
			Titlel,
		},
		filters:{
			sprayValue(e){
				if(e == 0){
					return '停止养护'
				}else if(e == 1){
					return '正在养护'
				}
			}
		},
		 data() {
		      return {
				serdata:'',//搜索框
		        tableData: [],//table
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// // 个数选择器（可修改）
				// pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 20,
		      }
		    },
		mounted() {
			// 列表
			getspray({
				pageSize:20,
				pageNum:1
			}).then(res=>{
				this.tableData=res.data.items
				this.totalCount=res.data.total
			}).catch(()=>{
				this.$message.error('请求错误')
			})
		},
		methods:{
			tableHeaderColor () {
				return { background: 'transparent' }
			},
			serchdata(){
				getspray({
					pageSize:20,
					pageNum:1,
					monitorName:this.serdata
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
					this.currentPage = 1
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				getspray({
					pageSize:20,
					pageNum:val,
					monitorName:this.serdata
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
		}
	}
</script>

<style scoped>
	/deep/  .el-table, .el-table__expanded-cell {
	    background-color: transparent;
	}
	
	/deep/ .el-table tr {
	    background-color: transparent !important;
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
	/deep/.el-table .el-table__cell{
		padding: 5px 0;
	}
</style>