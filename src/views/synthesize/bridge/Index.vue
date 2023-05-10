<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:contont>
			   <div>
				   <div class="control">
					    <el-button type="primary" @click="dialogVisible=true">生成二维码</el-button>
						<div class="elserch">
						  <el-input placeholder="请输入内容" v-model="serdata" class="input-with-select">
						   <el-select v-model="select" slot="prepend" placeholder="全部">
						      <el-option label="未审核" :value="140101"></el-option>
						      <el-option label="通过" :value="140102"></el-option>
						      <el-option label="不同意" :value="140103"></el-option>
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
						<el-table-column label="操作" v-if="identityCode == 21002 || identityCode == 21003">
						 <template slot-scope="scope">
							 <!-- 施工 -->
						  <div v-if="identityCode == 21002">
							  <i v-if="scope.row.outboundStatus == 140001 || scope.row.audit==140103"  class="el-icon-edit"></i>
							  <!-- 修改 -->
							  <i @click="showupsete(scope.row)"  style="color: #5DB860;" v-if="scope.row.outboundStatus == 140000 && scope.row.audit==140101" class="el-icon-edit"></i>
							   <!-- 出库 -->
							  <i  @click="showchange(scope.row)" v-if="scope.row.outboundStatus == 140000 && scope.row.audit==140102" style="color: #5DB860;" class="el-icon-sold-out"></i>
						  </div>
						  <!-- 监理 -->
						  <div v-if="identityCode == 21003">
							  <i v-if="scope.row.outboundStatus == 140001 || scope.row.audit==140102 || scope.row.audit==140103"  style="color: #1D4D82;"  class="el-icon-s-check"></i>
							   <i  @click="passcheck(scope.row)" style="color: #5DB860;" v-if="scope.row.outboundStatus == 140000 && scope.row.audit==140101" class="el-icon-s-check"></i>
						  </div>
						</template>
						</el-table-column>
						<el-table-column
						type="index"
						label="序号" 
						>
				        </el-table-column>
				       <el-table-column
				         prop="girderId"
				         label="梁片ID" >
				       </el-table-column>
				       <el-table-column
				         prop="girderName"
				         label="梁片名称">
				       </el-table-column>
					   
					   <el-table-column
					     prop="supervisorDeptName"
					     label="监理单位">
					   </el-table-column>
					   <el-table-column
					     prop="pourDate"
					     label="浇筑日期" :formatter="getrdate">
					   </el-table-column>
					   <el-table-column
					     prop="tensionDate"
					     label="张拉日期" :formatter="getrdate">
					   </el-table-column>
					   <el-table-column
					     prop="groutDate"
					     label="压浆日期" :formatter="getrdate">
					   </el-table-column>
					   <el-table-column
					     label="审批状态">
						  <template slot-scope="scope">
							  {{scope.row.audit | audit}}
						  </template>
					   </el-table-column>
					   <el-table-column
					     label="出库状态">
						 <template slot-scope="scope">
						 	{{scope.row.outboundStatus | outboundStatus}}
						 </template>
					   </el-table-column>
					   <el-table-column
					     prop="supervisorName"
					     label="监理工程师">
					   </el-table-column>
					   <el-table-column
					     prop="comments"
					     label="审批意见">
					   </el-table-column>
					   <el-table-column
					     prop="inboundDate"
					     label="入库日期" :formatter="getrdate">
					   </el-table-column>
					   <el-table-column
					     prop="outboundDate"
					     label="出库日期" :formatter="getrdate">
					   </el-table-column>
					   <el-table-column
					     prop="outboundAddress"
					     label="出库地址">
					   </el-table-column>
				     </el-table>
					 <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
			   </div>
			</template>
		</Titlel>
		<el-dialog
		  title="生成二维码"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <div class="qcordzip">
			  <span style="font-weight: bold;">梁片二维码文件已生成，请立即下载！</span>
			  <img src="@/assets/image/synthesize/qcordzip.png" alt="">
			  <span>梁片二维码.ZIP</span>
		  </div>
		  
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="qrcodezip">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 修改表单 -->
		<Dilog :bridgeinfo="bridgeinfo"></Dilog>
		<!-- 审核表单 -->
		<Checkdilog :disablecheck="disablecheck"></Checkdilog>
		<Upset :bridgeupset="bridgeupset"></Upset>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import Dilog from '@/components/bridge/Dilog.vue'
	import Checkdilog from '@/components/bridge/Checkdilog.vue'
	import Upset from '@/components/bridge/Upset.vue'
	import {bridgelist,girderserch,qrcode} from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		filters:{
			audit(e){
				if(e == 140101){
					return '未审核'
				}else if(e == 140102){
					return '通过'
				}else{
				return '不同意'	
				}
			},
			outboundStatus(e){
				if(e == 140000){
					return '未出库'
				}else if(e == 140001){
					return '已出库'
				}
			}
		},
		components:{
			Titlel,
			Dilog,
			Checkdilog,
			Upset
		},
		 data() {
		      return {
				dialogVisible:false,//二维码
				serdata:'',//搜索框
				select:'',//下拉款
		        tableData: [],//table
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 10,
				bridgeinfo:{},
				identityCode:21001,//身份信息
				disablecheck:{},
				bridgeupset:{}
		      }
		    },
		mounted() {
			
			this.identityCode=JSON.parse(localStorage.getItem('identityCode')) 
			
			// 列表
			bridgelist({
				audit:'',
				outboundStatus:'',
				pageNum:1,
				pageSize:10
			}).then(res=>{
				this.tableData=res.data.items
				this.totalCount=res.data.total
			}).catch(()=>{
				this.$message.error('请求错误')
			})
		},
		methods:{
			// 修改梁片信息表单
			showchange(e){
				this.bridgeinfo=e
				this.$store.state.bridgechange=true
			},
			showupsete(e){
				this.bridgeupset=e
				this.$store.state.bridgeupset=true
			},
			tableHeaderColor () {
				return { background: 'transparent' }
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
			// 搜索指定信息
			serchdata(){
				bridgelist({
					audit:this.select,
					outboundStatus:'',
					keyWord:this.serdata,
					pageNum:1,
					pageSize:10
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
			},
			// 分页
			// getData() {
			// 	this.totalCount = this.tableData.length
			// },
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				bridgelist({
					audit:this.select,
					outboundStatus:'',
					keyWord:this.serdata,
					pageNum:val,
					pageSize:10
				}).then(res=>{
					this.tableData=res.data.items
					this.totalCount=res.data.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			
			// 二维码
			qrcodezip(){
				let loadingInstance = Loading.service({ fullscreen: true });
				qrcode().then(res=>{
					this.downloadFiles(res);
					loadingInstance.close();
				})
			},
			
			// 解码下载方法
		 downloadFiles(data) {
			//接收的是blob，若接收的是文件流，需要转化一下
		    //var blob = new Blob([data])
		    if (typeof window.chrome !== 'undefined') {
		        // Chrome version
		        var link = document.createElement('a');
		        link.href = window.URL.createObjectURL(data);
		        link.download = "桥梁二维码.zip";
		        link.click();
		    } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
		        // IE version
		        var blob = new Blob([data], { type: 'application/force-download' });
		        window.navigator.msSaveBlob(blob, "桥梁二维码.zip");
		    } else {
		        // Firefox version
		        var file = new File([data], "桥梁二维码.zip", { type: 'application/force-download' });
		        window.open(URL.createObjectURL(file));
		    }
		},
		// 监理方审核
		passcheck(e){
			this.$store.state.checkpass=true
			this.disablecheck=e
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
</style>