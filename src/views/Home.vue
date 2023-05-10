<template>
	<div class="home">
		<div class="home-top maincon">
			<div class="hometopleft">
				<div class="bgbox-s">
					<Titles></Titles>
					<div class="home-topfirst">
						<div class="texttip">
							已完成投资
							<span class="numpet">¥{{investDone}} <span style="font-size: 14px;">万元</span></span>
							总投资额
							<span class="numsum">¥{{investSum}} <span style="font-size: 14px;">万元</span></span>
						</div>
						<div class="home-topfirstechart" ref="mabox"></div>
					</div>
				</div>
				<div class="bgbox-s" @click="gorealtime">
					<Titles>
						<template v-slot:nametext>
							项目简介
						</template>
					</Titles>
					<div class="textcom">{{realtime}}</div>
				</div>
				<div class="bgbox-s" @click="gozixun">
					<Titles>
						<template v-slot:nametext>
							资讯
						</template>
					</Titles>
					<div class="gor">
						<p 
						v-for="(item,index) in gor"
						:key="index"
						>
						{{item.mfteTitle}}
						</p>
					</div>
				</div>
			</div>
			<div class="hometopcenter" ref="hometopcenter" style="position: relative;">
				 <img src="@/assets/image/home/road2.gif" class="road2" style="left: 19.8vw;top:18.3vw;">
				 <img src="@/assets/image/home/road3.gif" class="road3" style="left: 2.734vw;top:19.398vw;">
				 <img src="@/assets/image/home/rode44.gif" class="road" style="left:  24.2vw;top: 15.8vw;">
				 <img src="@/assets/image/home/rode33.gif" class="road4" style="left:  43.5vw;top: 14.1vw;">
				 <div
				 v-for="(item,index) in porint"
				 :key="index"
				  @click="pointer(index)" 
				  class="pointer" :style="item.style"
				  :class="{pointer2: item.active}"
				  ></div>
				 <div id="video" class="video" v-if="videoshow">
				     <div style="position: relative;">
				         <img src="@/assets/image/home/del.png" class="del" @click="del()">
				         <div class="cams_content_row_left" id="hik_iframe" style="width: 100%;height: 100%;">
				             <iframe>
							 </iframe>
				         </div>
				     </div>
				 </div>
				 
			</div>
			<div class="hometopright">
				<Hometopright></Hometopright>
			</div>
		</div>
		<div class="home-down maincon">
		  <Homedown></Homedown>
		</div>
	</div>
