<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>人脸考勤记录</span>
			</template>
			<template v-slot:contont>
			   <div>
				  <div class="control">
					    <el-date-picker
					         v-model="dateserch"
					         type="daterange"
							 format="yyyy 年 MM 月 dd 日"
							 value-format="yyyy-MM-dd"
					         range-separator="至"
					         start-placeholder="开始日期"
					         end-placeholder="结束日期">
					    </el-date-picker>
						<div class="elserch">
						  <el-input placeholder="请输入搜索内容" v-model="serdata" class="input-with-select">
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
						<el-table-column
						  prop="id"
						  label="序号">
						</el-table-column>
				       <el-table-column
					   width="150"
				         prop="faceNo"
				         label="设备ID">
				       </el-table-column>
					   <el-table-column
					   width="150"
					   prop="location"
					   label="位置">
					   </el-table-column>
					   <el-table-column
					     label="图片">
						<template slot-scope="scope">
							<img :src="scope.row.faceImg">
						</template>
					   </el-table-column>
					  <el-table-column
					  width="150"
					    prop="scandatetime"
					    label="检测时间">
					  </el-table-column>
					   <el-table-column
					     prop="name"
					     label="名字">
					   </el-table-column>
					   <el-table-column
					     prop="duties"
					     label="职务">
					   </el-table-column>
					   <el-table-column
					     prop="telephone"
					     label="电话">
					   </el-table-column>
					   <el-table-column
					   width="150"
					     prop="cardNo"
					     label="身份证">
					   </el-table-column>
					  <!-- <el-table-column
					     label="健康码颜色">
						 绿色
					   </el-table-column>
					   <el-table-column
					     prop="temperature"
					     label="体温">
					   </el-table-column> -->
					   <el-table-column
					   width="150"
					     prop="createTime"
					     label="上报时间">
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
	import {faceAttendance} from '@/utils/synthesize.js'
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
				dateserch:[
					
				]
		      }
		    },
		mounted() {
			
			
			this.timestampToTimeD(new Date(new Date().toLocaleDateString()).getTime() - 7 * 24 * 3600 * 1000)
			// this.timestampTD()
			this.timestampToTimeD(new Date().valueOf())
			this.$nextTick(()=>{
				// 列表
				faceAttendance({
					pageSize:20,
					pageNum:1,
					orderByColumn:'id',
					isAsc:'desc',
					keyWord:'',
					startime:this.dateserch[0] + " 00:00:00",
					endtime:this.dateserch[1]+ " 23:59:59"
				}).then(res=>{
					this.tableData=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			})
		},
		methods:{
			timestampToTimeD(timestamp) {
			var date=new Date(timestamp)
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
			var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate());
			let strDate = Y + M + D 
			this.dateserch.push(strDate)
			},
			// timestampTD() {
			// var date=new Date()
			// var Y = date.getFullYear() + '-';
			// var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
			
			// let str = Y + M + 1
			// this.dateserch.push(str)
			// },
			// 显示第几页
			handleCurrentChange(val) {
				faceAttendance({
					pageSize:20,
					pageNum:val,
					orderByColumn:'id',
					isAsc:'desc',
					keyWord:this.serdata,
					startime:this.dateserch[0] + " 00:00:00",
					endtime:this.dateserch[1]+ " 23:59:59"
				}).then(res=>{
					this.tableData=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			serchdata(){
				faceAttendance({
					pageSize:20,
					pageNum:1,
					orderByColumn:'id',
					isAsc:'desc',
					keyWord:this.serdata,
					startime:this.dateserch[0] + " 00:00:00",
					endtime:this.dateserch[1]+ " 23:59:59"
				}).then(res=>{
					this.tableData=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			}
		},
		// watch:{
		// 	dateserch(val){
		// 		faceAttendance({
		// 			pageSize:20,
		// 			pageNum:1,
		// 			orderByColumn:'id',
		// 			isAsc:'desc',
		// 			keyWord:this.serdata,
		// 			startime:val[0],
		// 			endtime:val[1]
		// 		}).then(res=>{
		// 			this.tableData=res.items
		// 			this.totalCount=res.total
		// 		}).catch(()=>{
		// 			this.$message.error('请求错误')
		// 		})
		// 	}
		// }
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
		padding-left: 3px;
		padding-right: 3px;
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
	/deep/.el-range-editor.el-input__inner{
		padding: 0px 10px;
	}
</style>