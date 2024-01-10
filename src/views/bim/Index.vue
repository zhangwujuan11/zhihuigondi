<template>
	<div class="partybuild">
		<div class="maincon">
			<div id="domId"></div>
			<div id="bim-ele-detail-table"></div>
			<!-- 构建列表 -->
			<el-drawer :modal="false" :visible.sync="drawer" direction="ltr" :wrapperClosable="false">
				<Progress :list='list' @sondata="meetfunction" :dlirelode="dlirelode"></Progress>
				<!-- 分页 -->
				<!--  <el-pagination
			    background
			    v-if="total > 4"
			    @current-change="whatepage"
			    :current-page.sync="currentPage"
			    layout="prev, pager, next, jumper"
			    :page-size="4"
			    :total="total">
			  </el-pagination> -->
			</el-drawer>
			<el-button @click="dra()" type="primary" class="oldtable">
				构件列表<i class="el-icon-d-arrow-right"></i>
			</el-button>

			<!-- 堆积图 -->
			<el-drawer title="建设堆积图" :visible.sync="drawertwo" direction="ltr">
				<div ref="main" style="width:100%;height:80%;"></div>
			</el-drawer>
			<el-button @click="drawert()" type="primary" class="newtable">
				堆积图<i class="el-icon-d-arrow-right"></i>
			</el-button>
			
			<el-button  type="primary" class="newtablet" @click="bintvshow" v-if="tvishave">
				{{titlitv}}<i class="el-icon-d-arrow-right"></i>
			</el-button>


			<el-dialog title="" :modal="false" :visible.sync="dialogVisible" width="100%" :close-on-click-modal="false"
				:show-close="false" class="topdilog">
				<!-- 构建列表详情 -->
				<el-form ref="form" :model="form" label-width="65px">
					<el-form-item label="顺序">
						<el-input v-model="form.sequence"></el-input>
					</el-form-item>
					<el-form-item label="完成时间">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"
							format="yyyy 年 MM 月 dd 日"></el-date-picker>
					</el-form-item>
					<el-form-item label="工程进度">
						<el-input v-model="form.progress"></el-input>
					</el-form-item>
					<el-form-item label="验收状态">
						<el-select v-model="form.status" placeholder="请选择" @change="builderchange()">
							<el-option label="未开始" :value="101001"></el-option>
							<el-option label="建设中" :value="101002"></el-option>
							<el-option label="已完成" :value="101003"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="权重">
						<el-input v-model="form.weight"></el-input>
					</el-form-item>
					<el-form-item label="安全等级">
						<el-select v-model="form.securityLevel" placeholder="请选择">
							<el-option label="低" :value="1"></el-option>
							<el-option label="中" :value="2"></el-option>
							<el-option label="高" :value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="width: 100%;">
						<div class="dilofooter">
							<el-button type="success" @click="onSubmit"> <i class="el-icon-check"
									style="font-weight:1000;"></i> 确认</el-button>
							<el-button @click="dialogfalse"> <i class="el-icon-close"
									style="font-weight: 1000;"></i>取消</el-button>
						</div>
					</el-form-item>
				</el-form>
				<!-- 桩检详情 -->
				<div class="stakedilog" v-if="stakedilog">
					<p class="titles">桩检数据详情</p>
					<div class="morep" v-if="stakeinfo">
						<!-- <p>混凝土强度:{{stakeinfo.concreteStrength}}</p> -->
						<p>检测时间:{{stakeinfo.testTime | testTime}}</p>
						<p>报告: <sapn @click="godownlid(stakeinfo.dataFile)" style="color: skyblue;cursor: pointer;">查看</sapn></p>
					<!-- 	<p>部门名称:{{stakeinfo.deptName}}</p>
						<p>GPS状态:{{stakeinfo.gpsIsValid}}</p>
						<p>GPS维度:{{stakeinfo.gpsLatitude}}</p>
						<p>GPS经度:{{stakeinfo.gpsLongitude}}</p>
						<p>设备编号:{{stakeinfo.machineId}}</p> -->
						<p>桩径:{{stakeinfo.pileDiameter}}</p>
						<p>桩长:{{stakeinfo.pileLength}}</p>
						<p>桩号:{{stakeinfo.pileNo}}</p>
						<p>桩顶初测点标高(m):{{stakeinfo.concreteStrength}}</p>
						<p>检测结果（类型/判定）:{{stakeinfo.machineId}}/{{stakeinfo.serialNo}}</p>
						<!-- <p>检测流水号:{{stakeinfo.serialNo}}</p> -->
						<!-- <p>测点间距:{{stakeinfo.step}}</p> -->
						<!-- <p>测试时间:{{stakeinfo.testTime}}</p> -->
						<!-- <p>声测管数量:{{stakeinfo.tubeCount}}</p> -->
					</div>
					<div v-if="!stakeinfo" style="text-align: center;width: 100%;line-height: 200px;">
						暂无数据
					</div>
				</div>
			</el-dialog>
		</div>
		
		
		
		<!-- 视频 -->
		<el-dialog 
		size="100%"
		append-to-body
		custom-class="tvdilog"
		:withHeader="false"
		:show-close="false"
		:visible.sync="tv"
		>
			<i class="el-icon-circle-close" @click="tv=false" style="color: white;position: absolute;z-index: 9999;top: 5vh;right: 2vw;font-size: 30px;font-weight: bold;"></i>
			 <video v-if="tv" id="uav_video" style="width: 100%;height: 100%;position: relative;" width="100%" height="100%" controls autoplay='true' ref="vide">
				 <source id="videosSource" :src="tvurl" type="video/mp4">
			 </video>
		</el-dialog>
		<!-- <el-drawer
		size="96%"
		append-to-body
		class="tvdilog"
		:withHeader="false"
		:visible.sync="tv"
		>
		<i class="el-icon-circle-close" @click="tv=false" style="color: white;position: absolute;z-index: 9999;top: 5vh;right: 2vw;font-size: 30px;font-weight: bold;"></i>
		 <video v-if="tv" id="uav_video" style="width: 100%;height: 100%;position: relative;" width="100%" height="100%" controls autoplay='true' ref="vide">
			 <source id="videosSource" :src="tvurl" type="video/mp4">
		 </video>
		</el-drawer> -->
	</div>