</template>
<script>
	import Titles from '@/components/slot/Titles.vue'
	import Hometopright from '@/components/home/Hometopright.vue'
	import Homedown from '@/components/home/Homedown.vue'
	import {invest,homnescon,siteinfo,cams,camslist} from '@/utils/home'
	export default {
		name: 'Home',
		components: {
			Titles,
			Hometopright,
			Homedown
		},
		data() {
			return {
				investSum: null,
				investDone: null,
				doneRate: null,
				realtime:'',
				gor:[],
				querydata:[],
				porint:[
					{style:'left: 48.308vw;top:12.356vw;',id:'3',code:'K01884075',active:false,factoryType:"hik"},
					{style:"left: 45.448vw;top:13.708vw;",id:'6',code:'G70326272',active:false,factoryType:"hik"},
					{style:'left: 43.552vw;top:14.748vw;',id:'4',code:'K01884065',active:false,factoryType:"hik"},
					{style:'left: 42.432vw;top:16.1vw;',id:'8',code:'J98083734',active:false,factoryType:"hik"},
					{style:'left: 41.232vw;top:16.1vw;',id:'22',code:'G70326258',active:false,factoryType:"hik"},
					{style:'left: 40.132vw;top:16.1vw;',id:'23',code:'G70326389',active:false,factoryType:"hik"},
					{style:'left: 39.132vw;top:16.1vw;',id:'24',code:'G70326396',active:false,factoryType:"hik"},
					{style:'left: 38.012vw;top:16.212vw;',id:'20',code:'K41796990',active:false,factoryType:"hik"},
					{style:'left: 36.504vw;top:17.824vw;',id:'21',code:'K41796988',active:false,factoryType:"hik"},
					{style:'left: 33.228vw;top:16.688vw;',id:'5',code:'K01884048',active:false,factoryType:"hik"},
					{style:'left: 29.588vw;top:15.284vw;',id:'1',code:'J98083569',active:false,factoryType:"hik"},
					{style:'left: 27.976vw;top:14.812vw;',id:'9',code:'K01884080',active:false,factoryType:"hik"},
					{style:'left: 26.52vw;top:15.024vw;',id:'2',code:'J98083731',active:false,factoryType:"hik"},
					{style:'left: 23.504vw;top:16.844vw;',id:'7',code:'G70326379',active:true,factoryType:"hik"},
				],
				videoshow:false
			}
		},
		mounted() {
			// 投资饼图
			invest().then(res => {
				this.investSum = res.data.items[0].investSum / 10000 / 100;
				this.investDone = res.data.items[0].investDone / 10000 / 100;
				this.doneRate = res.data.items[0].doneRate
				this.$refs.hometopcenter.style.backgroundImage='url('+res.data.items[0].homeImg+')'
				this.echartsInit()
			})
			// 项目介绍
			homnescon().then(res=>{
				this.realtime=res.data.items[0].content.replace(/<[^>]+>/g,"")
				this.querydata=res.data.items
			})
			// 资讯
			siteinfo().then(res=>{
				this.gor=res.items
			})
		},
		methods: {
			pointer(e){
				for(let i =0;i<this.porint.length;i++){
					if(e == i){
						this.porint[i].active=true
					}else{
						this.porint[i].active=false
					}
				}
				cams({
					cameraType:this.porint[e].factoryType, 
					id:this.porint[e].code, //设备编码
					cno:this.porint[e].id,//监控信道id
					}).then(data=>{
						if(data.code == 200){
							this.videoshow=true
								this.$nextTick(()=>{
								document.getElementById("hik_iframe").innerHTML =
									'<iframe src="https://open.ys7.com/ezopen/h5/iframe_se?url=' + data.data.openUrl +
									'&autoplay=1&templete=simple&id=video-container&accessToken=' + data.data.accessToken +
									'"  id="EZUIKitPlayer-video-container" allowfullscreen="true" allow="autoplay" frameborder="0" class="cams_content_row_left_video" style="height:17.5vw; position: relative;top: -2.8vw"></iframe>';
							})
						}else{
							this.$message.error("设备离线")
							this.videoshow=false
						}
						
				}).catch(()=>{
					this.$message.error("请求错误！")
				})
			},
			//初始化echarts
			echartsInit() {
				let linearBar = this.$echarts.getInstanceByDom(this.$refs.mabox); //有的话就获取已有echarts实例的DOM节点。
				if (linearBar == null) { // 如果不存在，就进行初始化。
					linearBar = this.$echarts.init(this.$refs.mabox, null, {devicePixelRatio: 2.5});
				}
				linearBar.setOption({
					tooltip: {
						trigger: 'item'
					},
					color:["#EE2323",'rgb(47,69,84)'],
					series: [{
						name: '',
						type: 'pie',
						radius: ['40%', '60%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 0,
							borderColor: '#fff',
							borderWidth: 0
						},
						label: {
							show: false,
							position: 'center',
								show: true,
								position: 'center',
								color: '#4c4a4a',
								formatter: '{total|' + this.doneRate + '%' +'}'+ '\n\r' + '{active|完成比例}',
								 rich: {
										total:{
											fontSize: 12,
											fontFamily : "微软雅黑",
											color:'#ffffff',
											 lineHeight:24,
										},
										active: {
											fontFamily : "微软雅黑",
											fontSize: 12,
											color:'rgb(170, 170, 170)',
										}
									}
						},
						emphasis: {
							label: {
								show: true,
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: this.doneRate,
								name: '已完成'
							},
							{
								value: 100 - this.doneRate,
								name: '未完成'
							},
						],
					}]
				})
				window.onresize = linearBar.resize;
			},
			// 项目简介
			gorealtime(){
				this.$router.push('/home/projectduction')
			},
			// 资讯
			gozixun(){
				this.$router.push('/news/index')
			},
			// 关闭监控
			del(){
				this.videoshow=false
			}
			
		}
	}
