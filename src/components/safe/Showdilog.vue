<template>
	<el-dialog :visible.sync="$store.state.safedilog" width="80%">
		<p style="margin-bottom: 30px;">【{{ruleForm.status | status}}】{{ruleForm.title}}</p>
		<div class="frommaincom">
			<p>处理角色：{{ruleForm.processorDeptName}}</p>
			<p>负责人：{{ruleForm.processorNick}}</p>
			<p>手机号：{{ruleForm.processorPhone}}</p>
			<p>抄送：
				<span v-for="(i,box) in ruleForm.copies" :key="box">
					{{i | copies}}
				</span>
			</p>
		</div>
		<div class="notStartedcon">
			<div class="addbox" v-for="(item,index) in ruleForm.problems" :key="item.problemId">
				<p class="addboxtitle">{{item.title}}</p>
				<p>
					【{{item.dataType | dataType}}】隐患点：{{item.hidDangerName}}
				</p>
				<p>
					内容：{{item.context}}
				</p>
				<img class="itemimage" v-for="(i,index) in item.images" :key="index" :src="i" fit="fill">
				<table class="table">
					<thead style="background-color: #F5F5F5;">
						<tr>
							<th>附件</th>
							<th>上传人</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody class="modalTableBody">
						<tr v-for="(pdf,index) in item.attachments" :key="index">
							<td>附件{{index+1}}.pdf</td>
							<td>暂无</td>
							<td><span class="vwBtn" @click="openUrl(pdf)">查看</span></td>
						</tr>
					</tbody>
					<p v-if="item.attachments == null" style="text-align: center;width: 100%;color: #ccc;">无附件</p>
				</table>
				
				<div class="constructionbox" v-for="(workflow,key) in item.workflows" :key="workflow.workflowId">
					<div v-if="workflow.processorType=='21002' && workflow.actionCode!='12001'" class="addbox"
						style="width: calc(100% - 40px);margin-bottom: 10px;">
						<p class="addboxtitle">施工方处理意见</p>
						<p style="height: 40px">
							【{{item.dataType==1?"质量":"安全"}}】隐患点:{{item.hidDangerName}}
							{{workflow.actionDesc}}
						</p>
						<p>{{item.workflows[key].advice}}</p>
						<div>
							<p class="block" v-for="(item,index) in item.workflows[key].images" :key="index"
								style="display: inline-block;">
								<el-image style="width: 100px; height: 100px" :src="item" fit="fill">
								</el-image>
							</p>
						</div>
						<table class="table">
							<thead style="background-color: #F5F5F5;">
								<tr>
									<th>附件</th>
									<th>上传人</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody class="modalTableBody">
								<tr v-for="(item,index) in item.workflows[key].attachments" :key="index">
									<td>附件{{index+1}}.pdf</td>
									<td>暂无</td>
									<td><span>查看</span>
									</td>
								</tr>
							</tbody>
							<p v-if="item.workflows[key].attachments == null" style="text-align: center;width: 100%;color: #ccc;">无附件</p>
						</table>
					</div>
					<div class="addbox" style="width: calc(100% - 40px);margin-bottom: 10px;"
						v-if="workflow.processorType=='21003'&&workflow.actionCode!='12001'">
						<p class="addboxtitle">监理方意见</p>
						<div class="main">
							<p v-html="workflow.advice"></p>
						</div>
					</div>

					<div class="addbox" style="width: calc(100% - 40px);margin-bottom: 10px;"
						v-if="workflow.processorType=='21001'&&workflow.actionCode!='12001'">
						<p class="addboxtitle">业主方意见</p>
						<div class="main">
							<p v-html="workflow.advice"></p>
						</div>
					</div>
					
					
					
					
					
					
					<!-- <div class="constructionbox"
						v-if="identycode==workflow.processorType && (ruleForm.status == 10000 || ruleForm.status == 10001) && workflow.actionCode=='12001' && fromuserid == currentUserId">
						<div class="addbox" style="width: calc(100% - 40px);margin-bottom: 10px;">
							<p v-if="identycode == 21002" class="addboxtitle">施工方处理意见</p>
							<p v-if="identycode == 21003" class="addboxtitle">监理方处理意见</p>
							<div>
								<el-form label-width="100px" class="demo-ruleForm">
									<el-form-item label="内容" prop="advice">
										<el-input v-model="handleForm[index].advice" placeholder="请输入整改原因"
											style="width: 70%;" @input="change"></el-input>
									</el-form-item>
									<el-form-item label="图片">
										<el-upload
											:action="baseurl+'v1/communal/files/scopes/rectify/attachment/actions/upload'"
											list-type="picture-card" :on-success="handleImageAdd.bind(this,index)"
											accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG"
											:on-preview="handlePictureCardPreview" :before-upload="beforeImageUpload"
											:on-remove="handleRemove.bind(this,index)" :file-list="item.fileListImg">
											<i slot="default" class="el-icon-upload"></i>
											<el-dialog append-to-body :visible.sync="dialogVisible">
												<img width="100%" :src="dialogImageUrl" alt="">
											</el-dialog>
										</el-upload>
									</el-form-item>
									<el-form-item label="附件">
										<el-upload
											:action="baseurl+'v1/communal/files/scopes/rectify/attachment/actions/upload'"
											:on-success="handlePdfAdd.bind(this,index)" :on-preview="previewPdf"
											:file-list="item.fileListPdf" :before-upload="beforePdfUpload"
											:on-remove="handlePdfRemove.bind(this,index)" accept=".pdf">
											<el-button size="small">
												<i class="el-icon-upload2 el-icon--right"></i>上传PDF文件 (小于50M)
											</el-button>
										</el-upload>
									</el-form-item>
								</el-form>
							</div>
							<div style="width: 100%;text-align: center;">
								<el-button 
								@click="handelup(item.problemId,index)" 
								class="constructionsub"
								type="primary">
								确认提交
								</el-button>
							</div>
						</div>
					</div> -->
					<!-- <div style="height: 80px;text-align: center; padding: 0;"
					v-if="(workflow.processorType=='21001'||workflow.processorType=='21003')&&(workflow.actionCode=='12001'&& workflow.processorId==currentUserId) && fromuserid != currentUserId">
						<el-button type="success" @click="clcikAgree(item)">同意</el-button>
						<el-button type="primary" @click="clcikReject(item) ">驳回</el-button>
					</div> -->
					
					
				</div>
				
				<!-- 驳回弹窗 -->
				<!-- <el-dialog :visible.sync="rejectVisible" width="70%" append-to-body title="驳回意见">
					<div style="border: 1px solid #ccc;width:100%;height: 500px;">
						<div style="border: 1px solid #ccc;" v-if="!agreeVisible">
							<div id="editor-toolbar" style="border-bottom: 1px solid #ccc;"></div>
							<div id="editor-text-area" style="height: 300px"></div>
						</div>
					</div>
					<div slot="footer" class="dialog-footer" style="text-align: center;">
						<el-button type="success" @click="rejectVisible=false">取消</el-button>
						<el-button type="primary" @click="reject()">确认驳回</el-button>
					</div>
				</el-dialog> -->
				<!-- 同意弹窗 -->
			<!-- 	<el-dialog :visible.sync="agreeVisible" width="70%" append-to-body title="同意意见">
					<div style="border: 1px solid #ccc;" v-if="!rejectVisible">
						<div id="editor-toolbar" style="border-bottom: 1px solid #ccc;"></div>
						<div id="editor-text-area" style="height: 300px"></div>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button type="success" @click="agreeVisible=false">取消</el-button>
						<el-button type="primary" @click="agree()">确认同意</el-button>
					</div>
				</el-dialog> -->
				










				
			</div>
		</div>
		<span slot="footer" class="dialog-footer" style="text-align: center;display: block;">
			<el-button @click="expo">导出</el-button>
			<!-- <el-button type="warning" v-if="(ruleForm.status == 10000 || ruleForm.status == 10001) && initiatorId==currentUserId"
				@click="changedilog">继续编辑</el-button>
			<el-button type="danger" v-if="(ruleForm.status == 10000 || ruleForm.status == 10001) && initiatorId==currentUserId"
				@click="deldata">删除整改</el-button>
			<el-button type="info" v-if="(ruleForm.status == 10000 || ruleForm.status == 10001) &&  initiatorId==currentUserId"
				@click="reback">撤回整改</el-button> -->
			<el-button @click="$store.state.safedilog = false">关闭</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		reformeid,
		delform,
		exportform,
		revoke,
		activehandle,
		cheked
	} from "@/utils/rectify"
	import {
		Loading
	} from 'element-ui';
	export default {
		props: ['havedatainfo'],
		inject: ["reload"],
		filters: {
			copies(e) {
				if (e == 21001) {
					return '业主'
				} else if (e == 21002) {
					return '施工'
				} else if (e == 21003) {
					return '监理'
				} else if (e == 21004) {
					return '交通局'
				} else {
					return ''
				}
			},
			status(e) {
				if (e == 10003) {
					return '已关闭'
				} else if (e == 10000) {
					return '未开始'
				} else if (e == 10001) {
					return '进行中'
				}
			},
			dataType(e) {
				if (e == 1) {
					return "质量"
				} else if (e == 2) {
					return "安全"
				}
			}
		},
		components: {
			// Editor,
			// Toolbar
		},
		data() {
			return {
				initiatorId:null,//发起人用户id
				ruleForm: {},
				identycode: null,
				handleForm: [],
				items: [
					//原数组
					{
						message: "Foo",
						show: false,
						id: 1
					},
					{
						message: "Bar",
						show: false,
						id: 2
					},
				],
				fromuserid:null,
			}
		},
		mounted() {
			this.identycode = localStorage.getItem("identityCode")
			this.currentUserId= localStorage.getItem('currentUserId')
		},
		methods: {
			change() {
				this.$forceUpdate()
			},
			// // 查看附件
			// openUrl(val) {
			// 	window.open(val, "_blank");
			// },
			// 导出
			expo() {
				let loadingInstance = Loading.service({
					fullscreen: true
				});
				exportform(this.ruleForm.rectifyId).then(res => {
					var elemIF = document.createElement('iframe');
					elemIF.src = res.data.notificationExcel.objectUrl;
					elemIF.style.display = 'none';
					document.body.appendChild(elemIF);
					var elemIF1 = document.createElement('iframe');
					elemIF1.src = res.data.confirmationExcel.objectUrl;
					elemIF1.style.display = 'none';
					document.body.appendChild(elemIF1);
				})
				loadingInstance.close();
			},

		},
		watch: {
			havedatainfo(val) {
				reformeid(val.rectifyId).then(res => {
					this.ruleForm = res.data
					this.fromuserid=res.data.processorId
					this.initiatorId=res.data.initiatorId
					let arr = []
					let num = this.ruleForm.problems.length
					for (let i = 0; i < num; i++) {
						arr.push({
							advice: "",
							attachments: [],
							images: []
						})
					}
					this.handleForm = arr


				})
			}
		}
	}
