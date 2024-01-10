<template>
	<el-dialog title="混凝土抗压试验" :visible.sync="$store.state.teamtablecon" width="90%" @close="closed">
		<div>
			<ul class="testul">
				<li>
					<p>施工单位：{{info.construction}}</p>
					<p>使用部位：{{info.position}}</p>
				</li>
				<li>
					<p>监理单位：{{info.supervision}}</p>
					<p>配合比编号：{{info.batchNo}}</p>
				</li>
				<li>
					<p>报告编号：{{info.sampleNo}}</p>
					<p>备 注：{{info.remark}}</p>
				</li>
			</ul>
			<table class="modal-table" cellspacing="0" cellpadding="0">
				<thead>
				  <tr>
				    <th rowspan="2">操作</th>
				    <th rowspan="2">报告编号</th>
				    <th rowspan="2">设计强度等级</th>
				    <th rowspan="2">成型日期</th>
				    <th rowspan="2">抗压日期</th>
				    <th rowspan="2">配合比报告编号</th>
				    <th rowspan="2">塌落度(mm)</th>
				    <th colspan="3">抗压强度（MPa）</th>
				    <th rowspan="2">平均值</th>
				    <th rowspan="2">备注</th>
				  </tr>
				  <tr>
				    <th rowspan="2">第1组</th>
				    <th rowspan="2">第2组</th>
				    <th rowspan="2">第3组</th>
				  </tr>
				</thead>
				<tbody v-if="tabledata">
					<tr v-for="(item,index) in tabledata" :key="index">
						<td><el-button type="warning" size="mini" @click="detel(item,index)">删除</el-button></td>
						<td>{{item.sampleNo}}</td>
						<td>{{item.variety}}</td>
						<td>{{item.approachDate}}</td>
						<td>{{item.samplingDate}}</td>
						<td>{{item.batchNo}}</td>
						<td>{{item.amount}}</td>
						<td><span v-if="JSON.parse(item.labDetails)[0]">{{JSON.parse(item.labDetails)[0].Stress}}</span></td>
						<td><span v-if="JSON.parse(item.labDetails)[1]">{{JSON.parse(item.labDetails)[1].Stress}}</span></td>
						<td><span v-if="JSON.parse(item.labDetails)[2]">{{JSON.parse(item.labDetails)[2].Stress}}</span></td>
						<td v-if="JSON.parse(item.labDetails)[0] && JSON.parse(item.labDetails)[1] && JSON.parse(item.labDetails)[2]">{{((JSON.parse(item.labDetails)[0].Stress+JSON.parse(item.labDetails)[1].Stress+JSON.parse(item.labDetails)[2].Stress)/3).toFixed(2)}}</td>
						<td v-if="JSON.parse(item.labDetails)[0] && JSON.parse(item.labDetails)[1] && !JSON.parse(item.labDetails)[2]">{{((JSON.parse(item.labDetails)[0].Stress+JSON.parse(item.labDetails)[1].Stress)/2).toFixed(2)}}</td>
						<td v-if="JSON.parse(item.labDetails)[0] && !JSON.parse(item.labDetails)[1] && !JSON.parse(item.labDetails)[2]">{{(JSON.parse(item.labDetails)[0].Stress).toFixed(2)}}</td>
						<td v-if="!JSON.parse(item.labDetails)[0] && !JSON.parse(item.labDetails)[1] && !JSON.parse(item.labDetails)[2]"></td>
						<td>{{item.remark}}</td>
					</tr>
				</tbody>
				
				<tr v-else>
					<td colspan="18" style="text-align: center;">
						暂无数据
					</td>
				</tr>
			</table>
			<p style="margin: 10px 0;display: flex;align-items: center;">
				未分配实验：
			   <el-input placeholder="请输入内容" v-model="serdata" class="input-with-select" style="width: 300px;">
			   	<el-button slot="append" @click="sertable()">搜索</el-button>
				</el-input>
		    </p>
			<table class="modal-table" cellspacing="0" cellpadding="0">
				<thead>
				  <tr>
				    <th rowspan="2">操作</th>
				    <th rowspan="2">样品编号</th>
				    <th rowspan="2">设计强度等级</th>
				    <th rowspan="2">成型日期</th>
				    <th rowspan="2">抗压日期</th>
				    <th rowspan="2">配合比报告编号</th>
				    <th rowspan="2">塌落度(mm)</th>
				    <th colspan="3">抗压强度（MPa）</th>
				    <th rowspan="2">备注</th>
				  </tr>
				  <tr>
				    <th rowspan="2">第1组</th>
				    <th rowspan="2">第2组</th>
				    <th rowspan="2">第3组</th>
				  </tr>
				</thead>
				<tbody v-if="tabledataserch">
					<tr v-for="(item,index) in tabledataserch" :key="index">
						<td><el-button type="primary" size="mini" @click="churs(item,index)">选择</el-button></td>
						<td>{{item.reportId}}</td>
						<td>{{item.variety}}</td>
						<td>{{item.approachDate}}</td>
						<td>{{item.samplingDate}}</td>
						<td>{{item.batchNo}}</td>
						<td>{{item.amount}}</td>
						<td><span v-if="JSON.parse(item.labDetails)[0]">{{JSON.parse(item.labDetails)[0].Stress}}</span></td>
						<td><span v-if="JSON.parse(item.labDetails)[1]">{{JSON.parse(item.labDetails)[1].Stress}}</span></td>
						<td><span v-if="JSON.parse(item.labDetails)[2]">{{JSON.parse(item.labDetails)[2].Stress}}</span></td>
						<td>{{item.name}}</td>
					</tr>
				</tbody>
				<tr v-else>
					<td colspan="18" style="text-align: center;">
						暂无数据
					</td>
				</tr>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closed">关 闭</el-button>
				<el-button type="primary"  @click="sub">提 交</el-button>
			</span>
		</div>
		
	</el-dialog>
