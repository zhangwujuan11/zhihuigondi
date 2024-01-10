<template>
	<el-dialog title="钢筋拉伸试验" :visible.sync="$store.state.teamtable" width="90%"  @close="closed">
		<div>
			<ul class="testul">
				<li>
					<p>施工单位：{{info.construction}}</p>
					<p>使用部位：{{info.position}}</p>
				</li>
				<li>
					<p>监理单位：{{info.supervision}}</p>
					<p>生产产家：{{info.factory}}</p>
				</li>
				<li>
					<p>报告编号：{{info.sampleNo}}</p>
					<p>备 注：{{info.remark}}</p>
				</li>
			</ul>
			<table class="modal-table" cellspacing="0" cellpadding="0">
				<thead>
				<tr>
					<th>操作</th>
					<th>样品编号</th>
					<th>试件数量</th>
					<th>试件序号</th>
					<th>龄期</th>
					<th>试验状态</th>
					<th>检测参数</th>
					<th>报告编号</th>
					<th>试验开始时间</th>
					<th>试验持续时间(秒)</th>
					<th>设备量程</th>
					<th>力值单位</th>
					<th>最大力</th>
					<th>屈服强度</th>
					<th>抗拉强度</th>
					<th>Rp02 荷载</th>
					<th>曲线</th>
					<th>试验名称</th>
				</tr>
				</thead>
				<tbody v-if="tabledata">
					<tr v-for="(item,index) in tabledata" :key="index">
						<td><el-button type="warning" size="mini" @click="detai(item,index)">删除</el-button></td>
						<td><el-input v-model="item.reportId"></el-input></td>
						<td><el-input v-model="item.age" disabled></el-input></td>
						<td><el-input v-model="item.batchNo"></el-input></td>
						<td><el-input v-model="item.amount" disabled></el-input></td>
						<td><el-input v-model="item.syStatus" disabled></el-input></td>
						<td><el-input v-model="item.para" disabled></el-input></td>
						<td><el-input v-model="item.sampleNo"></el-input></td>
						<td><el-input v-model="item.beginTime" disabled></el-input></td>
						<td><el-input v-model="item.duration" disabled></el-input></td>
						<td><el-input v-model="item.equipmentRange" disabled></el-input></td>
						<td><el-input v-model="item.forceUnit" disabled></el-input></td>
						<td><el-input v-model="item.maxForce" disabled></el-input></td>
						<td><el-input v-model="item.yield" disabled></el-input></td>
						<td><el-input v-model="item.tensile" disabled></el-input></td>
						<td><el-input v-model="item.rp02" disabled></el-input></td>
						<td><el-input v-model="item.rb" disabled></el-input></td>
						<td><el-input v-model="item.name" disabled></el-input></td>
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
					<th>操作</th>
					<th>样品编号</th>
					<th>试件数量</th>
					<th>试件序号</th>
					<th>龄期</th>
					<th>试验状态</th>
					<th>检测参数</th>
					<th>报告编号</th>
					<th>试验开始时间</th>
					<th>试验持续时间(秒)</th>
					<th>设备量程</th>
					<th>力值单位</th>
					<th>最大力</th>
					<th>屈服强度</th>
					<th>抗拉强度</th>
					<th>Rp02 荷载</th>
					<th>曲线</th>
					<th>试验名称</th>
				</tr>
				</thead>
				<tbody v-if="tabledataserch">
					<tr v-for="(item,index) in tabledataserch" :key="index">
						<td><el-button type="primary" size="mini" @click="chures(item,index)">选择</el-button></td>
						<td>{{item.reportId}}</td>
						<td>{{item.age}}</td>
						<td>{{item.batchNo}}</td>
						<td>{{item.amount}}</td>
						<td>{{item.syStatus}}</td>
						<td>{{item.para}}</td>
						<td>{{item.sampleNo}}</td>
						<td>{{item.beginTime}}</td>
						<td>{{item.duration}}</td>
						<td>{{item.equipmentRange}}</td>
						<td>{{item.forceUnit}}</td>
						<td>{{item.maxForce}}</td>
						<td>{{item.yield}}</td>
						<td>{{item.tensile}}</td>
						<td>{{item.rp02}}</td>
						<td>{{item.rb}}</td>
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
	import {rebardetail,rebardetailt,rebardetailh,subrebar} from '@/utils/synthesize.js'
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
			// 搜索
			sertable(){
					rebardetailh({
						sampleNo:this.rebartable,
						depid:this.depid,
						serch:this.serdata
					}).then(res=>{
						this.tabledataserch=res.data.items
					})
			},
			// 选择
			chures(i,index){
				this.tabledata.push(i)
				this.tabledataserch.splice(index,1)
			},
			// 删除
			detai(item,index){
				this.tabledataserch.push(item)
				this.tabledata.splice(index,1)
			},
			// 提交
			sub(){
				subrebar({
					sampleNo:this.rebartable,
					array:this.tabledata
				}).then(res=>{
					if(res.code ==200){
						this.$message.success("提交成功")
						this.$store.state.teamtable = false
					}
				}).catch(()=>{
					this.$message.error("失败")
				})
			},
			closed(){
				rebardetailt({
					sampleNo:this.rebartable,
					depid:this.depid
				}).then(res=>{
					this.tabledata=res.data.items
				})
				
				rebardetailh({
					sampleNo:this.rebartable,
					depid:this.depid,
					serch:''
				}).then(res=>{
					this.tabledataserch=res.data.items
				})
				this.$store.state.teamtable = false
			}
		},
		watch:{
			rebartable(val){
				rebardetail({
					sampleNo:this.rebartable,
					depid:this.depid
				}).then(res=>{
					this.info=res.data
				})
				rebardetailt({
					sampleNo:this.rebartable,
					depid:this.depid
				}).then(res=>{
					this.tabledata=res.data.items
				})
				
				rebardetailh({
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
	/deep/td .el-input__inner{
		padding: 0 !important;
		text-align: center;
	}
</style>