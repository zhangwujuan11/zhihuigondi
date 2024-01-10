<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>实时拌合站</span>
			</template>
			<template v-slot:contont>
			   <div>
				 <div class="control">
					   <!-- <el-date-picker
					         v-model="dateserch"
					         type="daterange"
							 format="yyyy 年 MM 月 dd 日"
							 value-format="yyyy-MM-dd"
					         range-separator="至"
					         start-placeholder="开始日期"
					         end-placeholder="结束日期">
					    </el-date-picker> -->
						<div class="elserch">
						  <el-input placeholder="请输入施工部位" v-model="queryParams.constructionSite" class="input-with-select">
						    <el-button slot="append" @click="getlist()">搜索</el-button>
						  </el-input>
						</div>
				   </div>
				   <table class="downbable" v-if="tableData[0]">
					   <th>工程名称</th>
					   <th>施工部位</th>
					   <th>混凝土强度等级</th>
					   <th>施工日期</th>
					   
				   	<th>盘次</th>
				   	<th>盘方量</th>
				   	<th>水泥下料</th>
				   	<th>{{ tableData[0].specificationModel.object2  || '-'}}下料</th>
				   	<th>粗集料{{ tableData[0].specificationModel.object3  || '-'}}</th>
				   	<th>粗集料{{ tableData[0].specificationModel.object4  || '-'}}</th>
				   	<th>水下料</th>
				   	<th>外加剂下料</th>
				   	<th>{{ tableData[0].manufacturer.object8  || '-'}}下料</th>
				   	<th>{{ tableData[0].manufacturer.object9  || '-'}}下料</th>
				   	<tr v-for="(item,index) in tableData">
						<td>{{item.projectName || '-'}}</td>
						<td>{{item.constructionSite || '-'}}</td>
						<td>{{item.strengthGrade || '-'}}</td>
						<td>{{item.constructionDate | testTime}}</td>
						
						
						
				   		<td>{{item.diskOrder || '-'}}</td>
				   		<td>{{item.discVolume || '-'}}</td>
				   		<td>{{item.blanking.object1 || '-'}}</td>
				   		<td>{{item.blanking.object2 || '-'}}</td>
				   		<td>{{item.blanking.object3 || '-'}}</td>
				   		<td>{{item.blanking.object4 || '-'}}</td>
				   		<td>{{item.blanking.object6 || '-'}}</td>
				   		<td>{{item.blanking.object7 || '-'}}</td>
				   		<td>{{item.blanking.object8 || '-'}}</td>
				   		<td>{{item.blanking.object9 || '-'}}</td>
				   	</tr>
				   </table>
				   
				   
				   
				   <table  class="downbable" v-if="tableData.length ==0">
				   		<th>盘次</th>
				   		<th>盘方量</th>
				   		<th>水泥下料</th>
				   		<th>-下料</th>
				   		<th>粗集料-</th>
				   		<th>粗集料-</th>
				   		<th>水下料</th>
				   		<th>外加剂下料</th>
				   		<th>-下料</th>
				   		<th>-下料</th>
				   		<tr >
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   			<td>-</td>
				   		</tr>
				   	</table>
				<pagination
				  v-show="total>0"
				  :total="total"
				  :page.sync="queryParams.pageNum"
				  :limit.sync="queryParams.pageSize"
				  @pagination="getlist"
				/>
			   </div>
			</template>
		</Titlel>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import {  ultrasonic, jiaolist } from '@/utils/synthesize.js'
	import { Loading } from 'element-ui';
	export default{
		inject:["reload"],
		components:{
			Titlel
		},
		filters:{
			pay(e){
				return e/100
			},
			testTime(e){
				return e.substring(0, e.length - 8);
			}
		},
		 data() {
		      return {
				queryParams: {
					pageNum:1,
					pageSize:20,
					constructionSite:''
				},
				value: '',
				parentid: '',
				serdata: '', //搜索框
				tableData: [], //table
				loading: true,
				total:0
		      }
		    },
		mounted() {
			this.getlist()
		},
		methods:{
			getlist() {
				jiaolist(this.queryParams).then(res => {
					let array = res.data.data.items
					if (res.data.data.items) {
						for (var i = 0; i < array.length; i++) {
							array[i].constructionMixRatio = JSON.parse(array[i].constructionMixRatio)
							array[i].inspectionStatus = JSON.parse(array[i].inspectionStatus)
							array[i].manufacturer = JSON.parse(array[i].manufacturer)
							array[i].materialName = JSON.parse(array[i].materialName)
							array[i].moistureContent = JSON.parse(array[i].moistureContent)
							array[i].specificationModel = JSON.parse(array[i].specificationModel)
							array[i].theoreticalMixRatio = JSON.parse(array[i].theoreticalMixRatio)
							array[i].blanking = JSON.parse(array[i].blanking)
							array[i].error= JSON.parse(array[i].error)
						}
						this.total=res.data.data.total
						this.tableData = array
					}else{
						this.tableData=[]
						
					} 
				})
			},
		},
	}
</script>

