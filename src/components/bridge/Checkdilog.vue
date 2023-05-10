<template>
	<div class="brigedilog">
		<el-dialog title="梁片审核" :visible.sync="$store.state.checkpass" width="50%">
			<ul class="top">
				<li>梁片ID：{{disablecheck.girderId}}</li>
				<li>审批状态：{{disablecheck.audit | audit}}</li>
				<!-- <li>施工单位：</li> -->
				<li>监理单位：{{disablecheck.supervisorDeptName}}</li>
				<li>监理工程师：{{disablecheck.supervisorName}}</li>
			</ul>
			<div class="bow">

				<el-container direction="vertical">
					<!--header-->
					<el-header>施工方</el-header>
					<el-container>
						<!--main-->
						<el-main>
							<ul class="top">
								<li>标段名称：{{disablecheck.sectionName}}</li>
								<li>梁片名称：{{disablecheck.girderName}}</li>
								<li>浇筑日期：{{disablecheck.pourDate | getrdate}}</li>
								<li>张拉日期：{{disablecheck.tensionDate | getrdate}}</li>
								<li>压浆日期：{{disablecheck.groutDate | getrdate}}</li>
								<li>入库日期：{{disablecheck.inboundDate | getrdate}}</li>
								<li>出库日期：{{disablecheck.outboundDate | getrdate}}</li>
								<li>出库地址：{{disablecheck.outboundAddress}}</li>
							</ul>
						</el-main>
					</el-container>
				</el-container>
				
				
				<el-container direction="vertical">
					<!--header-->
					<el-header>
						审核意见
						<el-radio-group v-model="radio" fill="#004097" size="mini">
						  <el-radio-button :label="140102">通过</el-radio-button>
						  <el-radio-button :label="140103">不通过</el-radio-button>
						</el-radio-group>
					</el-header>
					<el-container>
						<!--main-->
						<el-main>
							<el-input
							  v-if="radio == 140103"
							  type="textarea"
							  :rows="2"
							  placeholder="请输入不通过意见"
							  v-model="textarea">
							</el-input>
						</el-main>
					</el-container>
				</el-container>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="close()">取 消</el-button>
				<el-button size="small" type="primary" @click="subbridge()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {checkgridge} from "@/utils/synthesize"
	export default {
		inject:["reload"],
		props:["disablecheck"],
		filters:{
			audit(e){
				if(e == 140101){
					return '未审核'
				}else if(e == 140102){
					return '通过'
				}else if(e == 140103){
				return '不同意'	
				}
			},
			outboundStatus(e){
				if(e == 140000){
					return '未出库'
				}else if(e == 140001){
					return '已出库'
				}
			},
			getrdate(e){
				if(e == null){
					return '-'
				}else{
					var date =new Date(e) ;
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					return year + '-' + month + '-' + day
				}
				
			},
		},
		data() {
			return {
				sizeForm: {},
				radio:140102,
				textarea:''
			};
		},
		mounted() {
			
		},
		methods: {
			subbridge() {
				let tochek={
					id:this.sizeForm.girderId,
					audit:this.radio,
					comments:this.textarea
				}
				checkgridge(tochek).then(res=>{
					console.log(res)
					if(res.code == 200){
						this.$message.success('审核成功')
						this.$store.state.checkpass=false
						this.reload()
					}else{
						this.$message.error('审核失败！')
					}
				})
			},
			close(){
				this.$store.state.checkpass=false
				this.reload()
			}
		},
		watch:{
			disablecheck(val){
				this.sizeForm=val
			}
		}
	}
</script>

<style scoped>
	.top {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.top li {
		width: 48%;
		font-size: 14px;
		line-height: 20px;
		color: #333333 ;
		line-height: 36px;
		
	}

	/deep/.el-dialog__header {
		background-color: #FAFAFA;
		font-size: 18px;
		padding: 10px 20px;
		border-radius: 5px;
	}

	/deep/.el-dialog {
		border-radius: 5px;
	}

	/deep/.el-dialog__footer {
		text-align: center;
	}

	/* 容器 */
	.el-container.is-vertical {
		border-radius: 2px;
		border: 1px solid #EBEBEB;
		margin-top: 30px;
	}

	.el-header {
		background-color: #E6E6E6;
		color: #333;
		text-align: left;
		height: 44px !important;
		line-height: 44px;
		border-radius: 2px;
	}
	.el-form{
		display: flex;
	}
	.froncon{
		width: 50%;
	}
	/deep/.el-form-item__content{
		margin-left: 8vw !important;
	}
	/deep/.el-form-item__label{
		width: 8vw !important;
	}
	/deep/.el-radio-group{
		margin-left: 25px;
	}
</style>
