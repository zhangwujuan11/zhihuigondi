<template>
	<div class="safe">
		<div class="maincon safebox">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="质量整改" name="first">
					<ul class="con">
						<li 
						v-for="(item,index) in lidatas"
						:key="index"
						@click="liclick(item)"
						>
							<p class="title">{{item.title}}</p>
							<p>
								<span>{{item.createTime | time}}</span>
								<span type="primary" size="small" class="submi">{{item.statusDesc}}</span>
							</p>
							<img v-if="!item.cover" src="@/assets/image/cams/uav_default.jpg" alt="">
							<img v-if="item.cover" :src="item.cover" alt="">
						</li>
						<!-- 分页 -->
						<el-pagination
						style="width: 100%;"
						  background
						  v-if="total > 4"
						  @current-change="whatepage"
						  :current-page.sync="currentPage"
						  layout="prev, pager, next, jumper"
						  :page-size="4"
						  :total="total">
						</el-pagination>
					</ul>
					<div class="saferight">
						<div class="bgbox-s" style="height: 17vw;">
							<Titles>
								<template v-slot:nametext>
									类型分析
								</template>
							</Titles>
							<div ref="chartthree" style="height:17vw;width: 23vw;"></div>
						</div>
						<div class="bgbox-s" style="height: 17vw;">
							<Titles>
								<template v-slot:nametext>
									责任人分析
								</template>
							</Titles>
							<div ref="chartfour"  style="height:17vw;width: 23vw;"></div>
						</div>
						
						<div class="bgbox-m" style="margin-top:6vw">
							<Titles>
								<template v-slot:nametext>
									趋势分析
								</template>
							</Titles>
							<div ref="chart"  style="height:200px;width: 47vw;"></div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="安全整改" name="second">
					<ul class="con">
						<li 
						v-for="(item,index) in lidatas"
						:key="index"
						@click="liclick(item)"
						>
							<p class="title">{{item.title}}</p>
							<p>
								<span>{{item.createTime | time}}</span>
								<span type="primary" size="small" class="submi">{{item.statusDesc}}</span>
							</p>
							<img v-if="!item.cover" src="@/assets/image/cams/uav_default.jpg" alt="">
							<img v-if="item.cover" :src="item.cover" alt="">
						</li>
						<!-- 分页 -->
						<el-pagination
						style="width: 100%;"
						  background
						  v-if="total > 4"
						  @current-change="whatepage"
						  :current-page.sync="currentPage"
						  layout="prev, pager, next, jumper"
						  :page-size="4"
						  :total="total">
						</el-pagination>
					</ul>
					<div class="saferight">
						<div class="bgbox-m" style="margin-top: 20px;height:15vw;">
							<Titles>
								<template v-slot:nametext>
									类型分析
								</template>
							</Titles>
							<div ref="echarttotop" style="height:15vw;width: 45vw;"></div>
						</div>
						<div class="bgbox-m" style="margin-top:6vw;height:15vw;">
							<Titles>
								<template v-slot:nametext>
									趋势分析
								</template>
							</Titles>
							<div ref="echartto"  style="height:15vw;width: 47vw;"></div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<Showdilog :havedatainfo="havedatainfo"></Showdilog>
	</div>
</template>

