<template>
	<div style="htr">
		<div class="bgbox-s" @click="gokaoqin">
			<Titles>
				<template v-slot:nametext>
					今日人员考勤-(人)
				</template>
			</Titles>
			<div class="charttwo" ref="charttwo"></div>
		</div>
		<div class="bgbox-s"  @click="gogongzi">
			<Titles>
				<template v-slot:nametext>
					{{mounthdata}}月农民工工资-(人)
				</template>
			</Titles>
			<div class="charttwo" ref="chartthree"></div>
		</div>
		<div class="bgbox-s" @click="gorectify">
			<Titles>
				<template v-slot:nametext>
					{{mounthdata}}月安全检查-(次)
				</template>
			</Titles>
			<div class="charttwo" ref="chartfour"></div>
		</div>
	</div>
</template>

<script>
	import Titles from '@/components/slot/Titles.vue'
	import {charttwo,chaetthree,chartfour} from '@/utils/home'
	export default {
		components:{
			Titles
		},
		data() {
			return{
				mounthdata:''//月份
			}
		},
		mounted() {
			this.setMounth()
			charttwo().then(res=>{
				if(res.code == 200){
					this.echartsInit(res.data,this.$refs.charttwo)
				}else{
					this.$message.error("网络请求错误")
				}
				
			})
			chaetthree().then(res=>{
				if(res.code == 200){
					this.echartsInit(res.data,this.$refs.chartthree)
				}else{
					this.$message.error("网络请求错误")
				}
			})
			chartfour().then(res=>{
				if(res.code == 200){
					this.echartsInit(res.data,this.$refs.chartfour)
				}else{
					this.$message.error("网络请求错误")
				}
			})
			
		},
		methods:{
			// 月份
			setMounth() {
			    var date = new Date()
			    var mounth = date.getMonth()
			    if (mounth == 0) {
			        mounth = 12
			    }
				this.mounthdata=mounth
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
				    var color = ["#23BBEE", "#FFB140"]
				    var dataItem = {
				        data: data.yaxisSeries[key],
				        type: 'bar',
				        barWidth: '20%',
				        name: key,
				        itemStyle: {
				                color: color[index],
				                label: {
				                    show: false,
				                    position: "insideRight", // 在上方显示
				                    textStyle: {
				                        // 数值样式
				                        color: "white",
				                        fontSize: 9
				                    }
				                }
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
					    },
						 padding: 5,  
						 confine:true,
						 textStyle: {
						       fontSize: 10,}
					},
					xAxis: {
					    type: 'category',
					    data: data.xaxis,
					    axisLabel: {
					        color: '#fff',
					        fontSize: '10px',
					        interval: 0,
					        rotate: "0",
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
					    top: '7%',
					    right: '1%',
					    left: '1%',
					    bottom: '5%',
					    right: '1%',
					    left: '1%',
					    containLabel: true,
					    borderWidth:2
					},
					yAxis: {
					    type: 'value',
					    color: '#fff',
					    nameTextStyle: {
					        color: '#fff'
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
					        fontSize: '10px'
					    },
					    splitLine: {
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
			// 考勤跳转
			gokaoqin(){
				this.$router.push('/synthesize/faceAttendance/index')
			},
			// 农名工工资跳转
			gogongzi(){
				this.$router.push('/synthesize/team/index?type=0')
			},
			// 质量安全跳转
			gorectify(){
				this.$router.push('/safe/index')
			}
			
		}
	}
</script>

<style scoped>
	.charttwo{
		height: 6.36875vw;
		min-height: 80px;    
		margin-bottom: -30px;
		margin-top: 10px;
	}
	
</style>