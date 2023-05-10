<template>
	<el-dialog title="发起检查修改" :visible.sync="$store.state.rectification" width="80%" :close-on-click-modal="false"  @closed="closede">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="整改标题" prop="title">
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<!-- 多条整改单 -->
			<div class="addbox" v-for="(item, index) in ruleForm.rectifyProblemUpdates" :key="index">
				<p class="addboxtitle">
					整改内容{{index + 1}}
					<i @click.prevent="removeDomain(item)" v-if="index!=0" class="el-icon-delete"></i>
				</p>
				<el-form-item label="内容" :prop="'rectifyProblemUpdates.' + index + '.context'" :rules="{
				      required: true, message: '内容不能为空', trigger: 'blur'
				    }">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.context" style="width: 90%;">
					</el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload :action="baseurl+'v1/communal/files/scopes/rectify/attachment/actions/upload'"
						list-type="picture-card" :on-success="handleImageAdd.bind(this,index)"
						accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG" :on-preview="handlePictureCardPreview"
						:before-upload="beforeImageUpload" :on-remove="handleRemove.bind(this,index)"
						:file-list="item.fileListImg">
						<i slot="default" class="el-icon-upload"></i>
						<el-dialog append-to-body :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-upload>
				</el-form-item>
				<el-form-item label="附件">
					<el-upload :action="baseurl+'v1/communal/files/scopes/rectify/attachment/actions/upload'"
						:on-success="handlePdfAdd.bind(this,index)" :on-preview="previewPdf"
						:before-upload="beforePdfUpload" :on-remove="handlePdfRemove.bind(this,index)" accept=".pdf">
						<el-button size="small">
							<i class="el-icon-upload2 el-icon--right"></i>上传PDF文件 (小于50M)
						</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="类型" :prop="'rectifyProblemUpdates.' + index + '.dataType'" :rules="{
				       required: true, message: '请选择类型', trigger: 'blur'
				     }">
					<el-radio-group v-model="item.dataType">
						<el-radio :label="1">质量</el-radio>
						<el-radio :label="2">安全</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="隐患点" :prop="'rectifyProblemUpdates.' + index + '.hidDanger'" :rules="{
				      required: true, message: '请选择隐患点', trigger: 'blur'
				    }">
					<el-select placeholder="请选择" v-model="item.hidDanger">
						<el-option v-for="item in dangerlist" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</div>
			<span class="addDomain" @click="addDomain">+继续添加整改问题</span>

			<el-row>
				<el-col :span="12">
					<el-form-item label="发起时间" prop="launchTime">
						<el-date-picker v-model="ruleForm.launchTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
							value-format="timestamp">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="标段" prop="sectionId">
						<el-select placeholder="请选择" v-model="ruleForm.sectionId" @change="selectone">
							<el-option  
							v-for="(item,index) in processorDeptList" 
							:key="index"
							:label="item.sectionName" 
							:value="item.sectionId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="责任人" v-if="zerenbox">
						<el-input v-model="processorList.nickName" style="width: 220px;" disabled></el-input>
					</el-form-item>
					<el-form-item label="抄送" prop="resource">
						<el-checkbox-group v-model="ruleForm.copiedType" @change="clickCopied">
							<el-checkbox 
							v-for="item in copiedTypeList" 
							:key="item.id" 
							:label="item.id"
							:value="item.id">{{item.name}}</el-checkbox>
				 		<!-- <el-checkbox label="交通局" key="交通局">交通局</el-checkbox>
							<el-checkbox label="监理" key="监理">监理</el-checkbox>
							<el-checkbox label="无" key="无">无</el-checkbox> -->
						</el-checkbox-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
				 <el-form-item label="完成时间" prop="finishTime">
						<el-date-picker 
						v-model="ruleForm.finishTime" 
						type="date" 
						format="yyyy-MM-dd"
						value-format="timestamp"
						placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="部门" prop="processorDeptId" v-if="ruleForm.sectionId != ''">
						<el-select v-model="ruleForm.processorDeptId" placeholder="请选择"  @change="selecttwo">
							<el-option 
							v-for="item in jobinfo" 
							:key="parseInt(item.deptId)"
							:label="item.deptName" 
							:value="item.deptId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-checkbox v-model="ruleForm.sendSms" :true-label="1" :false-label="0">是否发送手机短信提醒</el-checkbox>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<span slot="footer" class="dialog-footer" style="text-align: center;display: block;">
			<el-button @click="closedes()">取 消</el-button>
			<el-button type="success" @click="savefrom('ruleForm')">保 存</el-button>
			<el-button type="primary" @click="submitForm('ruleForm')">发起整改</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {biaoduan,getUserList,subform,saveAsDraft} from "@/utils/rectify"
	export default {
		inject: ["reload"],
		data() {
			return {
				dangerlist: [{ //隐患点options
					id: 22001,
					name: "履约",
				}, {
					id: 22002,
					name: "进度",
				}, {
					id: 22003,
					name: "预制场",
				}, {
					id: 22004,
					name: "钢筋场",
				}, {
					id: 22005,
					name: "拌合站",
				}, {
					id: 22006,
					name: "驻地",
				}, {
					id: 22007,
					name: "地基",
				}, {
					id: 22008,
					name: "路面",
				}, {
					id: 22009,
					name: "桥梁",
				}, {
					id: 22010,
					name: "隧道",
				}],
				copiedTypeList: [ //抄送列表
					{
						id: 21001,
						name: "业主",
						disabled: false
					},
					{
						id: 21004,
						name: "交通局",
						disabled: false
				
					}, {
						id: 21003,
						name: "监理",
						disabled: false
					},
					{
						id: 0,
						name: "无",
						disabled: false
					},
				],
				ruleForm: {//整改表单
					sectionId: '',
					title: "",
					copiedType: [21001, 21003], //抄送人员列表
					finishTime: "",
					launchTime: new Date().getTime(),
					processorDeptId: '',
					processorId: '',
					rectifyProblemUpdates: [{
						editType: 0,
						title: "整改内容1",
						context: "",
						dataType: "",
						hidDanger: "",
						images: [],
						fileListImg: [],
						fileListPdf: [],
						attachments: [],
					}],
					sendSms: 0,
				},
				checkNum: 1, //整改问题数量
				processorList: {
					nickName: ''
				},
				rules: {//表单验证
					title: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}],
					processorDeptId: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}], //部门id
					finishTime: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					processorId: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}], //责任人id
					sectionId: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}]
				},
				checkedCities: '', //临时数据
				baseurl: process.env.VUE_APP_BASE_API,
				dialogVisible: false, //大图
				dialogImageUrl: '',//大图地址
				processorDeptList:[],//标段列表
				jobinfo: [], //当前标段下的部门
				jobinfois: {},
				bumenbox:false,
				zerenbox:false,
			}
		},
		mounted() {
			// 标段
			biaoduan().then(res=>{
				this.processorDeptList=res.data.items
			})
		},
		methods: {
			// 发起整改
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.ruleForm)
						subform(this.ruleForm).then(res=>{
							if(res.code == 200){
								this.$message.success('发起整改成功')
								this.$store.state.rectification=false
								this.reload()
								
							}else{
								this.$message.error(res.message)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 保存草稿
			savefrom(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						saveAsDraft(this.ruleForm).then(res=>{
							if(res.code == 200){
								this.$message.success('保存成功')
								this.$store.state.rectification=false
								this.reload()
								
							}else{
								this.$message.error(res.message)
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			// 移除内容
			removeDomain(item) {
				var index = this.ruleForm.rectifyProblemUpdates.indexOf(item)
				if (index !== -1) {
					this.ruleForm.rectifyProblemUpdates.splice(index, 1)
				}
			},
			// 增加内容
			addDomain() {
				this.checkNum += 1
				this.ruleForm.rectifyProblemUpdates.push({
					editType: 0,
					title: "整改内容" + this.checkNum,
					context: "",
					dataType: "",
					hidDanger: "",
					images: [],
					attachments: [],
					fileListImg: [],
					fileListPdf: [],
				});
			},


			// uploade
			handleImageAdd(index, res) {
				this.ruleForm.rectifyProblemUpdates[index].images.push(res.data.objectUrl)

			},
			// 删除图片
			handleRemove(index, file, fileList) {
				this.ruleForm.rectifyProblemUpdates[index].images = fileList.map(item => {
					return item.response.data.objectUrl
				})
			},
			// 放大图片
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//图片格式验证
			beforeImageUpload(file) {
				const isLt5M = file.size / 1024 / 1024 < 5;
				if (!isLt5M) {
					this.$message.error('上传图片大小不能超过 5MB!');
				}
				return;
			},
			// 添加pdf
			handlePdfAdd(index, res, file) {
				this.ruleForm.rectifyProblemUpdates[index].attachments.push(res.data.objectUrl)
				// this.uploadFileList.launch.push({
				// 	name: file.name,
				// 	uploader: "",
				// 	url: res.data.objectUrl,
				// })
			},
			//pdf
			previewPdf(file) {
				if (file.url) {
					window.open(file.url)
				} else {
					window.open(file.response.data.objectUrl)
				}
			},
			beforePdfUpload(file) {
				const isLt50M = file.size / 1024 / 1024 < 50;
				if (!isLt50M) {
					this.$message.error('上传pdf大小不能超过 50MB!');
				}
				return;
			},
			//删除pdf
			handlePdfRemove(index, file, fileList) {
				this.ruleForm.rectifyProblemUpdates[index].attachments = fileList.map(item => {
					return item.response.data.objectUrl
				})
			},

			// 校验
			problem(rule, value, callback) {
				console.log(this.ruleForm.rectifyProblemUpdates.every(item => {
					return !item.context
				}))
				if (!this.ruleForm.rectifyProblemUpdates.every(item => {
						return item.context
					})) {
					return callback(new Error("请输入整改内容"));
				}
				if (!this.ruleForm.rectifyProblemUpdates.every(item => {
						return item.dataType
					})) {
					return callback(new Error("请选择类型"));
				}
				if (!this.ruleForm.rectifyProblemUpdates.every(item => {
						return item.hidDanger
					})) {
					return callback(new Error("请选择隐患点"));
				}
				callback();
			},
			// 标段change
			selectone(){
				this.ruleForm.processorDeptId=''
				this.zerenbox=false
				for (var i = 0; i < this.processorDeptList.length; i++) {
					if (this.processorDeptList[i].sectionId == this.ruleForm.sectionId) {
						this.jobinfo = this.processorDeptList[i].deptList
						this.ruleForm.sectionId = this.processorDeptList[i].sectionId
						this.bumenbox=true
					}
				}
			},
			//部门change
			selecttwo(){
					for (var i = 0; i < this.jobinfo.length; i++) {
						if (this.ruleForm.processorDeptId == this.jobinfo[i].deptId)
							this.jobinfois = this.jobinfo[i]
						this.$nextTick(() => {
							getUserList(this.jobinfois.deptId).then(res=>{
								this.processorList = res.data.items[0]
								this.ruleForm.processorId = res.data.items[0].userId
								this.zerenbox=true
							})
						})
					}
			},
			
			// 抄送人
			clickCopied() {
				if (this.ruleForm.copiedType.length == 0) {
					this.copiedTypeList.forEach(item => {
						if (item.id != 0) {
							item.disabled = false
						}
					})
					return
				}
				if (this.ruleForm.copiedType.some(item => {
						return item == 0
					})) {
					this.ruleForm.copiedType = [0]
					this.copiedTypeList.forEach(item => {
						if (item.id != 0) {
							item.disabled = true
						}
					})
				}
			},
			// 关闭
			closede(){
				this.$store.state.rectification=false
				this.reload()
			},
			closedes(){
				this.$store.state.rectification=false
				this.reload()
			}
		}
	}
</script>

<style scoped>
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

	.el-form-item {
		margin-top: 10px;
	}

	/deep/.el-input--suffix .el-input__inner {
		background: #FFF !important;
		border: 1px solid #DCDFE6 !important;
		color: #606266 !important;
		text-align: left !important;
	}

	/deep/.el-select .el-input .el-select__caret {
		color: #C0C4CC !important;
	}

	.el-checkbox {
		margin-right: 10px;
	}

	/deep/.el-checkbox__label {
		padding-left: 5px;
	}
	/deep/.el-input__inner::-webkit-input-placeholder{ /*WebKit browsers*/
	color: #ccc !important;
	}
</style>
