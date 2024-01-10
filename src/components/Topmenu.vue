<template>
	<div class="topmenu">
		<!-- 消息加username -->
		<div class="menutop">
			<div class="to-index" @click="gohome()"></div>
			<div class="forright">
				<!-- 消息 -->
				<div class="line" @click="gotopnews()"><span id="newstatol">{{tatol | tatl}}</span></div>
				<!-- username -->
				<el-dropdown>
					<span class="el-dropdown-link">
						{{username}}<i class="el-icon-caret-bottom"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
						<el-dropdown-item @click.native="gocPwd">修改密码</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="btnbox">
				<button v-for="(item,index) in menList" :key="index" @click="linkTo(item.url)"
				:class="{tets: item.active,hasnone:item.pass}">{{item.tiele}}</button>
				<!-- 综合按钮 -->
				<el-menu
				class="el-menu-demo" 
				mode="horizontal" 
				@select="handleSelect"
				active-text-color="#00FFFF"
				router
				>
					<el-submenu index="eatOut">
						<template slot="title">综合管理</template>
						<el-menu-item v-for="(item,index) in options" :key="index" :index="item.url" @click="vto(item.tiele)">{{item.tiele}}
						</el-menu-item>
					</el-submenu>
				</el-menu>
		</div>
	</div>
</template>

<script>
	// localstorage深度监听
	import Vue from 'vue'
	import tool from "@/utils/tool";
	Vue.use(tool);
	export default {
		inject:["reload"],
		filters:{
			tatl(e){
				if(e <= 99){
					return e
				}else if(e > 99){
					return "99+"
				}
			}
		},
		data() {
			return {
				menList: [{
							tiele: "工地党建",
							url: "/home/partybuild",
							active: false
						},
						{
							tiele: "工地资讯",
							url: "/news/index",
							active: false
						},
						// {
						// 	tiele: "BIM中心",
						// 	url: "/bim/index",
						// 	active: false
						// },
						{
							tiele: "人脸考勤",
							url: "/synthesize/faceAttendance/index",
							active: false
						},
						{
							tiele: "智能监控",
							url: "/cams",
							active: false
						},
						{
							tiele: "航拍视频",
							url: "/uavideo",
							active: false
						},
						{
							pass:"分割"
						},
						{
							tiele: "检查整改",
							url: "/rectify/index",
							active: false
						},
						{
							tiele: "质量安全",
							url: "/safe/index",
							active: false
						},
						{
							tiele: "文档管理",
							url: "/document",
							active: false
						},
						{
							tiele: "智慧梁场",
							url: "management/management_file_content",
							active: false
						}
					],
				options: [{
						tiele: "项目简介",
						url: "/home/projectduction"
					},
					// {//
					// 	tiele: "水泥搅拌桩",
						
					// },{//
					// 	tiele: "大数据防疫监管中心",
						
					// },
					// {
					// 	tiele: "气象数据管理",
					// 	url: "/synthesize/weather/index"
					// },
					{
						tiele: "农民工管理",
						url: "/synthesize/team/index?type=1"
					},
					{
						tiele: "农民工工资",
						url: "/synthesize/team/index?type=0"
					},
					{
						tiele: "项目成员管理",
						url: "/synthesize/project/management"
					},
					{
						tiele: "项目成员工资",
						url: "/synthesize/project/wages"
					},
					// {
					// 	tiele: "人脸考勤记录",
					// 	url: "/synthesize/faceAttendance/index",
					// },
					// {
					// 	tiele: "分包商设备台账",
					// 	url: "/synthesize/subcontractor/index"
					// },
					// {
					// 	tiele: "物料进出记录表",
					// 	url: "/synthesize/assets/index"
					// },
					{
						tiele: "考勤管理",
						url: "/synthesize/antiepidemic/index"
					},
					// {
					// 	tiele: "项目物资统计表",
					// 	url: "/synthesize/material/index"
					// },
					// {
					// 	tiele: "拌合站试验",
					// 	url: "/synthesize/cement/index"
					// },
					{
						tiele: "混凝土抗压试验",
						url: "/synthesize/experiment/concreteteam"
					},
					{
						tiele: "钢筋弯伸拉曲试验",
						url: "/synthesize/experiment/rebarteam"
					},
					{
						tiele: "实时拌合站",
						url: "/synthesize/stirStation/index"
					}
					// {
					// 	tiele: "超声基桩桥梁检测",
					// 	url: "/synthesize/ultrasonic/index"
					// },
					// {
					// 	tiele: "梁片管理",
					// 	url: "/synthesize/bridge/index"
					// },
					// {
					// 	tiele: "智能喷淋",
					// 	url: "/synthesize/getspray/index"
					// },
					// {//上杭
					// 	tiele: "智慧张拉",
					// 	url: "/synthesize/smart/index"
					// }
				],
				tatol:localStorage.getItem('newstotal'),
				username:localStorage.getItem('username'),
				svt:'http://192.168.110.39:8081',
				ishow:false
			}
		},
		mounted() {
			let that=this
			window.addEventListener("setItemEvent",function(e){
			    if(e.key==="username"){
					that.$nextTick(()=>{
						 that.username=e.newValue
					})
			    }
			})
			window.addEventListener("setItemEvent",function(e){
			    if(e.key=="newstotal"){
					that.$nextTick(()=>{
						that.tatol=e.newValue;
					})
			    }
			})
		},
		methods: {
			linkTo(to) {
				if(to == 'management/management_file_content'){
					
					let value=localStorage.getItem('tocken')
					document.cookie = "usertoken=" + value
					window.open('http://gt.starhope.net/pc')
					// window.open('https://test.ayingtech.com/pc')
				}else{
					this.ishow=false
					 this.$router.push(to)
				}
			},
			
			
			setCookie(c_name, c_pwd, exdays) {
			      let exdate = new Date(); //获取时间
			      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
			      //字符串拼接cookie
			      window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
			      window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
			},
				
				
			
			vto(to){
				if(to == "水泥搅拌桩"){
					window.open('https://www.hskj51.com/login','_blank')
					
				}else if(to == '大数据防疫监管中心'){
					window.open('https://org.nebulabd.cn/#/home','_blank')
				}
			},
			handleSelect(key, keyPath) {
				for (let g = 0; g < this.menList.length; g++) {
					this.menList[g].active = false
				}
			},
			gohome(){
				this.$router.push('/home')
			},
			gocPwd(){
				this.$router.push('/resetpwd')
			},
			loginout(){
				localStorage.clear()
				this.$router.push('/login')
				this.username=''
			},
			gotopnews(){
				this.$router.push('/topnews')
			}
		},
		watch:{
			$route(val){
				let thispath=val.path
				for(let i=0;i<this.menList.length;i++){
					if(thispath.includes(this.menList[i].url)){
						this.menList[i].active=true
						// 综合管理按钮
						let taole = document.getElementsByClassName("el-submenu")
						taole[0].setAttribute("class", "el-submenu");
					}else{
						this.menList[i].active=false
					}
				}
			},
		}
	}
