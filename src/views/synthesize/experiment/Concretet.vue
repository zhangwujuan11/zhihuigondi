<template>
	<div class="bridge">
		<Titlel>
			<template v-slot:nametext>
				<span>混凝土抗压试验</span>
			</template>
			<template v-slot:contont>
				<div>
					<div class="control">
						<el-button type="primary" @click="$router.back()">上一级</el-button>
						<el-button type="primary" @click="exportout">导出</el-button>
						<el-button type="warning" @click="addwokerdilog">新增</el-button>
						<div class="elserch">
							<el-input placeholder="请输入内容" v-model="serdata" class="input-with-select">
								<!-- <el-select v-model="select" slot="prepend" placeholder="全部">
						      <el-option label="全部" :value="140101"></el-option>
						    </el-select> -->
								<el-button slot="append" @click="serchdata">搜索</el-button>
							</el-input>
						</div>
					</div>
					<el-table :data="tableData" stripe :header-cell-style="
					   {background:'linear-gradient(180deg,rgba(10, 74, 216, 0.70) 30%,rgba(5, 49, 146, 0.30))',
					   color:'#00CFFF !important',
					   border:'none'
					   }" style="width: 100%"
					    @row-click="rowclick"
					   >
						<el-table-column label="操作">
							<template slot-scope="scope">
								<div>
									<i @click="changerow(scope.row)" class="el-icon-edit"></i>
									<i @click="deletrow(scope.row)" class="el-icon-circle-close"></i>
								</div>
							</template>
						</el-table-column>
						<el-table-column width="150" prop="sampleNo" label="报告编号">
						</el-table-column>
						<el-table-column width="280" prop="position" label="工程部位">
						</el-table-column>
						<el-table-column width="100" prop="variety" label="设计强度等级">
						</el-table-column>
						<el-table-column width="100" prop="approachDate" label="成型日期">
						</el-table-column>
						<el-table-column width="100" prop="samplingDate" label="抗压日期">
						</el-table-column>
						<el-table-column width="150" prop="batchNo" label="配合比报告编号">
						</el-table-column>
						<el-table-column width="130" prop="amount" label="塌落度（mm）">
						</el-table-column>
						<el-table-column width="200" prop="construction" label="施工单位">
						</el-table-column>
						<el-table-column width="300" prop="supervision" label="监理单位">
						</el-table-column>
						<!-- <el-table-column prop="remark" label="备注" >
						</el-table-column> -->
					</el-table>
					<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
				</div>
			</template>
		</Titlel>

		<!-- 新增 -->
		<el-dialog title="新增混凝土抗压试验数据" :visible.sync="wokerdilog" width="80%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				<el-form-item label="施工单位" prop="construction">
					<el-select v-model="ruleForm.construction" placeholder="请选择施工单位" style="width: 80%;" >
						<el-option v-for="(item,index) in optiont" :label="item.deptName"
							:value="item.deptName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="监理单位" prop="supervision">
					<el-select v-model="ruleForm.supervision" placeholder="请选择监理单位" style="width: 80%;">
						<el-option v-for="(item,index) in optiono" :label="item.deptName"
							:value="item.deptName"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="报告编号" prop="sampleNo">
					<el-input v-model="ruleForm.sampleNo"></el-input>
				</el-form-item>
				<el-form-item label="工程部位" prop="position">
					<el-input v-model="ruleForm.position"></el-input>
				</el-form-item>
				<el-form-item label="强度等级" prop="variety">
					<el-input v-model="ruleForm.variety"></el-input>
				</el-form-item>
				<el-form-item label="成型日期" prop="approachDate">
					<el-input v-model="ruleForm.approachDate"></el-input>
				</el-form-item>
				<el-form-item label="抗压日期" prop="samplingDate">
					<el-input v-model="ruleForm.samplingDate"></el-input>
				</el-form-item>
				<el-form-item label="塌落度" prop="amount">
					<el-input v-model="ruleForm.amount"></el-input>
				</el-form-item>
				<el-form-item label="配合比报告编号" prop="batchNo">
					<el-input v-model="ruleForm.batchNo"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.remark">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="wokerdilog = false">关 闭</el-button>
				<el-button type="primary" @click="submit('ruleForm')">提 交</el-button>
			</span>
		</el-dialog>


		<!-- 修改 -->
		<el-dialog title="修改混凝土抗压试验数据" :visible.sync="wokerdilogchange" width="80%">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				<el-form-item label="施工单位" prop="construction">
					<el-select v-model="ruleForm.construction" placeholder="请选择施工单位" style="width: 80%;" disabled>
						<el-option v-for="(item,index) in optiont" :label="item.deptName"
							:value="item.deptName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="监理单位" prop="supervision">
					<el-select v-model="ruleForm.supervision" placeholder="请选择监理单位" style="width: 80%;">
						<el-option v-for="(item,index) in optiono" :label="item.deptName"
							:value="item.deptName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="报告编号" prop="sampleNo">
					<el-input v-model="ruleForm.sampleNo" disabled></el-input>
				</el-form-item>
				<el-form-item label="工程部位" prop="position">
					<el-input v-model="ruleForm.position"></el-input>
				</el-form-item>
				<el-form-item label="强度等级" prop="variety">
					<el-input v-model="ruleForm.variety"></el-input>
				</el-form-item>
				<el-form-item label="成型日期" prop="approachDate">
					<el-input v-model="ruleForm.approachDate"></el-input>
				</el-form-item>
				<el-form-item label="抗压日期" prop="samplingDate">
					<el-input v-model="ruleForm.samplingDate"></el-input>
				</el-form-item>
				<el-form-item label="塌落度" prop="amount">
					<el-input v-model="ruleForm.amount"></el-input>
				</el-form-item>
				<el-form-item label="配合比报告编号" prop="batchNo">
					<el-input v-model="ruleForm.batchNo"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.remark">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="wokerdilogchange = false">关 闭</el-button>
				<el-button type="primary" @click="updatesubmit('ruleForm')">提 交</el-button>
			</span>
		</el-dialog>
		<Tabledilog :rebartable="rebartable"></Tabledilog>
	</div>
