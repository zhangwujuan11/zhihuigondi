<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>超声基桩桥梁检测</span>
			</template>
			<template v-slot:contont>
			   <div>
				  <div class="control">
						<div class="elserch">
						  <el-input placeholder="请输入桩号" v-model="serdata" class="input-with-select">
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
						<el-table-column
						  type="index"
						  label="序号">
						</el-table-column>
				      <!-- <el-table-column
				         prop="machineId"
				         label="设备编号">
				       </el-table-column> -->
					   <el-table-column
					   prop="pileNo"
					   label="桩号">
					   </el-table-column>
					   <el-table-column
					     prop="pileDiameter"
					     label="桩径">
					   </el-table-column>
					   <el-table-column
					     prop="pileLength"
					     label="桩长">
					   </el-table-column>
					   <el-table-column
					     prop="concreteStrength"
						 width="180"
					     label="桩顶初测点标高(m)">
					   </el-table-column>
					   <!-- <el-table-column
					     prop="sectionCount"
					     label="类型">
					   </el-table-column> -->
					 <!--  <el-table-column
					     prop="step"
					     label="测点间距">
					   </el-table-column>
					   <el-table-column
					     prop="tubeCount"
					     label="声测管数量">
					   </el-table-column>
					   <el-table-column
					     label="GPS状态">
						  <template slot-scope="scope">
							 {{scope.row.gpsIsValid | gpsIsValid}}
						 </template>
					   </el-table-column>
					   <el-table-column
					     prop="gpsLatitude"
					     label="GPS维度">
					   </el-table-column>
					   <el-table-column
					     prop="gpsLongitude"
					     label="GPS经度">
					   </el-table-column> -->
					   <el-table-column
					    width="200"
					     prop="serialNo"
					     label="检测结果（类型/判定）">
						 <template slot-scope="scope">
						 	{{scope.row.machineId}}/{{scope.row.serialNo}}
						 </template>
					   </el-table-column>
					   <el-table-column
					     width="200"
					     prop="testTime"
					     label="检测时间">
						 <template slot-scope="scope">
						 	{{scope.row.testTime | testTime}}
						 </template>
					   </el-table-column>
					   <el-table-column
					     width="200"
					     prop="dataFile"
					     label="报告">
						 <template slot-scope="scope"> 
							<sapn @click="godownlid(scope.row.dataFile)" style="color: skyblue;">查看</sapn>
						 </template>
					   </el-table-column>
					   <!-- <el-table-column
					    width="200"
					     prop="createDate"
					     label="创建时间">
					   </el-table-column> -->
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
	import {ultrasonic} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		filters:{
			gpsIsValid(e){
				if(e=="1"){
					return '有GPS'
				}else{
					return "无GPS"
			}},
			testTime(e){
				return e.substring(0,e.length-8);
			}
		},
		inject:["reload"],
		components:{
			Titlel
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
				loading:true,
		      }
		    },
		mounted() {
			// 列表
			ultrasonic({
				pageSize:20,
				pageNum:1,
				pileNo:''
			}).then(res=>{
				this.tableData=res.data.items
				this.totalCount=res.data.total
				this.loading=false
			}).catch(()=>{
				this.$message.error('请求错误')
			})
		},
		methods:{
			// 显示第几页
			handleCurrentChange(val) {
				this.loading=true
				ultrasonic({
					pageSize:20,
					pageNum:val,
					pileNo:this.serdata
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
					this.loading=false
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			
			serchdata(){
				this.loading=true
				ultrasonic({
					pageSize:20,
					pageNum:1,
					pileNo:this.serdata
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
					this.loading=false
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			},
			godownlid(i){
				window.open(i)
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
	.top{
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		line-height: 30px;
	}
	
</style>