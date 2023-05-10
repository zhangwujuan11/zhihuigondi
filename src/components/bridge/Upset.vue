<template>
	<div class="brigedilog">
		<el-dialog title="梁片修改" :visible.sync="$store.state.bridgeupset" width="50%">
			<ul class="top">
				<li>梁片ID：{{bridgeupset.girderId}}</li>
				<li>审批状态：{{bridgeupset.audit | audit}}</li>
				<li>审批意见：{{bridgeupset.comments}}</li>
				<li>出库状态：{{bridgeupset.outboundStatus | outboundStatus}}</li>
				<li>监理单位：{{bridgeupset.supervisorDeptName}}</li>
				<li>监理工程师：{{bridgeupset.supervisorName}}</li>
			</ul>
			<div class="bow">

				<el-container direction="vertical">
					<!--header-->
					<el-header>施工方</el-header>
					<el-container>
						<!--main-->
						<el-main>
							<el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
								<div class="froncon">
									<el-form-item label="标段名称：">
										<el-input v-model="sizeForm.sectionName"></el-input>
									</el-form-item>
									<el-form-item label="浇筑日期：">
										<el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="sizeForm.pourDate"
											style="width: 100%;"
										></el-date-picker>
									</el-form-item>
									<el-form-item label="压浆日期：">
										<el-date-picker type="date" value-format="timestamp" placeholder="选择日期" v-model="sizeForm.groutDate"
											style="width: 100%;"
										></el-date-picker>
									</el-form-item>
									<el-form-item label="出库日期：">
										<el-date-picker type="date"value-format="timestamp"  defaule-value="defaultValue" placeholder="选择日期" v-model="sizeForm.outboundDate"
											style="width: 100%;"
										></el-date-picker>
									</el-form-item>
								</div>
								<div class="froncon">
									<el-form-item label="梁片名称：">
										<el-input v-model="sizeForm.girderName"></el-input>
									</el-form-item>
									<el-form-item label="张拉日期：">
										<el-date-picker type="date"  value-format="timestamp" placeholder="选择日期" v-model="sizeForm.tensionDate"
											style="width: 100%;"
										></el-date-picker>
									</el-form-item>
									<el-form-item label="入库日期：">
										<el-date-picker type="date"  value-format="timestamp" placeholder="选择日期" v-model="sizeForm.inboundDate"
											style="width: 100%;"
										></el-date-picker>
									</el-form-item>
									<el-form-item label="出库地址：">
										<el-input v-model="sizeForm.outboundAddress"></el-input>
									</el-form-item>
								</div>
							</el-form>
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
	import {updatabridge} from "@/utils/synthesize"
	export default {
		inject:["reload"],
		props:["bridgeupset"],
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
			}
		},
		data() {
			return {
				sizeForm: {}
			};
		},
		mounted() {
			
		},
		methods: {
			subbridge() {
			updatabridge(this.sizeForm).then(res=>{
				if(res.code == 200){
					this.$message.success('修改成功')
					this.$store.state.bridgeupset=false
					this.reload()
				}else{
					this.$message.error('修改失败')
				}
			})
			},
			close(){
				this.reload()
				this.$store.state.bridgeupset=false
			}
		},
		watch:{
			bridgeupset(val){
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
</style>