</template>

<script>
	import Titlel from '@/components/slot/Titlel.vue'
	import {concrete,jianli,shigong,addconcrete,updateconcrete,deletconcrete} from '@/utils/synthesize.js'
	import Tabledilog from '@/components/team/Tablecon.vue'
	export default {
		inject: ["reload"],
		components: {
			Titlel,
			Tabledilog
		},
		data() {
			return {
				rebartable:'',
				parentid: '',
				serdata: '', //搜索框
				tableData: [], //table
				currentPage: 1, // 默认显示第几页
				totalCount: 1, // 总条数，根据接口获取数据长度(注意：这里不能为空)
				pageSizes: [1, 2, 3, 4], // 个数选择器（可修改）
				PageSize: 20, // 默认每页显示的条数（可修改）
				wokerdilog: false,
				wokerdilogchange: false, //修改dilog
				// 新增工人
				ruleForm: {
					amount: "",
					approachDate: "",
					batchNo: "",
					construction: "",
					constructionId: null,
					position: "",
					remark: "",
					sampleNo: "",
					samplingDate: "",
					supervision: "",
					variety: ""
				},
				rules: {
					amount: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					approachDate: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					batchNo: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					// construction: [{
					// 	required: true,
					// 	message: '请输入',
					// 	trigger: 'blur'
					// }],
					position: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					sampleNo: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					samplingDate: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}],
					// supervision: [{
					// 	required: true,
					// 	message: '请输入',
					// 	trigger: 'blur'
					// }],
					variety: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}]
				},
				optiono: [], //监理单位
				optiont: [], //施工单位
			}
		},
		mounted() {
			this.parentid = this.$route.query.companyNo
			// 列表
			concrete({
				pageSize: 20,
				pageNum: 1,
				keyWord: '',
				deptId: this.parentid
			}).then(res => {
				this.tableData = res.data.items
				this.totalCount = res.data.total
			}).catch(() => {
				this.$message.error('请求错误')
			})
			jianli().then(res => {
				this.optiono = res.data.items
			})
			shigong().then(res => {
				this.optiont = res.data.items
			})
		},
		methods: {
			// 搜索指定信息
			serchdata() {
				concrete({
					pageSize: 20,
					pageNum: 1,
					keyWord: this.serdata,
					deptId: this.parentid
				}).then(res => {
					this.tableData = res.data.items
					this.totalCount = res.data.total
				}).catch(() => {
					this.$message.error('请求错误')
				})
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				concrete({
					pageSize: 20,
					pageNum: val,
					keyWord: this.serdata,
					deptId: this.parentid
				}).then(res => {
					this.tableData = res.data.items
					this.totalCount = res.data.total
				}).catch(() => {
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
			// 导出
			exportout() {
				window.location.href = process.env.VUE_APP_BASE_API + "v1/labs/concrete/export?deptId=" + this.parentid
			},
			// //施工单位change
			// cahngeshigong(){
			// 	for(let i=0;i<this.optiont.length;i++){
			// 		if(this.ruleForm.construction  == this.optiont[i].deptName){
			// 			console.log(this.optiont[i])
			// 			this.ruleForm.constructionId=this.optiont[i].deptId
			// 		}
			// 	}
			// },
			// 新增
			addwokerdilog(){
				this.ruleForm={};
				// this.ruleForm.id=this.$route.query.companyNo
				this.wokerdilog=true
			},
			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ruleForm.constructionId=this.$route.query.companyNo
						addconcrete(this.ruleForm).then(res => {
							if (res.code == 200) {
								this.wokerdilog = false
								this.$message.success("添加成功")
								this.reload()
							} else {
								this.$message.error(res.data.detail)
							}
						}).catch(() => {
							this.$message.error("失败")
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 修改工人数据
			changerow(i) {
				this.ruleForm = i
				this.wokerdilogchange = true
			},
			updatesubmit(){
				this.ruleForm.constructionId=this.$route.query.companyNo
				updateconcrete(this.ruleForm).then(res=>{
					if(res.code ==200){
						this.$message.success("修改成功")
						this.wokerdilogchange=false
						this.reload()
					}else{
						this.$message.error(res.message)
					}
				})
			},
			// 删除
			deletrow(i) {
				this.$confirm('是否确认删除报告编号为' + i.sampleNo + '的数据记录', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deletconcrete(i.sampleNo).then(res => {
						if (res.code == 200) {
							this.$message.success("删除成功")
							this.reload()
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			rowclick(row,col){
				if(col.label != "操作"){
					this.rebartable=row.sampleNo
					this.$store.state.teamtablecon=true
				}
			}

		}
	}
</script>

<style scoped>
	/deep/ .el-table,
	.el-table__expanded-cell {
		background-color: transparent;
	}

	/deep/ .el-table tr {
		background-color: transparent !important;
		color: white;
	}

	/deep/ .el-table--enable-row-transition .el-table__body td,
	.el-table .cell {
		background-color: transparent;
	}

	/deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
		background: rgba(2, 82, 173, 0.3);
	}

	/deep/.el-table td.el-table__cell,
	.el-table th.el-table__cell.is-leaf {
		border-bottom: 1px dashed rgba(53, 99, 161, 1);
	}

	/deep/.el-table--border::after,
	.el-table--group::after,
	.el-table::before {
		background-color: transparent;
	}

	/deep/ .el-table tbody tr:hover>td {
		background-color: transparent !important;
	}

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
		width: 50px;
		height: 50px;
	}

	/deep/.el-table .cell {
		font-size: 12px;
		text-align: center;
		max-width: 250px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/deep/.el-table .el-table__cell {
		padding: 2px 0;
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
</style>