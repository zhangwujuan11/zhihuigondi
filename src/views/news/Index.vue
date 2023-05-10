<template>
	<div class="partybuild">
		<div class="maincon buildtop">
			<div class="swiper">
				<el-carousel :interval="3000" trigger="click" arrow="always" height="100%">
					<el-carousel-item v-for="item in cover" :key="item.id">
						<img @click="goqueryid(item.id)" :src="item.mfteCover" style="width: 100%;height: 100%;">
						<h3  @click="goqueryid(item.id)" class="swiperh3">{{ item.mfteTitle }}</h3>
					</el-carousel-item>
				</el-carousel>
			</div>
			
			<div class="bgbox-m pens">
				<Titlem>
					<template v-slot:nametext>
						特别关注
					</template>
				</Titlem>
				<div class="chart">
					<p @click="goqueryid(item.id)" v-for="item in special" :key="item.id">{{item.mfteTitle}}</p>
				</div>
			</div>
		</div>
		<div class="maincon">
			<ul>
				<li class="bgbox-s"
				  @click="goqueryid(item.id)"
				  v-for="item in lidata"
				  :key="item.id"
				  >
					<p class="data-item-main">
						<p class="data-item-main">
							<img  v-if="item.mfteCover" :src="item.mfteCover" alt="">
							<img v-else src="@/assets/image/news/news_error.jpg" alt="">
							<span>{{item.mfteTitle}}</span>
							<span>{{item.mfteCreateTime}}</span>
						</p>
					</p>
				</li>
			</ul>
			<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
				:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next, jumper" :total="totalCount">
			</el-pagination>
		</div>
		
		
	</div>
</template>

<script>
	import Titlem from '@/components/slot/Titlem.vue'
	import {siteinfo,siteinfot,newsli} from '@/utils/news.js'
	export default{
		components:{
			Titlem
		},
		data() {
			return{
				cover:[],//轮播
				special:[],//特别关注
				lidata:[],//
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 8,
			}
		},
		mounted() {
			siteinfot().then(res=>{
				this.cover=res.items
			})
			siteinfo().then(res=>{
				this.special=res.items
			})
			newsli({
				pageSize: 8,
				pageNum: 1,
				orderByColumn:'id',
				isAsc:'desc'
			}).then(res=>{
				this.lidata=res.items
				this.totalCount=res.total
			})
		},
		methods:{
			goqueryid(i){
				this.$router.push({
					path:'/news/indexdetailed',
					query:{id:i}
				})
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				newsli({
					pageSize: 8,
					pageNum: val,
					orderByColumn:'id',
					isAsc:'desc'
				}).then(res=>{
					this.lidata=res.items
					this.totalCount=res.total
				}).catch(()=>{
					this.$message.error('请求错误')
				})
				this.currentPage = val
			},
		}
	}
</script>

<style scoped>
	/deep/.titletext{
		height: 42px;
		line-height: 42px;
		font-size: 16px;
	}
	/deep/.titlel{
		height: 30px;
	}
	.partybuild{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.buildtop {
		display: flex;
		justify-content: space-between;
	}
	.pens{
		width: 41%;
	}
	.chart{
		height: 290px;
		overflow-y: scroll;
		overflow: -moz-scrollbars-none;
	}
	.chart::-webkit-scrollbar { width: 0!important }
	.chart p{
		line-height: 37px;
		border-bottom: 1px dashed #3563A1;
		color: #428bca;
		list-style: none;
		text-indent:15px;
		font-size: 14px;
		cursor: pointer;
	}
	/* 轮播图 */
	.swiper {
		width: 58%;
		height: 360px;
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
	.maincon ul{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.maincon ul::after{
		content: '';
		 flex: auto;
	}
	.bgbox-s{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.maincon ul li{
		width: 25%;
		padding: 10px;
		box-sizing: border-box;
	}
	.maincon ul li img{
		width: 100%;
		height: 124px;
	}
	.data-item-main {
	    padding: 10px;
	    background: rgba(2,82,173,0.3);
	    border-radius: 10px;
		box-sizing: border-box;
		width: 90%;
		margin: -15px 0;
	}
	.data-item-main span{
		display: block;
		color: #00CFFF;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	/deep/.swiperh3{
		position: absolute;
		bottom: 10px;
		background-color: #00000080;
		border-radius: 10px;
		color: white !important;
		line-height: 40px !important;
		text-align: center;
		font-size: 14px !important;
		font-weight: normal;
		padding: 10px;
		left: 20%;
		right: 20%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.el-pagination{
		margin-top: 0;
		margin-bottom: 20px;
	}
</style>