<script>
	import {userRelatedList, statAmountByMonth, echartone, zeren} from "@/utils/uavideo"
	import Titles from '@/components/slot/Titles.vue'
	import Showdilog from '@/components/safe/Showdilog.vue'
	export default {
		components:{
			Titles,
			Showdilog
		},
		filters:{
			time(e){
			  const dt = new Date(e)
			  const y = dt.getFullYear()
			  //月份不足两位用0补齐
			  const m = (dt.getMonth() + 1 +'').padStart(2,'0')
			  const d = (dt.getDay() + '').padStart(2,'0')
			  const hh = (dt.getHours() + '').padStart(2,'0')
			  const mm = (dt.getMinutes() + '').padStart(2,'0')
			  const ss = (dt.getSeconds()+ '').padStart(2,'0')
			  return `${y}-${m}-${d} `
			}
		},
		data() {
			return {
				activeName: 'first',
				lidatas:[],
				total:null,
				currentPage:1,
				indx:'',
				charts: "",
				opinionData: [],
				havedatainfo:null
			}
		},
		mounted() {
			userRelatedList({
				limit:4,
				offset:0,
				dataType:1
			}).then(res=>{
				this.lidatas=res.data.items
				this.total=res.data.total
			})
			this.$nextTick(()=>{
				echartone({dataType:1}).then(res=>{
					this.echartsInit(res.data,this.$refs.chartthree)
				})
				
				zeren({dataType:1}).then(res=>{
					this.echartsInit(res.data,this.$refs.chartfour)
				})
				
				statAmountByMonth({dataType:1}).then(res=>{
					this.drawLine(this.$refs.chart,res.data.xaxis,res.data.yaxis);
				})
			})
			
		},
		methods:{
			// 
			liclick(i){
				this.havedatainfo=i
				this.$store.state.safedilog=true
			},
			handleClick(event) {
				console.log(this.total)
				this.indx=event.index
				userRelatedList({
					limit:4,
					offset:0,
					dataType:Number(this.indx) + 1
				}).then(res=>{
					this.lidatas=res.data.items
					this.total=res.data.total
					this.currentPage=1
				})
				if(event.index == '0'){
					echartone({dataType:1}).then(res=>{
						this.echartsInit(res.data,this.$refs.chartthree)
					})
					zeren({dataType:1}).then(res=>{
						this.echartsInit(res.data,this.$refs.chartfour)
					})
					statAmountByMonth({dataType:1}).then(res=>{
						this.drawLine(this.$refs.chart,res.data.xaxis,res.data.yaxis);
					})
				}else{
					statAmountByMonth({dataType:2}).then(res=>{
						this.drawLine(this.$refs.echartto,res.data.xaxis,res.data.yaxis);
					})
					
					echartone({dataType:2}).then(res=>{
						this.echartsInit(res.data,this.$refs.echarttotop)
					})
				}
			},
			// 翻页
			whatepage(val){
				userRelatedList({
					limit:4,
					offset:4 * (val - 1),
					dataType:Number(this.indx) + 1
				}).then(res=>{
					this.lidatas=res.data.items
					this.total=res.data.total
				})
			},
			// 柱状图初始化
			echartsInit(data,box) {
				let linearBar = this.$echarts.getInstanceByDom(box); //有的话就获取已有echarts实例的DOM节点。
				if (linearBar == null) { // 如果不存在，就进行初始化。
					linearBar = this.$echarts.init(box, null, {devicePixelRatio: 2.5});
				}
				var series = []
				var index = 0;
				for (var key in data.yaxisSeries) {
				    var color = ["#009efd", "#FFB140"]
				    var dataItem = {
				        data: data.yaxisSeries[key],
				        type: 'bar',
				        barWidth: '50%',
				        name: '',
				        itemStyle: {
				                color: color[index],
				        },
						showBackground: true,
						lineStyle: {
							type: 'dashed'
						}
				    }
				    series.push(dataItem)
				    index++
				}
				linearBar.setOption({
					backgroundColor: '', //设置无背景色
					title: [],
					tooltip: {
					    trigger: 'axis',
					    axisPointer: {
					        type: 'shadow'
					    }
					},
					xAxis: {
					    type: 'category',
					    data: data.xaxis,
					    axisLabel: {
					        color: '#fff',
					        fontSize: '10px',
					        interval: 0,
					        rotate: "60",
					        formatter: function (value)  //X轴的内容
					        {
					            var ret = ""; //拼接加\n返回的类目项
					            var max = 8;  //每行显示的文字字数
					            var val = value.length;  //X轴内容的文字字数
					            var rowN = Math.ceil(val / max);  //需要换的行数
					            if (rowN > 1)  //判断 如果字数大于2就换行
					            {
					                for (var i = 0; i < rowN; i++) {
					                    var temp = "";  //每次截取的字符串
					                    var start = i * max;  //开始截取的位置
					                    var end = start + max;  //结束截取的位置
					                    temp = value.substring(start, end) + "\n";
					                    ret += temp;  //最终的字符串
					                }
					                return ret;
					            }
					            else { return value }
					        },
					    },
					    axisLine: {
					        lineStyle: {
					            type: 'solid',
					            color: '#ccc',
					        }
					    },
					},
					grid: {
					    top: '18%',
					    right: '2%',
					    left: '2%',
					    bottom: '0',
					    containLabel: true,
					},
					yAxis: {
					    type: 'value',
					    color: '#fff',
						name: "(个)",
					    nameTextStyle: {
					        color: '#fff',
					    },
					    axisLine: {
					        lineStyle: {
					            type: 'solid',
					            color: '#ccc'
					        }
							
					    },
					    splitNumber: '3',
					    axisLabel: {
					        color: '#fff',
					        fontSize: '10px',
					    },
					    splitLine: {
							 show: true,  
					        lineStyle: {
					            type: 'dashed',
					            color: '#555'
					        }
					    },
					},
					 series: series
				})
				
				window.addEventListener("resize",function(){
				   linearBar.resize();
				   linearBar.resize();
				   linearBar.resize();
				});
			},
			
			// 折线图
			drawLine(id,xdata,yaxis) {
				this.charts = this.$echarts.init(id, null, {devicePixelRatio: 2.5});
				this.charts.setOption({
					grid: {
						show:true, 
						top: "18%",
						right: '5%',
						left: '5%',
						bottom: '15%',
						borderColor:"transparent",
						backgroundColor:'rgba(128, 128, 128, 0.1)',
					},
					tooltip: {
					    trigger: 'axis',
					    show:true,
						appendToBody:true
					},
					xAxis: {
						type: "category",
						data:xdata,
						axisLabel: {
							textStyle: {
								fontSize: '12',
								color: '#fff', // 坐标值的具体的颜色
								textaline: "center"
							},
						},
					},
					yAxis: {
						type: "value",
						name: "（个）",
						nameTextStyle: {
							color: "#fff"
						},
						
						
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
								color: '#8990aa',
								 // width: 2,
							}
						},
						axisLabel: {
							textStyle: {
								fontSize: '12',
								color: '#fff' // 坐标值的具体的颜色
							},
						},
					},
					series: [{
						type: "line",
						data: yaxis,
						itemStyle: {
							backgroundColor: '#6eaaee'
						}
					}]
				});
				window.onresize = this.charts.resize;
			},
			
		}
	}