<style scoped>
	/*  */
	.control {
		display: flex;
		justify-content: end;
		/* height: 34px; */
		margin: 20px 0;
		background-color: transparent;
	}

	.elserch {
		margin-left: 20px;
		height: 34px;
	}

	/deep/.el-input-group__prepend {
		width: 100px !important;
		padding: 0 !important;
		box-sizing: border-box;
	}

	/deep/.el-select {
		width: 100%;
		left: 20px;
	}

	/deep/.el-input-group__append {
		background-color: #5FB760;
		color: white;
		border-color: #5FB760;
	}

	/deep/.el-input__inner {
		line-height: 34px;
		height: 34px;
	}

	/deep/.el-input__icon {
		line-height: 34px;
	}

	.qcordzip {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		line-height: 34px;
	}

	.qcordzip img {
		width: 53px;
	}

	/deep/.cell {
		text-align: center;
	}

	/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
		background: linear-gradient(180deg, rgba(3, 87, 176, 0) 0%, rgba(61, 159, 207, 0.7) 100%);
		color: #00C5F2;
		border: 1px solid #52CCFF;
	}

	i {
		font-size: 20px;
	}

	/deep/.el-dialog__footer {
		text-align: center;
	}

	img {
		width: 40px;
		height: 40px;
	}

	.el-icon-edit {
		color: #cca300;
		margin-right: 5px;
	}

	.el-icon-edit:hover {
		color: white;
	}

	.el-icon-circle-close {
		color: darkred;
	}

	.el-icon-circle-close:hover {
		color: white;
	}

	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		line-height: 30px;
	}

	.page-main {
		display: flex;

	}

	.page-main .meun {
		width: 300px;
		background: rgba(2, 82, 173, 0.10);
		padding: 10px;
	}

	.page-main .table {
		margin-left: 25px;
		flex: 1;
		padding: 25px;
		border-radius: 16px;
		background: rgba(2, 82, 173, 0.10)
	}

	.page-main .table .tit {
		height: 28px;
		font-size: 20px;
		font-family: AppleSystemUIFont;
		color: #00FFFF;
		line-height: 27px;
		margin-bottom: 10px;
	}

	.menu-tit {
		display: flex;
	}

	.menu-tit .text {
		width: 100px;
		line-height: 40px;
		font-size: 20px;
		font-family: AppleSystemUIFont;
		color: #00FFFF;
	}

	.menu-tit .select {
		flex: 0.8;
	}

	/deep/.el-input__inner {
		background: rgba(0, 0, 0, 0.30) !important;
		border: none !important;
		color: rgba(0, 207, 255, 1);
		height: 40px;
		line-height: 40px;
	}

	/deep/.el-input__inner::placeholder {
		color: rgba(0, 207, 255, 1)
	}

	.beam-list {
		margin-top: 10px;
		height: 450px;
		overflow-y: scroll;
	}

	.beam-list::-webkit-scrollbar {
		display: none;
	}

	.beam-list .item {
		position: relative;
		font-size: 18px;
		font-family: AppleSystemUIFont;
		color: #FFFFFF;
		height: 45px;
		line-height: 45px;
		border-radius: 8px;
		padding-left: 28px;
		cursor: pointer;
	}

	.beam-list .item::before {
		content: "";
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: rgba(0, 207, 255, 1);
		position: absolute;
		left: 8px;
		top: 18px;
	}

	.beam-list .active {
		background: linear-gradient(90deg, rgba(0, 156, 252, 0.73) 0%, rgba(0, 156, 252, 0.21) 100%);
	}

	.beam-list .active::before {
		content: "";
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: #fff;
		position: absolute;
		left: 8px;
		top: 18px;
	}

	/* table{
		border: none;
	}
	table th{
		border-left: 1px solid rgba(0, 0, 0, 0.30);
		height: 40px;
		line-height: 40px;
		background:linear-gradient(180deg,rgba(10, 74, 216, 0.70) 30%,rgba(5, 49, 146, 0.30));
	}
	table td{
		border-bottom: 1px dashed rgba(53, 99, 161, 1);
		height: 40px;
		line-height: 40px;
	} */
	.btabletitle {
		height: 40px;
		line-height: 40px;
		background: linear-gradient(180deg, rgba(10, 74, 216, 0.70) 30%, rgba(5, 49, 146, 0.30));
		text-align: center;
		border-left: 1px solid rgba(0, 0, 0, 0.30);
	}

	.el-row {
		&:last-child {
			margin-bottom: 0;
		}
	}

	/* .bg-purple-dark {
	    background: transparent;
	  } */
	.bg-purple {
		background: transparent;
		border-bottom: 1px dashed rgba(53, 99, 161, 1);
		text-align: center;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		height: 40px;
		margin-left: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 14px;
	}

	.row-bg {
		padding: 2px 0;
		background-color: #f9fafc;
	}

	.tablebox {
		margin-bottom: 35px;
	}

	.ycl {
		height: 162px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/deep/.el-col {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0 !important;
	}

	/*/deep/.el-col-4 {
		width: 16% !important;
	} */
	.downbable {
		width: 100%;
	}

	.downbable th {
		height: 40px;
		background: linear-gradient(180deg, rgba(10, 74, 216, 0.70) 30%, rgba(5, 49, 146, 0.30));
		font-weight: normal;
		font-size:14px;
	}

	.downbable tr {
		height: 35px;
		line-height: 35px;
	}

	.downbable td {
		text-align: center;
		border-bottom: 1px dashed rgba(53, 99, 161, 1);
	}
	.nodata{
		width:100%;
		padding-left: 100px;
		line-height: 80px;
		margin-bottom: 150px;
	}
	/deep/.el-pagination__total{
		color: rgba(0, 207, 255, 1);
	}
	/deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
		background:linear-gradient(180deg, rgba(3,87,176,0) 0%, rgba(61,159,207,0.7) 100%);
		color:  #00C5F2;
		border: 1px solid #52CCFF;
	}
	/deep/.el-input__inner{
		height:30px !important;
		line-height: 30px;
	}
</style>