</template>

<script>
	import {
		firstbim,
		initColor,
		getdata,
		pileByMonth,
		elementName,
		detailpart,
		updatadetail,
		bridgedetailnew,
		tvshow
	} from "@/utils/bim.js"
	import Progress from '@/components/bim/Progress'
	export default {
		name: 'depet',
		filters:{
			testTime(e){
				return e.substring(0,e.length-8);
			}
		},
		inject: ["reload"],
		data() {
			return {
				viewToken: 'a7c49f0a880d4dff9bd5d932e1ff5e1d',
				viewer3D: '',
				model3D: '',
				colorElements: '',
				app: '',
				iewAdded: false,
				isMapLoaded: false,
				loaderConfig: null,
				drawer: false,
				drawertwo: false,
				charts: "",
				list: [],
				dialogVisible: false,
				form: {
					"endDate": null,
					"progress": 0,
					"securityLevel": 0,
					"sequence": 0,
					"status": null,
					"weight": 0
				},
				dependid: null,
				stakedilog: false,
				stakeinfo: {}, //桩检数据详情
				dlirelode: false, //桩检数据刷新
				tv:false,
				titlitv:'',
				tvurl:'',
				tvishave:false
			}
		},
		components: {
			Progress
		},
		mounted() {
			// 视频是否显示
			tvshow().then(res=>{
				if(res.data.total == 0){
					this.tvishave=false
				}else{
					this.tvishave=true
					this.titlitv=res.data.items[0].title
				}
			})
			
			this.$nextTick(() => {
				firstbim().then(res=>{
					var that=this
					var options = new BimfaceSDKLoaderConfig();
					options.viewToken = res.data.viewToken;
					this.viewToken=res.data.viewToken
					// options.viewToken = "4e313457e26b4e7ea930ac337db33edc";
					// this.viewToken="4e313457e26b4e7ea930ac337db33edc"
					initColor().then(data=>{
						this.colorElements = data.data
						BimfaceSDKLoader.load( options, that.successCallback,that.failureCallback)
					})
				})
			})
		},
		methods: {

			// succsCallback(viewMetaData) {
			// 	var that = this
			// 	let domShow = document.getElementById('domId');
			// 	let webAppConfig = new Glodon.Bimface.Application.WebApplicationGISConfig();
			// 	webAppConfig.domElement = domShow;
			// 	let app = new Glodon.Bimface.Application.WebApplicationGIS(webAppConfig);
			// 	app.addScene("075861dae94c495d97c0728becd05fee");
			// 	let viewer = app.getViewer();
				
			// 	// 监听场景渲染完成
			// 	viewer.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.SceneAdded, function() {
			// 		let layerMng = viewer.getLayerManager();
					
			// 		// 监听图层加载完成
			// 		viewer.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.LayerAdded, function(data) {
			// 			console.log(data.getViewer())
			// 			// 构件着色
			// 			layerMng.getLayer('layer_10000802396865').getComponentManager().overrideColor({ids: that.colorElements.buildingEle.join().split(",")}, new Glodon.Web.Graphics.Color("#327d1c", 0.5));
			// 			layerMng.getLayer('layer_10000802396865').getComponentManager().overrideColor({ids: that.colorElements.completeEle.join().split(",")}, new Glodon.Web.Graphics.Color("#f573cf", 0.5));
			// 			that.model3D = viewer
			// 			viewer.render();
			// 			 // console.log(layerMng.'getLayer('layer_10000802396865').getPolygonComponentManager())
			// 			// 点击监听
			// 			viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, that.getData);
			// 		});
					
			// 		// viewer.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.SelectedObjectsChanged, function(data) {
			// 		// 	console.log(data)
						
			// 		// })
			// 	})
			// },





			// 提交修改表单
			onSubmit() {
				updatadetail({
					data: this.form,
					id: this.dependid
				}).then(res => {
					if (res.code == 200) {
						this.dialogVisible = false
						this.stakedilog = false
						this.dlirelode = !this.dlirelode
						if (this.form.status == 101002) {
							var color = "#f573cf"
							if (this.form.securityLevel == '1') {
								color = "#ffff00"
							} else if (this.form.securityLevel == '2') {
								color = "#FF8000"
							} else if (this.form.securityLevel == '3') {
								color = "#ff0000"
							}
							let building_color = new Glodon.Web.Graphics.Color(color, 0.5)
							this.model3D.overrideComponentsColorById([this.dependid], building_color);
						} else if (this.form.status == 101003) {
							let building_color = new Glodon.Web.Graphics.Color("#327d1c", 0.5);
							this.model3D.overrideComponentsColorById([this.dependid], building_color);
						} else { //移除颜色
							this.model3D.restoreComponentsColorById([this.dependid]);
						}
					} else {
						this.$message.error('失败')
					}
				})
			},

			setButtonText(btnId, text) {
				var dom = document.getElementById(btnId);
				if (dom != null && dom.nodeName == "BUTTON") {
					dom.innerText = text;
				}
			},
			// 加载成功回调函数
			successCallback(viewMetaData) {
				var that = this
				var dom4Show = document.getElementById('domId');
				var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
				webAppConfig.domElement = dom4Show;
				webAppConfig.Toolbars = [];
				webAppConfig.enableLogarithmicDepthBuffer = true;
				if (webAppConfig.domElement != null) {
					var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
					app.addView(viewMetaData.viewToken);
					var viewer3D = app.getViewer();
					that.viewer3D = viewer3D;
					// 增加加载完成监听事件
					viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function() {
						that.viewAdded = true;
						//自适应屏幕大小
						 window.addEventListener('resize', ()=>{
						       document.documentElement.clientWidth, document.documentElement.clientHeight - 40
						    })
						let mapConfig = new Glodon.Bimface.Plugins.TileMap.MapConfig();
						mapConfig.viewer = viewer3D;
						
						// //上杭
						mapConfig.basePoint = {
							"x":999,
							"y":-800
						};
						mapConfig.modelPosition = [116.520085872,25.149213887]; 
						mapConfig.modelAltitude =1;
						mapConfig.maxLevel = 20;
						mapConfig.modelRotationZ = 179.01;
						let map = new Glodon.Bimface.Plugins.TileMap.Map(mapConfig);
						map.setMapSource({
							credit: Glodon.Bimface.Common.Credit.Amap,
							url: 'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z} '
						})
						
						let model3D = viewer3D.getModel()
						let com_color = new Glodon.Web.Graphics.Color("#327d1c", 0.5);
						model3D.overrideComponentsColorById(that.colorElements.completeEle, com_color);
						let building_color = new Glodon.Web.Graphics.Color("#f573cf", 0.5);
						model3D.overrideComponentsColorById(that.colorElements.buildingEle, building_color);
						that.model3D = model3D
						viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, that.getData);
					});
					// 渲染场景
					viewer3D.render();
				}
			},
			// 加载失败回调函数
			failureCallback(error) {
				console.log(error);
			},
			getData(ele_info) {
				if (ele_info.elementId != undefined) {
					if (ele_info.elementId.split("-").length > 2) {
						return
					}
					this.dependid = ele_info.elementId
				}
				getdata(ele_info).then(res => {
					this.form = {
						"beginDate": "",
						"endDate": res.data.endDate,
						"progress": res.data.progress,
						"securityLevel": res.data.securityLevel,
						"sequence": res.data.sequence,
						"status": res.data.status,
						"weight": res.data.weight
					}
					this.dialogVisible = true
				}).catch(() => {
					console.log('error')
				})
			},
			// 堆积图
			drawert() {
				this.drawertwo = true
				pileByMonth().then(res => {
					this.charts = this.$echarts.init(this.$refs.main, null, {
						devicePixelRatio: 2.5
					});
					this.charts.setOption({
						color: ['rgba(3, 179, 39,1)', 'rgba(36, 164, 255,1)', 'rgba(255, 177, 64, 1)'],
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								label: {
									backgroundColor: '#6a7985'
								}
							}
						},
						toolbox: {
							itemSize: 20,
							itemGap: 30,
							right: 50,
						},
						legend: {
							data: res.data.legend,
							icon: 'rect',
							itemHeight: 10,
							itemWidth: 15,
							top: '30',
							left: '3%',
							textStyle: {
								color: "#000",
							},
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							axisLine: {
								show: true
							},
							boundaryGap: false,
							data: res.data.xaxis
						}],
						yAxis: [{
							type: 'value',
							axisLine: {
								show: true
							},
						}],
						series: [{
								name: '已完成',
								type: 'line',
								stack: 'Total',
								areaStyle: {},
								symbol: 'none',
								emphasis: {
									focus: 'series'
								},
								data: res.data.yaxis.已完成
							},
							{
								name: '建设中',
								type: 'line',
								stack: 'Total',
								areaStyle: {},

								symbol: 'none',
								emphasis: {
									focus: 'series'
								},
								data: res.data.yaxis.建设中
							},
							{
								name: '未开始',
								type: 'line',
								stack: 'Total',
								areaStyle: {},

								symbol: 'none',
								emphasis: {
									focus: 'series'
								},
								data: res.data.yaxis.未开始
							}
						]
					});
				})
			},
			starVideotLoading() {
				var that = this
				that.videoLoading = this.$loading({
					lock: true, //是否锁定
					text: "拼命加载中...", //显示在加载图标下方的加载文案
					spinner: 'el-icon-loading',
					target: document.querySelector('.video_loading'), //设置加载动画区域  添加了target属性就可以设置局部区域，不添加就默认全局区域
					background: 'rgba(0,0,0,.5)', //遮罩背景色
				});
			},
			endVideoLoading() {
				var that = this
				that.videoLoading.close();
			},
			dra() {
				this.starVideotLoading()
				elementName({
					limit: 9,
					offset: 0,
					elementName: ''
				}).then(res => {
					this.drawer = true
					this.list = res.data.items
					this.endVideoLoading()
				})
			},

			// 构建列表点击
			meetfunction(val) {
				this.dependid = val.elementId
				detailpart(val.elementId).then(res => {
					this.form = {
						"beginDate": "",
						"endDate": res.data.endDate,
						"progress": res.data.progress,
						"securityLevel": res.data.securityLevel,
						"sequence": res.data.sequence,
						"status": res.data.status,
						"weight": res.data.weight
					}
					this.dialogVisible = true
				})
				if (val.elementType == 'stake') {
					bridgedetailnew(val.elementName).then(data => {
						if (data.data != null) {
							this.stakeinfo = data.data
						} else {
							this.stakeinfo = null
						}
						this.stakedilog = true
					})
				}
				 this.viewer3D.getModel().clearSelectedComponents();
				this.viewer3D.getModel().setSelectedComponentsById([val.elementId]);
				this.viewer3D.getModel().zoomToSelectedComponents();
				
				
			},
			// 关闭所有遮罩层
			dialogfalse() {
				this.dialogVisible = false
				this.stakedilog = false
			},
			// 验收状态改变时
			builderchange() {
				if (this.form.status == 101001) {
					this.form.progress = 0
				} else if (this.form.status == 101002) {
					this.form.progress = 10
				} else if (this.form.status == 101003) {
					this.form.progress = 100
				}
			},
			
			// 视频
			bintvshow(){
				tvshow().then(res=>{
					if(res.code ==200){
						this.tv=true
						this.titlitv=res.data.items[0].title
						this.tvurl=res.data.items[0].url
					}
				})
			},
			godownlid(i){
				window.open(i)
			}
		},
	}
