<template>
	<div>
		<el-dialog title="农名工导入" :visible.sync="$store.state.uplodezip" width="50%">
			<el-button type="primary" @click="worker2()" style="margin-bottom: 10px;">农民工-花名册-导入模板 下载</el-button>
			<p style="border-bottom: 1px solid #e5e5e5;margin-bottom: 10px;"></p>
			<el-upload class="upload-demo" ref="upload" action="#" :auto-upload="false" multiple :limit="1"
				:on-exceed="handleExceed" :file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
				<!-- <div slot="tip" class="el-upload__tip">只能上传zip文件</div> -->
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.uplodezip = false">关 闭</el-button>
				<el-button type="primary" @click="nmgdr()">导 入</el-button>
			</span>
		</el-dialog>
		<el-dialog title="头像导入" :visible.sync="$store.state.uploadheader" width="50%">
			<!-- <el-button type="primary" style="margin-bottom: 10px;">农民工-花名册-导入模板 下载</el-button> -->
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
				<!-- <div slot="tip" class="el-upload__tip">只能上传zip文件</div> -->
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.uplodeg = false">关 闭</el-button>
				<el-button type="primary" @click="nmggz()">导 入</el-button>
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
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="$store.state.mangentup = false">关 闭</el-button>
				<el-button type="primary" @click="xiangmuchengyuan()">导 入</el-button>
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
		inject:["reload"],
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
				window.location.href ="https://wisdom-fq-g228.obs.cn-east-3.myhuaweicloud.com:443/aiying/import/moban/nmghmc.xlsx"
			},
			worker3(){
				window.location.href = "https://wisdom-fq-g228.obs.cn-east-3.myhuaweicloud.com:443/aiying/import/moban/nmggz.xlsx"
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
								})
							} else if(i == 2) {
								handleherder({
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$store.state.uploadheader = false
										this.$message.warning("成功" + data.data.success + "条,失败" + data.data
											.error + "条")
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								})
							}else if(i == 3){
								handlegongzi({
									id: this.parentid,
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$store.state.uplodeg = false
										this.$message.warning("成功" + data.data.success + "条,失败" + data.data
											.error + "条")
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								})
							}else if(i == 4){
								handlemanagementheader({
									objectKey: res.data.objectKey,
									objectUrl: res.data.objectUrl
								}).then(data => {
									if (data.code == 200) {
										this.$store.state.mangentuplode = false
										this.$message.warning("成功" + data.data.success + "条,失败" + data.data
											.error + "条")
										this.reload()
									} else {
										this.$message.error(data.data.detail)
									}
								})
							}
						}
					})
				}
			},
			xiangmuchengyuan(){
				var formData = new FormData();
				formData.append('file', this.$refs.upload.uploadFiles[0].raw)
				workzip(formData).then(res => {
					if (res.code == 200){
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
						})
					}
				})
			},
			nmgdr(){
				var formData = new FormData();
				formData.append('file', this.$refs.upload.uploadFiles[0].raw)
				workzip(formData).then(res => {
					if (res.code == 200){
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
						})
					}
				})
			},
			nmggz(){
				var formData = new FormData();
				formData.append('file', this.$refs.upload.uploadFiles[0].raw)
				workzip(formData).then(res => {
					if (res.code == 200){
						handlegongzi({
							id: this.parentid,
							objectKey: res.data.objectKey,
							objectUrl: res.data.objectUrl
						}).then(data => {
							if (data.code == 200) {
								this.$store.state.uplodeg = false
								this.$message.warning("成功" + data.data.success + "条,失败" + data.data
									.error + "条")
								this.reload()
							} else {
								this.$message.error(data.data.detail)
							}
						})
					}
				})
			}
			
		}
	}
</script>

<style>
</style>