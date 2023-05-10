<template>
	<div class="progress">
		<div class="serchbox">
			<span>构件列表</span>
			<el-input v-model="input" class="serinput">
				 <el-select style="width: 100px;" v-model="select" slot="prepend" placeholder="构建类型">
				      <el-option label="桩" value="stake"></el-option>
				      <el-option label="桥墩" value="pier"></el-option>
					  <el-option label="梁" value="bridge"></el-option>
					  <el-option label="桥面板" value="panel"></el-option>
					  <el-option label="护栏" value="guardBar"></el-option>
					  <el-option label="道路线" value="way"></el-option>
					  <el-option label="路灯" value="light"></el-option>
				      <el-option label="其他" value="other"></el-option>
				    </el-select>
			</el-input>
			<el-button class="serbtn" @click="gojian()">搜索</el-button>
		</div>
		<ul class="proul">
			<li 
			v-for="(item,index) in datalist"
			:key="index"
			@click="proulli(item)"
			>
				<p class="proultitle">{{item.elementName}}</p>
				<span class="list-detail-end-time" v-if="item.endDate == null">完成时间：未计划</span>
				<span class="list-detail-end-time" v-else>完成时间：{{item.endDate | endDate}}</span>
				<p class="gray-font">
					状态：<el-button type="success" size="mini" v-if="item.status == 101003">已完成</el-button>
					<el-button type="primary" size="mini" v-if="item.status == 101002">建设中</el-button>
					<el-button type="info" size="mini" v-if="item.status == 101001">未完成</el-button>
				</p>
				<div style="display: flex;">
					<div class="col-xs-4">
						<div class="ele-detail-panel-top seq-1-top">{{item.sequence}}</div>
						<div class="ele-detail-panel-bottom seq-1-bottom">顺序</div>
					</div>
					<div class="col-xs-4">
						<div class="ele-detail-panel-top seq-2-top">{{item.elementType |elementType}}</div>
						<div class="ele-detail-panel-bottom seq-2-bottom">类型</div>
					</div>
					<div class="col-xs-4">
						<div class="ele-detail-panel-top seq-3-top">{{item.position}}</div>
						<div class="ele-detail-panel-bottom seq-3-bottom">位置</div>
					</div>
				</div>
				<p style="text-align: center;" v-if="item.elementType == 'stake'">
					<el-button type="primary" size="mini">桩检数据</el-button>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import {elementName} from "@/utils/bim.js"
	import { Loading } from 'element-ui';
	export default{
		inject: ["reload"],
		props:['list','dlirelode'],
		data() {
			return{
				input:'',
				datalist:this.list,
				select:''
			}
		},
		filters:{
			endDate(e){
				 var time = new Date(e);
				
				      function timeAdd0(str) {
				        if (str < 10) {
				          str = '0' + str;
				        }
				        return str
				      }
				      var y = time.getFullYear();
				      var m = time.getMonth() + 1;
				      var d = time.getDate();
				      var h = time.getHours();
				      var mm = time.getMinutes();
				      var s = time.getSeconds();
				      return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) 
			},
			elementType(e){
				if(e=='stake'){
					return '桩'
				}else if(e=='pier'){
					return '桥墩'
				}else if(e=='bridge'){
					return '梁'
				}else if(e=='panel'){
					return '桥面板'
				}else if(e=='guardBar'){
					return '护栏'
				}else if(e=='way'){
					return '道路线'
				}else if(e=='light'){
					return '路灯'
				}else if(e=='other'){
					return '其他'
				}
			}
		},
		mounted(){
		},
		methods:{
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
			// 搜索框
			gojian(){
				this.starVideotLoading()
				elementName({
					limit: 10000,
					offset: 0,
					elementName:this.input,
					type:this.select
				}).then(res=>{
					this.datalist=res.data.items
					this.endVideoLoading() 
				})
			},
			proulli(i){
				this.$emit('sondata',i)
			}
		},
		watch:{
			dlirelode(val){
				this.gojian()
			}
		}
	}
</script>

<style scoped>
	.serchbox{
		display: flex;
		width: 600px;
		align-items: center;
		height: 34px;
		position: fixed;
		top: 120px;
	}
	.serchbox span{
		font-size: 24px;
	}
	.serchbox .el-input{
		height: auto;
		font-size: 14px;
		line-height: 1.428571429;
		color: #555;
		vertical-align: middle;
		background-color: #fff;
		background-image: none;
		border:0;
		border-radius: 4px;
		width: 220px;
		margin-left: 30px;
	}
	.el-input__inner{
		padding: 0;
		border: 0;
		height: 34px;
	}
	.proultitle{
		overflow: hidden;
		word-wrap: break-word;
		height: 20px;
		color: #0252AD;
		font-size: 14PX;
	}
	.gray-font{
		color: grey;
		    font-size: 10px;
	}
	.serbtn{
		color: #fff;
		    background-color: #5bc0de;
		    border-color: #46b8da;
			padding: 9px 20px;
			margin-left: 15px;
	}
	.progress{
		padding:0 10px 10px 10px;
		box-sizing: border-box;
		 
	}
	.proul{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.proul li{
		width:30%;
		border-radius: 5px;
		background: #ebebeb;
		color: #2C58A6;
		padding: 5px;
		min-height: 140px;
		border: 2px solid #D7D7D7;
	}
	.col-xs-4 {
    width: 33.33333333333333%;
	padding: 5px;
}
.list-detail-end-time{
	display: inline-block;
	color: #a5a5a5;
	font-size: 10px;
}
.seq-1-top {
    background-image: linear-gradient(90deg, rgb(153, 201, 246), rgb(18, 119, 196));
    opacity: 0.6;
    font-size: 12px;
    box-shadow: -7px -7px 20px 0px #ffffff, -4px -4px 5px 0px #ffffff, 7px 7px 10px 0px #AAA9A9;
}
.ele-detail-panel-top {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    margin-bottom: 0px;
    height: 25px;
    display: block;
    background-color: #0dd8df;
    color: #f0f0f0;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 1px #89caff;
    top: 30%;
	font-weight: normal;
}
.ele-detail-panel-bottom {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    margin-bottom: 0px;
    height: 15px;
    font-size: 9px;
    display: block;
    background-color: #999999;
    opacity: 0.9;
    text-align: center;
    color: #f0f0f0;
    box-shadow: 7px 7px 10px 0px #BBBBBD, 4px 4px 5px 0px #aaa9a9;
}
.seq-2-top {
    background-image: linear-gradient(90deg, rgb(18, 119, 196), rgb(23, 154, 255));
    opacity: 0.6;
    font-size: 12px;
    box-shadow: -7px -7px 20px 0px #ffffff, -4px -4px 5px 0px #ffffff, 7px 7px 10px 0px #AAA9A9;
}
.seq-3-top {
    background-image: linear-gradient(90deg, rgb(23, 154, 255), rgb(20, 136, 224));
    opacity: 0.6;
    font-size: 12px;
    box-shadow: -7px -7px 20px 0px #ffffff, -4px -4px 5px 0px #ffffff, 7px 7px 10px 0px #AAA9A9;
}
/deep/.serinput .el-input__inner{
	width: 100%;
	padding: 0 10px 0 5px;
	text-align: center;
}
</style>