</script>

<style scoped>
	.partybuild {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		height: calc(100vh - 5.7292vw) !important;

	}

	#domId {
		flex: 1;
		width: calc(100% - 30px);
		height: 100%;
		position: absolute;
		right: 0;

	}

	.maincon {
		height: 100%;
		width: calc(100% - (1.45833vw * 2));
		position: relative;
	}

	.oldtable {
		position: absolute;
		left: 0;
		top: 50px;
		width: 24px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		background-color: #0252AD;
		text-align: center;
		padding: 10px 0;
		line-height: 20px;
		color: #00FFFF;
		white-space: normal;
	}

	.newtable {
		position: absolute;
		left: 0;
		top: 200px;
		width: 24px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		background-color: #0252AD;
		text-align: center;
		padding: 10px 0;
		line-height: 20px;
		color: #00FFFF;
		white-space: normal;
	}
	.newtablet{
		position: absolute;
		left: 0;
		top: 330px;
		width: 24px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		background-color: #0252AD;
		text-align: center;
		padding: 10px 0;
		line-height: 20px;
		color: #00FFFF;
		white-space: normal;
		margin-left:0;
		word-wrap: break-word;
		
	}

	/deep/.el-drawer__open .el-drawer.ltr {
		width: 600px !important;
		height: 100%;
		left: 52px;
		top: 100px;
		background-color: hsla(0, 0%, 100%, .8);
		border-radius: 5px;
	}

	/deep/.el-drawer__header {
		margin-bottom: 20px;
	}

	/deep/.el-drawer__body {
		overflow: scroll;
		scrollbar-width: none !important;
		/* firefox */
		-ms-overflow-style: none !important;
		/* IE 10+ */
	}

	/deep/.el-drawer__body::-webkit-scrollbar {
		display: none;
		/* Chrome Safari */
	}

	/deep/.el-drawer__header {
		color: black !important;
		font-weight: 800 !important;
	}

	/* 构建列表详情 */
	/deep/.el-dialog__header {
		background-color: #f5f5f5;
		font-size: 14px;
		font-weight: normal;
		padding: 10px 20px;
	}

	/deep/.el-dialog__body {
		padding: 10px;
		
	}

	.el-form {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.el-form-item {
		width: 49%;
	}

	/deep/.el-form-item__label {
		border: 1px solid #ccc;
		padding: 0;
		text-align: center;
		font-size: 12px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border-right: none;
	}

	/deep/.el-input__inner {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		height: 41px;
	}

	/deep/.el-dialog {
		/* margin-left: 58%; */
		margin-top: 0 !important;
	}

	.dilofooter {
		width: 100%;
		display: flex;
		justify-content: end;
	}

	/* 桩检数据 */
	.stakedilog {
		position: absolute;
		right: 0;
		top: calc(100% + 12px);
		width: 100%;
		height: auto;
		background-color: white;
		border-radius: 4px;
		padding: 15px;
		box-sizing: border-box;
	}

	.stakedilog .titles {
		height: 35px;
		line-height: 35px;
		text-indent: 10px;
		font-size: 18px;
		border-bottom: 1px solid #ccc;
	}

	.morep {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.morep p {
		width: 49%;
		line-height: 32px;
	}

	.topdilog {
		margin-top: 13vh;
		width: 40%;
		height: calc(100% - 10vh);
		right: 2px !important;
		left: auto !important;
	}

	/deep/.el-drawer__wrapper {
		width: 670px !important;
		height: 94%;
	}
	/deep/.tvdilog{
		width: 97% !important;
		height: 100%;
		position: absolute;
		right: 0;
		background: transparent;
	}
	/deep/.tvdilog .el-dialog__body{
		height: 90%;
	}
	/deep/.el-form-item{
		margin-bottom: 20px;
	}
</style>