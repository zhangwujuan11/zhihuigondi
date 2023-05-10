<template>
	<div>
		<el-dialog title="农名工导入" :visible.sync="$store.state.uplodezip" width="50%">
			<el-button type="primary" @click="worker2()" style="margin-bottom: 10px;">农民工-花名册-导入模板 下载</el-button>
			<p style="border-bottom: 1px solid #e5e5e5;margin-bottom: 10px;"></p>
			<el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false" multiple :limit="1"
				:on-exceed="handleExceed" :file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传zip文件</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.uplodezip = false">关 闭</el-button>
				<el-button type="primary" @click="daoru(1)">导 入</el-button>
			</span>
		</el-dialog>
		<el-dialog title="头像导入" :visible.sync="$store.state.uploadheader" width="50%">
			<el-button type="primary" @click="worker2()" style="margin-bottom: 10px;">农民工-花名册-导入模板 下载</el-button>
			<p style="border-bottom: 1px solid #e5e5e5;margin-bottom: 10px;"></p>
			<el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false" multiple :limit="1"
				:on-exceed="handleExceed" :file-list="fileList2">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传zip文件</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.uploadheader = false">关 闭</el-button>
				<el-button type="primary" @click="daoru(2)">导 入</el-button>
			</span>
		</el-dialog>
		<el-dialog title="农名工工资导入" :visible.sync="$store.state.uplodeg" width="50%">
			<el-button type="primary" @click="worker3()" style="margin-bottom: 10px;">农民工工资导入模板 下载</el-button>
			<p style="border-bottom: 1px solid #e5e5e5;margin-bottom: 10px;"></p>
			<el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false" multiple :limit="1"
				:on-exceed="handleExceed" :file-list="fileList3">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传zip文件</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.uplodeg = false">关 闭</el-button>
				<el-button type="primary" @click="daoru(3)">导 入</el-button>
			</span>
		</el-dialog>
		<el-dialog title="项目成员管理头像导入" :visible.sync="$store.state.mangentuplode" width="50%">
			<el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false" multiple :limit="1"
				:on-exceed="handleExceed" :file-list="fileList4">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传zip文件</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.mangentuplode = false">关 闭</el-button>
				<el-button type="primary" @click="daoru(4)">导 入</el-button>
			</span>
		</el-dialog>
		<el-dialog title="项目成员管理导入" :visible.sync="$store.state.mangentup" width="50%">
			<el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false" multiple :limit="1"
				:on-exceed="handleExceed" :file-list="fileList4">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传zip文件</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.mangentup = false">关 闭</el-button>
				<el-button type="primary" @click="daoru(5)">导 入</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		workzip,
		handleExcel,
		handleherder,
		handlegongzi,
		handlemanagementheader,
		managemenuplod
	} from '@/utils/synthesize.js'
	export default {
		data() {
			return {
				parentid: '',
				// 导入
				 fileList: [],
				 fileList2:[],
				 fileList3:[],
				 fileList4:[]
			}
		},
		mounted() {
			this.parentid = this.$route.query.parentid
		},
		methods: {
			// 模板下载
			worker2() {
				window.location.href =
					"https://obs-dev-nc.obs.cn-east-3.myhuaweicloud.com/aiying/template/%E5%86%9C%E6%B0%91%E5%B7%A5-%E8%8A%B1%E5%90%8D%E5%86%8C-%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
			},
			worker3(){
				window.location.href = "https://obs-dev-nc.obs.cn-east-3.myhuaweicloud.com/aiying/template/%E5%86%9C%E6%B0%91%E5%B7%A5%E5%B7%A5%E8%B5%84-%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			// 导入
			daoru(i) {
				if (this.$refs.upload.uploadFiles[0].raw.type != 'application/x-zip-compressed') {
					this.$message.error("上传格式应为压缩包 zip!");
					return false
				} else {
					var formData = new FormData();
					formData.append('file', this.$refs.upload.uploadFiles[0].raw)
					workzip(formData).then(res => {
						if (res.code == 200) { //压缩文件导入成功
							if (i == 1) { //花名册
								handleExcel({
									deptId: this.parentid,
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$message.warning("成功" + data.data.success + "条,失败" + data.data
											.error + "条")
										this.$store.state.uplodezip = false
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								}).catch(() => {
									this.$message.error("失败！")
								})
							} else if(i == 2) {
								handleherder({
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$store.state.uploadheader = false
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								}).catch(() => {
									this.$message.error("导入失败")
								})
							}else if(i == 3){
								handlegongzi({
									id: this.parentid,
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$store.state.uplodeg = false
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								}).catch(() => {
									this.$message.error("导入失败")
								})
							}else if(i == 4){
								handlemanagementheader({
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$store.state.mangentuplode = false
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								}).catch(() => {
									this.$message.error("头像导入失败")
								})
							}else if(i == 5){
								managemenuplod({
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$store.state.mangentup = false
										this.$message.warning("成功" + data.data.success + "条,失败" + data.data
											.error + "条")
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								}).catch(() => {
									this.$message.error("导入失败")
								})
							}
						}
					})
				}
			},
		}
	}
</script>

<style>
</style>