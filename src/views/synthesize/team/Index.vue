<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span  v-if="danwei">施工单位列表</span>
				<span  v-if="!danwei">工队</span>
			</template>
			<template v-slot:contont>
			   <div>
				   <div  v-if="!danwei" class="control">
						<el-button type="primary" @click="gorequest()">上一级</el-button>
				   </div>
				    <el-table
				      :data="tableData"
				       stripe
					   :header-cell-style="
					   {background:'linear-gradient(180deg,rgba(10, 74, 216, 0.70) 30%,rgba(5, 49, 146, 0.30))',
					   color:'#00CFFF !important',
					   border:'none'
					   }"
					    @row-click="openDetails"
				       >
				       <el-table-column
					     v-if="danwei"
				         prop="deptName"
				         label="施工单位名称">
				       </el-table-column>
					   <el-table-column
					     v-if="!danwei"
					     prop="deptName"
					     label="工队">
					   </el-table-column>
				     </el-table>
					 <!-- <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
					</el-pagination> -->
			   </div>
			</template>
		</Titlel>
	</div>
</template>
<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import {teams, human} from '@/utils/synthesize.js'
	export default{
		components:{
			Titlel,
		},
		 data() {
		      return {
		        tableData: [],//table
				danwei:true,
				grandeid:''
		      }
		    },
		mounted() {
			if(this.$route.query.isback){
				this.danwei=false
				human({
					id:this.$route.query.grandeid,
					data:{
						pageSize:20,
						pageNum:1
					}
				}).then(res=>{
					this.grandeid=this.$route.query.grandeid
					this.tableData=res.data.items
				})
			}else{
				this.danwei=true
				teams({
					pageSize:20,
					pageNum:1
				}).then(res=>{
					this.tableData=res.data.items
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			}
		},
		methods:{
			openDetails (row) {
				let type=this.$route.query.type
				if(this.danwei){
					human({
						id:row.deptId,
						data:{
							pageSize:20,
							pageNum:1
						}
					}).then(res=>{
						this.danwei=false
						this.grandeid=row.deptId
						this.tableData=res.data.items
					})
				}else{
					if(type == '1'){
						this.$router.push({
							path:'/synthesize/team/workers',
							query:{
								parentid:row.deptId,
								grandeid:this.grandeid
								}
						})
					}else{
						this.$router.push({
							path:'/synthesize/team/wages',
							query:{
								parentid:row.deptId,
								grandeid:this.grandeid
								}
						})
					}
					
				}
			},
			gorequest(){
				this.danwei=true
				teams({
					pageSize:20,
					pageNum:1
				}).then(res=>{
					this.tableData=res.data.items
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
		cursor: pointer;
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