</template>

<script>
	import { concredetail,concredetait,concredetaith,subconcretet} from '@/utils/synthesize.js'
	export default{
		props:["rebartable"],
		data(){
			return{
				depid:'',
				info:{},
				serdata:'',
				tabledata:[],
				tabledataserch:[]
			}
		},
		mounted() {
			this.depid=this.$route.query.companyNo
		},
		methods:{
			sertable(){
					concredetaith({
						sampleNo:this.rebartable,
						depid:this.depid,
						serch:this.serdata
					}).then(res=>{
						this.tabledataserch=res.data.items
					})
			},
			// 删除
			detel(item,index){
				this.tabledataserch.push(item)
				this.tabledata.splice(index,1)
			},
			// 选择
			churs(item,index){
				item.sampleNo=this.info.sampleNo
				this.tabledata.push(item)
				this.tabledataserch.splice(index,1)
			},
			// 提交
			sub(){
				subconcretet({
					sampleNo:this.rebartable,
					array:this.tabledata
				}).then(res=>{
					if(res.code ==200){
						this.$message.success("提交成功")
						this.$store.state.teamtablecon = false
					}
				}).catch(()=>{
					this.$message.error("失败")
				})
			},
			closed(){
				concredetait({
					sampleNo:this.rebartable,
					depid:this.depid
				}).then(res=>{
					this.tabledata=res.data.items
				})
				concredetaith({
					sampleNo:this.rebartable,
					depid:this.depid,
					serch:''
				}).then(res=>{
					this.tabledataserch=res.data.items
				})
				this.$store.state.teamtablecon = false
			}
		},
		watch:{
			rebartable(val){
				concredetail({
					sampleNo:this.rebartable,
					depid:this.depid
				}).then(res=>{
					this.info=res.data
				})
				
				concredetait({
					sampleNo:this.rebartable,
					depid:this.depid
				}).then(res=>{
					this.tabledata=res.data.items
				})
				concredetaith({
					sampleNo:this.rebartable,
					depid:this.depid,
					serch:''
				}).then(res=>{
					this.tabledataserch=res.data.items
				})
			}
		}
	}
</script>

<style scoped>
	.testul{
		width:100%;
		display: flex;
		justify-content: space-between;
	}
	.testul p{
		line-height: 30px;
	}
	.dialog-footer{
		margin-top: 20px;
		display: block;
		text-align: center;
	}
	/deep/.el-dialog__body{
		padding-top: 0;
	}
	table{
		width: 100%;
	}
	.modal-table td,.modal-table th{
	    border: 1px solid #ddd;
	    text-align: center;
	    font-size: 12px;
	    font-weight: 300;
	    padding: 5px 0;
	}
</style>