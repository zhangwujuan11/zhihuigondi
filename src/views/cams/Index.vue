<template>
	<div class="page-main" id="homeId">
		<div class="row cams_content_row">
			<div style="flex: 1;">
				<div class="cams_content_row_left" id="hik_iframe">
					<iframe ref='EZUIKitPlayer-video-container' id="EZUIKitPlayer-video-container" :src="open_url"
						allowfullscreen="true" allow="autoplay" frameborder="0"
						class="cams_content_row_left_video"></iframe>
				</div>
			</div>
			<div style="width: 300px;">
				<div class="row cams_content_row_right" style="margin-bottom:0px">
					<div class="cams_content_row_right_1 default_div">
						<input type="text" class="form-control" v-model="deviceSerial" id="deviceSerial"
							style="display:none">
						<div id="myTab" class="nav nav-tabs party-nav-tab" style="padding: 10px;">
							<p class="active" id="tabItem1">视频监控</p>
							<div class="row cam_list" style="overflow-x:hidden;">
								<div class="camslistbox" v-for="(item,index) in list">
									<div name="all_button" :id="'choose_'+item.id" style="cursor:pointer;height:auto;"
										@click="queryCamList('1',index)">
										<img style="height:80px;"
											src="https://statics.ys7.com/device/assets/imgs/public/homeDevice.jpeg"
											alt="" class="cams_cover">
										<div v-if="item.status == 1" class="cams_online"></div>
										<div v-else class="cams_offline"></div>
										<h5 style="width:100%;overflow:hidden;color:#fff;padding:0;height: 20px;">
											{{item.ayName}}</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
					<i class="namei" v-for="num in 3" :key="num"></i>
					<div class="row cams_content_row_right_2" id="camsDirectionPanel"
						:class="{'active':isActive,'error':!isActive}"
						@mouseup="Device_PTZ(100)" @click="Device_PTZ(100)"
						>
						<div class="container default_div" style="width:100%;height:100%">
							<div class="row" style="width:100%;height:33.33%">
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_1"
									@mousedown="Device_PTZ(4)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_2"
									@mousedown="Device_PTZ(0)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_3"
									@mousedown="Device_PTZ(6)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_add cams_content_row_right_2_arrow"
									@mousedown="Device_PTZ(10)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_text">
									<h5>变焦</h5>
								</div>
								<div class="cams_content_row_right_2_minu cams_content_row_right_2_arrow"
									@mousedown="Device_PTZ(11)" @mouseup="Device_PTZ(100)"></div>
							</div>
							<div class="row" style="width:100%;height:33.33%">
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_4"
									@mousedown="Device_PTZ(2)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_text" @mousedown="Device_PTZ(100)">
									<h5>停止</h5>
								</div>
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_5"
									@mousedown="Device_PTZ(3)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_add" @mousedown="Device_PTZ(8)"></div>
								<div class="cams_content_row_right_2_text">
									<h5>变倍</h5>
								</div>
								<div class="cams_content_row_right_2_minu" @mousedown="Device_PTZ(9)"></div>
							</div>
							<div class="row" style="width:100%;height:33.33%">
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_6"
									@mousedown="Device_PTZ(4)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_7"
									@mousedown="Device_PTZ(1)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_arrow cams_content_row_right_2_8"
									@mousedown="Device_PTZ(7)" @mouseup="Device_PTZ(100)"></div>
								<div class="cams_content_row_right_2_list">
									<select v-model="device_index" class="form-control" id="device_index">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
										<option value="13">13</option>
										<option value="14">14</option>
										<option value="15">15</option>
										<option value="16">16</option>
										<option value="17">17</option>
										<option value="18">18</option>
										<option value="19">19</option>
										<option value="20">20</option>
									</select>
								</div>
								<div class="cams_content_row_right_2_text" @click="device_preset()">
									<h5>预置点</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {cams,change_cam,camsgetlist,Device,statuscon} from '@/utils/cams'
	import { Loading } from 'element-ui';
	import '@/assets/cams/SCWS.cams.live.js'
	import '@/assets/cams/SCWS.base.css'
	import '@/assets/cams/SCWS.cams.live.css'
	export default {
		name: '',
		data() {
			return {
				isActive: true,
				device_index: null,
				deviceSerial: '',
				open_url: '',
				accessToken: '',
				actionCarmarId: null,
				CNO: '',
				factoryType:'',
				timer: null, // 定时器名称        
				list:[]
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.queryCamList('1', 0)
			})
			
			// 监听页面是否操作
			var count = 0;
			var outTime = 5; //分钟
			this.timer = window.setInterval(() => {
				count++;
				if (count == outTime * 60) {
					document.getElementById('homeId').remove();
					alert("长时间未操作页面，已为您停播，请重新加载");
					location.reload();
				}
			}, 1000)
			var x;
			var y;
			//监听鼠标
			document.getElementById('homeId').onmousemove = function(event) {
				var x1 = event.clientX;
				var y1 = event.clientY;
				if (x != x1 || y != y1) {
					count = 0;
				}
				x = x1;
				y = y1;
			};
			//监听键盘
			document.getElementById('homeId').onkeydown = function() {
				count = 0;
			};
		},
		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
		},
		methods: {
			//加载
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
			//
			device_preset() {
				let obj = {
					index: this.device_index,
					deviceSerial: this.actionCarmarId
				}
				camsgetlist(JSON.stringify(obj)).then(res => {
					let LoginSuccess = res.success
					if (LoginMessages != '1') {
						this.$message.error(res.Return_Message);
					} else {}
				})
			},
			show() {
				this.isActive = false
				let player = document.getElementById('EZUIKitPlayer-video-container')
				player.contentWindow.postMessage("closeSound", this.open_url) /* 关闭声音 */
			},
			queryCamList(type, index) {
				this.starVideotLoading()
				cams(type).then(data => {
					if(data.items){
						this.list = data.items
						this.factoryType=data.items[index].factoryType,
						this.actionCarmarId=data.items[index].aySerNo
						if (type == '1' && data.total > 0) {
							change_cam({
								id:data.items[index].aySerNo,
								cameraType:data.items[index].factoryType,
								cno: data.items[index].cno
							}).then(res => {
								this.CNO=data.items[index].cno
								this.endVideoLoading() 
								if (res.code != 200) {
									 this.$message.error(res.data.detail)
								}else{
									let open_url = res.data.openUrl;
									if(open_url){
									  var urlList = open_url.split('/')
									  urlList[urlList.length-1] = data.items[index].cno+'.hd.live'
									 this.open_url = urlList.join('/')
									}
									
									document.getElementById("hik_iframe").innerHTML =
										'<iframe src="https://open.ys7.com/ezopen/h5/iframe_se?url=' +  this.open_url + '&autoplay=1&templete=0&id=video-container&accessToken=' + res
										.data.accessToken +
										'"  id="EZUIKitPlayer-video-container" allowfullscreen="true" allow="autoplay" frameborder="0" class="cams_content_row_left_video"></iframe>';
									this.accessToken = res.data.accessToken;
									
									
								}
							})
							this.isonline()
						}
					}else{
						this.endVideoLoading() 
						this.$message.warning('无监控')
					}
				})
			},
			
			// // 状态
			isonline(){
				for(let i=0;i<this.list.length;i++){
					statuscon({
						cameraType:this.list[i].factoryType,
						cno:this.list[i].cno,
						driver:this.list[i].aySerNo,
					}).then(pon=>{
						this.list[i].status=pon.data.status
					})
				}
			},
			
			
			Device_PTZ(direction) {
				Device({
					id: this.actionCarmarId,
					direction: direction,
					cno: this.CNO,
					cameraType:this.factoryType
				}).then(res => {
					if(res.code!==200){
					  	console.log(res.data.detail);
					}
				})
			}
		},
	}
</script>

<style scoped>
	.error {
		display: block;
	}

	#tabItem1 {
		background: linear-gradient(180deg, rgba(3, 87, 176, 0) 0%, rgba(61, 159, 207, 0.7) 100%);
		border-radius: 4px;
		border: 1px solid #52CCFF;
		cursor: pointer;
		color: white;
		padding: 5px 8px;
		box-sizing: border-box;
		width: 100px;
		text-align: center;
	}

	.cam_list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.namei{
		width: 45%;
	}

	.cam_list .camslistbox {
		width: 45%;
		padding: 0;
		margin: 10px 0;
	}
	.cams_content_row .cams_content_row_right_1{
		overflow-y: scroll;
		overflow: -moz-scrollbars-none;
	}
	.cams_content_row .cams_content_row_right_1::-webkit-scrollbar { width: 0!important }
</style>
