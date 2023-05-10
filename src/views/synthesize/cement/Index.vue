<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>拌合站实验数据</span>
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
					    v-loading="loading"
					   :header-cell-style="
					   {background:'linear-gradient(180deg,rgba(10, 74, 216, 0.70) 30%,rgba(5, 49, 146, 0.30))',
					   color:'#00CFFF !important',
					   border:'none'
					   }"
					   @row-click="rowclick"
				       style="width: 100%">
						<el-table-column
						  type="index"
						  label="序号">
						</el-table-column>
				       <el-table-column
				         prop="proportionCode"
				         label="配料通知单号">
				       </el-table-column>
					   <el-table-column
					   prop="recordTime"
					   label="时间">
					   </el-table-column>
					   <el-table-column
					     prop="engineeringName"
					     label="工程名称">
					   </el-table-column>
					   <el-table-column
					     prop="constructionPart"
					     label="施工地点">
					   </el-table-column>
					   <el-table-column
					     prop="propNo"
					     label="配比编号">
					   </el-table-column>
					   <el-table-column
					     prop="stirringTime"
					     label="搅拌时间">
					   </el-table-column>
					   <el-table-column
					     prop="strengthGrade"
					     label="强度">
					   </el-table-column>
					   <el-table-column
					     prop="tagWeight"
					     label="目标重量	">
					   </el-table-column>
					   <el-table-column
					     prop="actWeight"
					     label="实际重量">
					   </el-table-column>
				     </el-table>
					 <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
			   </div>
			</template>
		</Titlel>
		<!-- 详情 -->
		<el-dialog title="拌合站实验数据" :visible.sync="cementdilog" width="90%">
			<ul class="top">
				<li>
					<p>车号：{{dilogdata.carNo}}</p>
					<p>工队名称：{{dilogdata.engineeringName}}</p>
					<p>强度等级：{{dilogdata.strengthGrade}}</p>
					<p>目标重量：{{dilogdata.tagWeight}}</p>
				</li>
				<li>
					<p>司机：{{dilogdata.driver}}</p>
					<p>施工位置：{{dilogdata.constructionLoc}}</p>
					<p>配比编号：{{dilogdata.propNo}}</p>
					<p>实际重量：{{dilogdata.actWeight}}</p>
				</li>
				<li>
					<p>时间：{{dilogdata.recordTime}}</p>
					<p>施工部位：{{dilogdata.constructionPart}}</p>
					<p>搅拌时间：{{dilogdata.stirringTime}}</p>
					<p>产量 m3：{{dilogdata.vol}}</p>
				</li>
			</ul>
			<table style="width: 100%;margin-top:15px;text-align: center;">
				<tr>
					<th>物料名称</th>
					<th>ID</th>
					<th>大石子</th>
					<th>中石子</th>
					<th>小石子</th>
					<th>水泥</th>
					<th>水泥</th>
					<th>水泥</th>
					<th>水泥</th>
					<th>水泥</th>
					<th>粉灰</th>
					<th>水M1</th>
					<th>水M2</th>
					<th>外加剂1</th>
					<th>外加剂2</th>
				</tr>
				<tr>
					<td>称量值</td>
					<td>{{dilogdata.id}}</td>
					<td>{{dilogdata.sstone}}</td>
					<td>{{dilogdata.mstone}}</td>
					<td>{{dilogdata.lstone}}</td>
					<td>{{dilogdata.cement1}}</td>
					<td>{{dilogdata.cement2}}</td>
					<td>{{dilogdata.cement3}}</td>
					<td>{{dilogdata.cement4}}</td>
					<td>{{dilogdata.cement5}}</td>
					<td>{{dilogdata.m1water}}</td>
					<td>{{dilogdata.m2water}}</td>
					<td>{{dilogdata.other1}}</td>
					<td>{{dilogdata.other2}}</td>
					<td>{{dilogdata.dust}}</td>
				</tr>
					
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="cementdilog=false">关闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import {cement, cementdetail} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		inject:["reload"],
		components:{
			Titlel
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
				loading:true,
				cementdilog:false,//详情
				dilogdata:{}
		      }
		    },
		mounted() {
			// 列表
			cement({
				limit:20,
				offset:1,
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
				cement({
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
			// 点击行
			rowclick(row){
				cementdetail(row.id).then(res=>{
					this.dilogdata=res.data
					this.cementdilog=true
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
	.top{
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		line-height: 30px;
	}
	
</style>