</script>

<style scoped>
	.topmenu {
		background: url("~@/assets/image/menu-bg.png")top center no-repeat;
		background-size: 100vw auto;
		height: 5.3292vw;
	}

	.goback {
		margin-left: 15px;
		color: #619fcf;
	}

	.btnbox {
		display: flex;
		justify-content: space-between;
		padding: 0 1.45833vw;
		box-sizing: border-box;
	}

	.btnbox div {
		width: 37%;
		display: flex;
		justify-content: space-between;
	}
	.btnbox button,
	.btnbox .el-select {
		width: 6.770833vw;
		height: 2.083333vw;
		line-height: 1.875vw;
		display: inline-block;
		border: 0.1041666vw solid rgba(0, 69, 149, 1);
		text-align: center;
		border-radius: 1.458333vw;
		margin-right: 0.582333vw;
		cursor: pointer;
		font-size: 0.9375vw;
		color: #0081A6;
		background-color: transparent;
	}

	.menutop {
		height: 2.6042vw;
		display: flex;
		justify-content: right;
	}
	.tets {
		background: url("~@/assets/image/menu-btn-bg.png") no-repeat !important;
		background-size: 100% 100% !important;
		color: #00FFFF !important;
		border: none !important;
	}
	/* 消息username */
	.forright {
		height: 100%;
		width: 180px;
		margin-right: 1.45833vw;
		display: flex;
		align-items: center;
	}
	.el-dropdown-link , .el-dropdown-link i{
		color:  #0081A6;
	}
	.line {
		width: 35%;
		height: 14px;
		background-image: url("~@/assets/image/noice.png");
		background-repeat: no-repeat;
		background-size: 13px 16px;
		background-position: center;
		border-right: 2px solid rgba(33, 102, 128, 1);
		position: relative;
		cursor: pointer;
	}

	.line span {
		display: block;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: #EA0802;
		position: absolute;
		top: -6px;
		right: 26%;
		color: #fff;
		font-size: 10px;
		text-align: center;
		line-height: 14px;
	}
	/deep/.el-dropdown {
		width: 65%;
		display: flex;
		color: #0081A6;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.el-dropdown-menu {
		background-color: #004086;
		opacity: 0.9;
		border: none;
	}
	.el-dropdown-menu__item {
		color: white;
	}
	.el-popper /deep/ .popper__arrow {
		border-bottom-color: #1EBEF4 !important;
		left: 50% !important;
		visibility: hidden;
	}

	/*  */
	/deep/.el-menu.el-menu--horizontal {
		border: none;
	}
	/deep/.el-menu--horizontal>.el-submenu .el-submenu__title {
		height: 100% !important;
		width: 6.770833vw;
		font-size: 0.9375vw;
		line-height: 2.083333vw !important;
		color: #0081A6 !important;
		border: 0.1041666vw solid rgba(0, 69, 149, 1) !important;
		border-radius: 1.458333vw;
		text-align: center;
		padding: 0;
		box-sizing: border-box;
	}
	/deep/.el-submenu__title i {
		color: #0081A6;
	}
	.el-menu {
		background-color: transparent;
	}
	/deep/.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
		background: transparent;
	}
	.el-menu .el-menu-item:hover{
		color:  #00FFFF !important;
	}
	/deep/.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
		background: url("~@/assets/image/menu-btn-bg.png") no-repeat !important;
		background-size: 100% 100% !important;
		color: #00FFFF !important;
		border-color: transparent !important;
	}
	.to-index {
	    height: 3.4042vw;
	    width: 24vw;
	    left: 38vw;
	    top: 0;
	    position: absolute;
	    cursor: pointer;
		}
	.hasnone{
		width: 24vw !important;
		border: none !important;
	}
</style>