</script>

<style scoped>
	.safe{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.safebox{
		display: flex;
		justify-content: space-between;
	}
	.el-tabs {
		padding-left: 15px;
		box-sizing: border-box;
	}
	/deep/.el-tabs__item {
		font-size: 12px;
		color: white;
	}
	/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item {
		border: none;
	}
	/deep/.el-tabs--card>.el-tabs__header .el-tabs__nav {
		border: none;
	}
	/deep/.el-tabs--card>.el-tabs__header {
		border: none;
	}
	/deep/.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		width: 80px;
		height:28px;
		line-height: 28px;
		text-align: center;
		background: linear-gradient(180deg, rgba(3, 87, 176, 0) 0%, rgba(61, 159, 207, 0.7) 100%);
		border-radius: 4px;
		border: 1px solid #52CCFF !important;
	}
	/deep/.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2) {
	    padding-left: 0;
	}
	/deep/.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
    padding-right: 0px;
}
/deep/.el-tabs--card>.el-tabs__header .el-tabs__item{
	width: 85px;
	text-align: center;
	
}
	.el-tab-pane {
		color: #428bca;
	}
	.el-carousel--horizontal{
		height: 100%;
	}
	#pane-first{
		display: flex;
		justify-content: space-between;
		width: 100vw;
	}
	#pane-second{
		display: flex;
		justify-content: space-between;
		width: 100vw;
	}
	
	.con{
		width: 50%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.con::after{
	        content: '';
	        flex: auto; 
	     }
	.con li{
		width:48%;
		height:38vh;
		background: rgba(2, 82, 173, 0.3000);
		border-radius: 10px;
		padding: 20px 15px 15px 15px;
		cursor: pointer;
		color: #fff;
		box-sizing: border-box;
		margin-bottom: 20px;
		margin-right: 1.75%;
	}
	.con li:nth-of-type(4n){
	  margin-right: 0;
	}
	.con li p{
		width: 100%;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		overflow: hidden;
	}
	.con li img{
		width: 100%;
		height: 80%;
		margin-top: 15px;
	}
	.con li .title{
		font-size: 16px;
		font-weight: 800;
	}
	.con li .submi{
		display: inline;
		padding: 5px 10px;
		font-size: 12px;
		font-weight: 100;
		width: 80px;
		overflow: hidden;
		color: #fff;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: 4px;
		background: #D8D8D8 linear-gradient(180deg, #00A0FF 0%, #008EEF 100%);
		line-height: 16px;
	}
	.saferight{
		width: 50%;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	.bgbox-s{
		width: 47.5%;
	}
	/deep/.titletext{
		margin-top: -10px;
	}
	/deep/.titlel{
		height: 10% !important;
	}
	.bgbox-m{
		width: 94%;
	}
	/deep/.el-pagination{
		margin-top: 0;
	}
</style>
