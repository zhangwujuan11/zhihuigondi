<template>
	<div class="homedown">
		<div class="bgbox-m pens">
			<Titles>
				<template v-slot:nametext>
					{{mounthdata}}月日常管理-(分)
				</template>
			</Titles>
			<div class="chart" ref="chartone"></div>
		</div>
		<div class="bgbox-m penst">
			<Titles>
				<template v-slot:nametext>
					{{mounthdata}}月施工进度-(万元)
				</template>
			</Titles>
			<div class="chart"  ref="charttwo"></div>
		</div>
		<div class="bgbox-m penst">
			<Titles>
				<template v-slot:nametext>
					{{mounthdata}}月质量检查-(次)
				</template>
			</Titles>
			<div class="chart" ref="chartthree"></div>
		</div>
	</div>
</template>

<script>
	import Titles from '@/components/slot/Titles.vue'
	import {chartdowntwo, chartdownthree} from '@/utils/home'
	export default {
		components:{
			Titles
		},
		data() {
			return{
				mounthdata:'',//月份
				datafrist:{
					xdata:["大沃段", "东港段", "蓝园D1", "蓝园D2", "三山段", "江阴段"],
					ydata: [93.8, 96.09, 94.87, 91.84, 94.2, 92.8],
				}
			}
		},
		mounted() {
			this.setMounth()
			this.echartsInit(this.$refs.chartone,this.datafrist)
			chartdowntwo().then(res=>{
				this.setCommonOption(this.$refs.charttwo,res.data)
			})
			chartdownthree().then(res=>{
				this.setCommonOption(this.$refs.chartthree,res.data)
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
			// 日常管理echarts
			echartsInit(box,data) {
				let linearBar = this.$echarts.getInstanceByDom(box); //有的话就获取已有echarts实例的DOM节点。
				if (linearBar == null) { // 如果不存在，就进行初始化。
					linearBar = this.$echarts.init(box ,null, {devicePixelRatio: 2.5});
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
					        data:data.xdata,
					        axisLabel: {
					            color: '#fff',
					            fontSize: '10px',
					            interval: 0,
					            rotate: "0"
					        },
					        axisLine: {
					            lineStyle: {
					                type: 'solid',
					                color: '#ccc',
					            }
					        },
					    },
					    grid: {
					        top: '10%',
					        left: '3%',
					        right: '3%',
					        bottom: '5%',
					        containLabel: true
					    },
					    yAxis: {
					        type: 'value',
					        color: '#fff',
					        max: 100,
					        interval: 25,
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
					    series: [
					        {
					            data:data.ydata,
					            type: 'bar',
					            barWidth: '20%',
					            itemStyle: {
					                    //这里是重点
					                    color: function (params) {
					                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
					                        var colorList = ['#23BBEE', '#EE2323', '#16D63C', '#ED6E2E', '#c23531', '#c23531'];
					                        return colorList[params.dataIndex]
					                    },
					                    label: {
					                        show: false,
					                        position: "insideRight", // 在上方显示
					                        textStyle: {
					                            color: "white",
					                            fontSize: 10,
					                        },
					                    },
					            },
					            showBackground: true,
					            backgroundStyle: {
					                color: 'rgba(180, 180, 180, 0.2)'
					            },
					            label: {
					                show: false,
					                position: 'top'
					            },
					        }
					
					    ]
					})
					window.addEventListener("resize",function(){
					   linearBar.resize();
					   linearBar.resize();
					});
			},
			
			// 施工进度
			setCommonOption(box,data) {
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
				                        fontSize: 9,
				                    },
				                },
				        },
				    }
				    series.push(dataItem)
				    index++
				}
			   let linearBar = this.$echarts.getInstanceByDom(box); //有的话就获取已有echarts实例的DOM节点。
			   if (linearBar == null) { // 如果不存在，就进行初始化。
			   	linearBar = this.$echarts.init(box ,null, {devicePixelRatio: 2.5});
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
				           fontSize: '12px',
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
				   series:  series
			   })
			   window.addEventListener("resize",function(){
			      linearBar.resize();
			      linearBar.resize();
			   });
			
			}
		}
	}
</script>

<style scoped>
	.homedown{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.titlel{
		height:0px ;
	}
	.chart{
		margin-bottom: -30px;
		margin-top: 10px;
		height: 115px;
	}
	.pens{
		width: 25%;
	}
	.penst{
		width: 37%;
	}
</style>