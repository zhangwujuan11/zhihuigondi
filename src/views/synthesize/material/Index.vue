<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>项目物资统计表</span>
			</template>
			<template v-slot:contont>
			   <div>
				  <!-- <div class="control">
						<div class="elserch">
						  <el-input placeholder="请输入搜索内容" v-model="serdata" class="input-with-select">
						    <el-button slot="append" @click="serchdata">搜索</el-button>
						  </el-input>
						</div>
				   </div> -->
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
						 width="50"
						  type="index"
						  label="序号">
						</el-table-column>
				       <el-table-column
					   width="180"
				         prop="type"
				         label="物资类别">
				       </el-table-column>
					   <el-table-column
					   prop="unit"
					   label="计量单位">
					   </el-table-column>
					   <el-table-column label="年初库存">
						 <el-table-column
						   prop="yearCount"
						   label="数量">
						 </el-table-column>
						 <el-table-column
						   prop="yearMoney"
						   label="金额(元)">
						 </el-table-column>
					   </el-table-column>
					   
					   <el-table-column label="收入">
					   <el-table-column label="本月收入">
							 <el-table-column
							   prop="incomeMonthCount"
							   label="数量">
							 </el-table-column>
							 <el-table-column
							   prop="incomeMonthMoney"
							   label="金额(元)">
							 </el-table-column>
					   </el-table-column>
					   <el-table-column label="本年累计">
							 <el-table-column
							   prop="incomeYearCount"
							   label="数量">
							 </el-table-column>
							 <el-table-column
							   prop="incomeYearMoney"
							   label="金额(元)">
							 </el-table-column>
					   </el-table-column>
					   <el-table-column
					     label="项目自购">
						 <el-table-column
						  prop="incomeProCount"
						   label="数量">
						 </el-table-column>
					   </el-table-column>
					   <el-table-column
					     label="公司统购">
						 <el-table-column
						  prop="incomeJiaCount"
						   label="数量">
						 </el-table-column>
					   </el-table-column>
					   <el-table-column
					     label="甲供">
						 <el-table-column
						  prop="incomeCompCount"
						   label="数量">
						 </el-table-column>
					   </el-table-column>
					   <el-table-column
					     label="预点入库">
							 <el-table-column
							  prop="incomePreCount"
							   label="数量">
							 </el-table-column>
							 <el-table-column
							  prop="incomePreMoney"
							   label="金额(元)">
							 </el-table-column>
					   </el-table-column>
					   </el-table-column> 
					    <el-table-column label="消耗">
							<el-table-column
							  label="本月出库统计">
							  <el-table-column
							   prop="costMonthCount"
							    label="数量">
							  </el-table-column>
							  <el-table-column
							   prop="costMonthMoney"
							    label="金额(元)">
							  </el-table-column>
							</el-table-column>
							<el-table-column
							  label="本年累计">
							  <el-table-column
							   prop="costYearCount"
							    label="数量">
							  </el-table-column>
							  <el-table-column
							   prop="costYearMoney"
							    label="金额(元)">
							  </el-table-column>
							</el-table-column>
						</el-table-column>
						
						<el-table-column label="拨出">
							<el-table-column
							  label="本月调拨出库	">
							  <el-table-column
							   prop="outMonthCount"
							    label="数量">
							  </el-table-column>
							  <el-table-column
							   prop="outMonthMoney"
							    label="金额(元)">
							  </el-table-column>
							</el-table-column>
							<el-table-column
							  label="本年累计">
							  <el-table-column
							   prop="outYearCount"
							    label="数量">
							  </el-table-column>
							  <el-table-column
							   prop="outYearMoney"
							    label="金额(元)">
							  </el-table-column>
							</el-table-column>
							<el-table-column
							  label="内部调拨">
							  <el-table-column
							   prop="outInsideCount"
							    label="数量">
							  </el-table-column>
							  <el-table-column
							   prop="outInsideMoney"
							    label="金额(元)">
							  </el-table-column>
							</el-table-column>
						</el-table-column>
					   
					   
					   	<el-table-column
					   	  label="期末库存">
					   	  <el-table-column
					   	   prop="endCount"
					   	    label="数量">
					   	  </el-table-column>
					   	  <el-table-column
					   	   prop="endMoney"
					   	    label="金额(元)">
					   	  </el-table-column>
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
	import {materialcount} from '@/utils/synthesize.js'
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
				loading:true
		      }
		    },
		mounted() {
			this.tableData=[]
			// 列表
			// materialcount({
			// 	limit:20,
			// 	offset:1,
			// }).then(res=>{
			// 	this.tableData=res.data.items
			// 	this.totalCount=res.data.total
			// 	this.loading=false
			// }).catch(()=>{
			// 	this.$message.error('请求错误')
			// })
		},
		methods:{
			// 显示第几页
			handleCurrentChange(val) {
				this.loading=true
				let pagge=
				materialcount({
					limit:20,
					offset:20*(val - 1),
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
					this.loading=false
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
		padding-right: 0;
		padding-left: 0;
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
	/deep/.el-table--border .el-table__cell{
		border-right: 0;
	}
	/deep/.el-table--border, .el-table--group{
		border: 0;
	}
</style>