</script>
<style scoped>
	.home {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.bgbox-s {
		width: 18.75vw;
	}
	.home-top{
		display: flex;
		justify-content: space-between;
	}
	.home-topfirst {
		padding: 8px 1.04167vw;
		margin-bottom: -3.5vw;
		position: relative;
		width: 100%;
		height: 8vw;
	}
	.texttip {
		line-height: 1.23vw;
		height: 0.83333vw;
		/* margin-bottom: 0.625vw; */
		font-size: 12px;
		color: white;
		width: 100%;
	}
	.numpet {
		font-size: 1.25vw;
		font-weight: 700;
		color: rgb(255, 202, 24);
		line-height: 1.23vw;
		display: block;
		margin:0.4vw 0;
	}
	.numsum {
		font-weight: 700;
		font-size: 1.25vw;
		color: rgb(84, 246, 255);
		line-height: 1.23vw;
		display: block;
		margin:0.4vw 0;
	}
	.hometopcenter{
		width: 57.2917vw;
		height: 31.1vw;
		background-size: 100% 100%;
	}
	.hometopleft{
		width: 18.75vw;
		flex-direction: column;
	}
	.textcom{
		padding: 1vw;
		box-sizing: border-box;
		font-size: 0.7292vw;
		line-height: 1.1353vw;
		color: rgb(0, 207, 255);
		height: 6.4vw;
		overflow-y: hidden;
		white-space: normal;
		text-overflow: ellipsis;
		cursor: pointer;
		display: -webkit-box;
	  -webkit-line-clamp: 5;
	  -webkit-box-orient: vertical;
	  margin-bottom: -25px;
	  padding-top: 10px;
	}
	.gor{
		padding: 10px  1.04167vw 0 1.04167vw;
		margin-bottom: -15px;
		height: 5vw;
		overflow: hidden;
	}
	.gor p{
		font-size: 0.7292vw;
		line-height: 1.6vw;
		color: rgb(0, 207, 255);
		border-bottom: 1px dashed rgb(53, 99, 161);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.hometopright{
		width: 18.75vw;
		height: 31vw;
		overflow-y: scroll;
	}
	.hometopright::-webkit-scrollbar {
	    display: none; /* Chrome Safari */
	}
	.home-topfirstechart{
		width: 8vw;
		height: 8vw;
		position: absolute;
		right: 3vw;
		top: -1vw;
	}
	
	
	.road2{
	    width: 4.7vw;
		height: 6vw;
	    position: absolute;
	    left: 20vw;
	    top: 17.8vw;
		-webkit-transform: rotate(-1deg);
		transform:rotate(-1deg);
	}
	.road3{
		-webkit-transform: rotate(4deg);
		transform:rotate(4deg);
	    width: 8.81666666vw;
	    position: absolute;
	    left: 2.7vw;
	    top: 19.48vw
	}
	.road4{
		width: 5.5vw;
		position: absolute;
		-webkit-transform: rotate(4deg);
		transform:rotate(4deg);
	}
	.road{
	    width: 19vw;
	    position: absolute;
	    left: 24vw;
	    top: 13.2vw;
	}
	.pointer{
	    position: absolute;
	    width:1.472vw;
	    height:2.2vw;;
	    background: url("~@/assets/image/home/point.png") no-repeat;
	    background-size: 1.472vw;
	    cursor: pointer;
	    
	}
	.pointer::after{
	    content: '';
	    width: 2vw;
	    height: 2vw;
	    display: block;
	    background: url("~@/assets/image/home/point-bg.png") no-repeat;
	    background-size: 2vw auto;
	    position: relative;
	    left: -0.25vw;
	    top: 0.5vw;
	}
	.pointer2{
	    position: absolute;
	    width:1.872vw;
	    height:2.2vw;;
	    background: url("~@/assets/image/home/point1.png") no-repeat;
	    background-size: 1.472vw;
	    cursor: pointer;
	    
	}
	.pointer2::after{
	    content: '';
	    width: 2vw;
	    height: 2vw;
	    display: block;
	    background: url("~@/assets/image/home/point-bg2.png") no-repeat; 
	    background-size: 2vw auto;
	    left: -0.25vw;
	    top: 0.5vw;
	}
	.cams_content_row_left_video{
	    width:100%;
	    height:100%;
	    padding:5px;
	}
	.del{
	    position: absolute;
	    right: 0vw;
	    top:0vw;
	    width: 1.2vw;
	    height: 1.2vw;;
	    z-index: 9999;
	}
	.video{
	    width: 18.408vw;
	    height: 12.272vw;
	    position: absolute;
	    left:1vw;
	    top: 1vw;
	    border: 0.1vw solid #52CCFF;
	    background: #999;
	    overflow: hidden;
	}
	.video iframe{
	    width: 100%;
	    height: 14vw !important;
	    position: relative;
	    top: -30vw;
	}
</style>
