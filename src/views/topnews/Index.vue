<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>
					消息通知
				</span>
			</template>
			<template v-slot:contont>
			   <div>
				    <el-table
				      :data="tableData"
				       stripe
					   @row-click="handleTableRow"
					   :header-cell-style="
					   {background:'linear-gradient(180deg,rgba(10, 74, 216, 0.70) 30%,rgba(5, 49, 146, 0.30))',
					   color:'#00CFFF !important',
					   border:'none'
					   }"
				       style="width: 100%">
						<el-table-column
						prop="id"
						label="序号" 
						>
				        </el-table-column>
				       <el-table-column
				         prop="title"
				         label="标题" >
				       </el-table-column>
				       <el-table-column
				         prop="tcontent"
				         label="内容">
				       </el-table-column>
					   
					   <el-table-column
					     prop="status"
					     label="状态">
						 <template slot-scope="scope">
						 	 {{scope.row.status | audit}}
						 </template>
					   </el-table-column>
					   <el-table-column
					     prop="createTime"
					     label="发布时间" :formatter="getrdate">
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
	import {news, ready} from '@/utils/comm.js'
	import { Loading } from 'element-ui';
	export default{
		filters:{
			audit(e){
				if(e == "0"){
					return '未读'
				}else{
				return '已读'	
				}
			},
		},
		components:{
			Titlel,
		},
		 data() {
		      return {
				  tableData:[],
				  // 默认显示第几页
				  currentPage: 1,
				  // 总条数，根据接口获取数据长度(注意：这里不能为空)
				  totalCount: 1,
				  // 个数选择器（可修改）
				  pageSizes: [1, 2, 3, 4],
				  // 默认每页显示的条数（可修改）
				  PageSize: 10,
		      }
		    },
		mounted() {
			this.getData(1)
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
			// 行
			handleTableRow(row){
				ready(row.id).then(res=>{
					news({status:0}).then(ress=>{
						localStorage.setItem('newstotal',ress.total)
					})
				})
				this.$router.push({
					path:'/topnews/newsdetail',
					query:{"cont":JSON.stringify(row)}
				})
			},
			// 分页
			getData(num) {
				news({
					pageSize: this.PageSize,
					pageNum:num,
					orderByColumn:"id",
					isAsc:"desc"
				}).then(res=>{
					this.tableData=res.items
					this.totalCount = res.total
				})
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				news({
					pageSize: this.PageSize,
					pageNum:val,
					orderByColumn:"id",
					isAsc:"desc"
				}).then(res=>{
					this.tableData=res.items
					this.totalCount = res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
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
	/deep/.el-table__row{
		cursor: pointer;
	}
</style>