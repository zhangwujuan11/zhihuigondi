<template>
	<div class="partybuild">
		<div class="maincon buildtop">
			<div class="bgbox-m pens">
				<Titlem>
					<template v-slot:nametext>
						快捷访问
					</template>
				</Titlem>
				<div class="chart">
					<p
					v-for="(item,index) in asklist"
					:key="index"
					><a :href="item.mfteCover" target="_blank">{{item.mfteTitle}}</a></p>
				</div>
			</div>
			<div class="swiper">
				<el-carousel :interval="3000" trigger="click" arrow="always" height="290px" :autoplay="true">
					<el-carousel-item v-for="item in swipelist" :key="item.id" >
						<img :src="item.mfteCover" style="width: 100%;height: 100%;" @click="swipers(item.id)">
						<h3  @click="swipers(item.id)" class="swiperh3">{{ item.mfteTitle }}</h3>
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="bgbox-m pens">
				<Titlem>
					<template v-slot:nametext>
						党支部情况
					</template>
				</Titlem>
				<div class="chart" ref="chartone"></div>
			</div>
		</div>
		<div class="maincon lagetitle">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="党建活动" name="first">
					<p
					class="dashline"
					v-for="(item,index) in onelist"
					:key="index"
					@click="godan(item.id)"
					>{{item.mfteTitle}}
					<span>{{item.mfteCreateTime}}</span>
					</p>
					<p v-if="onelist.length==0" class="dashline">暂无内容</p>
				</el-tab-pane>
				<el-tab-pane label="工作动态" name="second">
					<p
					class="dashline"
					v-for="(item,index) in onelist"
					:key="index"
					@click="godan(item.id)"
					>{{item.mfteTitle}}
					<span>{{item.mfteCreateTime}}</span>
					</p>
					<p  v-if="onelist.length==0" class="dashline">暂无内容</p>
					</el-tab-pane>
				<el-tab-pane label="经验交流" name="third">
					<p
					class="dashline"
					v-for="(item,index) in onelist"
					:key="index"
					@click="godan(item.id)"
					>{{item.mfteTitle}}
					<span>{{item.mfteCreateTime}}</span>
					</p>
					<p  v-if="onelist.length==0" class="dashline">暂无内容</p>
					</el-tab-pane>
				<el-tab-pane label="学习园地" name="fourth">
					<p
					class="dashline"
					v-for="(item,index) in onelist"
					:key="index"
					@click="godan(item.id)"
					>{{item.mfteTitle}}
					<span>{{item.mfteCreateTime}}</span>
					</p>
					<p  v-if="onelist.length==0" class="dashline">暂无内容</p>
					</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import Titlem from '@/components/slot/Titlem.vue'
	import {partbulidask, dangjain} from '@/utils/home.js'
	export default {
		name:'tryu',
		components: {
			Titlem
		},
		data() {
			return {
				activeName: 'first',
				asklist:[],
				onelist:[],
				swipelist:[]
				
			}
		},
		mounted() {
			partbulidask().then(res=>{
				this.asklist=res.items
			})
			dangjain(1).then(res=>{
				if(res.items != []){
					this.onelist=res.items
				}
			})
			dangjain(5).then(res=>{
				if(res.items != []){
					this.swipelist=res.items
					// console.log(res.items)
				}
			})
		},
		methods: {
			// 切换tab
			handleClick(tab) {
				dangjain(Number(tab.index) + 1).then(res=>{
					if(res.items != []){
						this.onelist=res.items
					}
				})
			},
			godan(i){
				this.$router.push({
					path:'/home/partydetails',
					query:{id:JSON.stringify(i)}
				})
			},
			swipers(i){
				this.$router.push({
					path:'/home/partydetails',
					query:{id:JSON.stringify(i)}
				})
			}
		}
	}
</script>

<style scoped>
	.partybuild {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.buildtop {
		display: flex;
		justify-content: space-between;
	}
	.pens {
		width: 25%;
	}
	.chart {
		padding-left: 15px;
		box-sizing: border-box;
		height: 200px;
		margin-top: 15px;
		overflow-y: scroll;
		overflow: -moz-scrollbars-none;
	}
	.chart::-webkit-scrollbar { width: 0!important }
	.chart p {
		width: 100%;
		line-height: 37px;
		border-bottom: 1px dashed #3563A1;
	}
	.dashline span{
		float: right;
	}
	.chart a {
		color: #428bca;
		list-style: none;
		text-decoration: none;
		font-size: 14px;
	}
	/* 轮播图 */
	.swiper {
		width: 48%;
		height: 290px;
	}
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}
	/deep/ .el-carousel__button {
		display: block;
		opacity: 1;
		width: 10px;
		height: 10px;
		background-color: transparent;
		border: 1px solid #fff;
		outline: 0;
		padding: 0;
		margin: 0;
		cursor: pointer;
		transition: .3s;
		border-radius: 50%;
	}
	/deep/ .el-carousel__indicator.is-active button {
		background-color: #fff;
	}
	/deep/.el-carousel__indicator--horizontal {
		padding: 12px 1px;
	}
	/deep/.el-carousel__arrow i {
		font-size: 20px;
		font-weight: 800;
		color: #C6C9C8;
	}
	.el-carousel__arrow {
		border: none;
		outline: 0;
		padding: 0;
		margin: 0;
		height: 36px;
		width: 36px;
		cursor: pointer;
		transition: .3s;
		border-radius: 50%;
		background-color: transparent;
		position: absolute;
		top: 50%;
		z-index: 10;
		transform: translateY(-50%);
	}
	/deep/.el-carousel__arrow:hover {
		color: red;
	}
	.lagetitle::before {
		content: "";
		display: block;
		width: 100%;
		height: 43px;
		background: url("~@/assets/image/synthesize/tle.png") no-repeat;
		background-size: 100% 100%;
	}
	.lagetitle::after {
		content: "";
		display: block;
		width: 100%;
		height: 43px;
		background: url("~@/assets/image/synthesize/panel-item-bottom-full.png") no-repeat;
		background-size: 100% 100%;
	}
	.el-tabs {
		padding-left: 15px;
		box-sizing: border-box;
		margin-top: -30px;
	}
	/deep/.el-tabs__item {
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
		width: 100px;
		height: 33px;
		line-height: 33px;
		background: linear-gradient(180deg, rgba(3, 87, 176, 0) 0%, rgba(61, 159, 207, 0.7) 100%);
		border-radius: 4px;
		border: 1px solid #52CCFF !important;
	}
	.el-tab-pane {
		color: #428bca;
	}
	.el-carousel--horizontal{
		height: 100%;
	}
	.dashline{
		width: 100%;
		line-height: 37px;
		border-bottom: 1px dashed #3563A1;
		color: #428bca;
		font-size: 14px;
		cursor: pointer;
		padding-right: 10px;
		box-sizing: border-box;
	}
	/deep/.swiperh3{
		position: absolute;
		bottom: 10px;
		background-color: #00000080;
		color: white !important;
		line-height: 40px !important;
		text-align: center;
		font-size: 14px !important;
		opacity: 1;
		font-weight: normal;
		padding: 12px;
		left: 20%;
		right: 20%;
		border-radius: 8px;
	}
</style>