</script>
<style scoped>
	/deep/ .el-dialog__header {
		padding: none !important;
		padding: 0;
	}

	.addbox {
		width: 100%;
		border: 1px solid #ddd;
		border-radius: 5px;
		margin-top: 4px;
	}

	.addbox .addboxtitle {
		display: flex;
		justify-content: space-between;
		height: 40px;
		line-height: 40px;
		background-color: #F5F5F5;
		padding: 0 40px;
		box-sizing: border-box;
		align-items: center;
	}

	.addDomain {
		display: block;
		color: rgb(64, 128, 255);
		margin: 10px 0;
		cursor: pointer;
	}

	.table {
		border-radius: 10px 10px 0 0;
		border-collapse: inherit;
		width: 96% !important;
		margin: 20px auto;
	}

	.vwBtn {
		cursor: pointer;
		font-size: 14px;
		font-weight: 400;
		color: #4080FF;
	}

	.table>thead:first-child>tr:first-child>th {
		border-top: 0;
	}

	.table>thead>tr>th {
		vertical-align: bottom;
		border-bottom: 2px solid #ddd;
	}

	.table>thead>tr>th,
	.table>tbody>tr>th,
	.table>tfoot>tr>th,
	.table>thead>tr>td,
	.table>tbody>tr>td,
	.table>tfoot>tr>td {
		padding: 8px;
		line-height: 1.428571429;
		vertical-align: top;
	}

	th {
		text-align: left;
	}

	.itemimage {
		width: 100px;
		height: 100px;
		margin-left: 40px;
	}

	.notStartedcon p {
		min-height: 40px;
		line-height: 40px;
		padding-left: 40px;
		box-sizing: border-box;
	}
	.frommaincom{
		display: flex;
		justify-content: space-between;
	}
	.frommaincom p {
		/* height: 60px; */
		line-height: 30px;
	}

	.constructionsub {
		margin: 20px 0;
	}

	.notStartedcon .widp {
		width: 100%;
		text-align: center;
		height: 80px;
	}

	.constructionbox {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-flow: column;
		align-items: center;
	}

	/deep/.el-input__inner::-webkit-input-placeholder {
		/*WebKit browsers*/
		color: #ccc !important;
	}

	.el-form {
		margin-top: 20px;
	}
</style>
