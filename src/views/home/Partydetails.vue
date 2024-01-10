<template>
	<div class="partdetails">
		<div class="container default_div" style="opacity: 1;">
			<el-button type="primary" @click="depart()"> <i class="el-icon-d-arrow-left"></i> 返回</el-button>
			<h2>{{detaildata.mfteTitle}}</h2>
			<p class="timer">{{detaildata.mfteCreateTime}}</p>
			<div id="deedtetx"></div>
		</div>
		
	</div>
</template>

<script>
	import {builddetail} from '@/utils/home.js'
	export default{
		data() {
			return{
				detaildata:{}
			}
		},
		mounted() {
			builddetail(this.$route.query.id).then(res=>{
				this.detaildata=res
				document.getElementById("deedtetx").innerHTML=res.mfte
				// console.log(res.mfte)
			})
		},
		methods:{
			depart(){
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	.partdetails{
		width: 100%;
		height:calc( 100vh - 5.3292vw);
		overflow: hidden;
		background: url("~@/assets/image/home/party_build_bg.jpg") no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		padding: 3%;
		box-sizing: border-box;
	}
	.default_div {
    background-color: #1f497a78;
    border-radius: 10px;
    opacity: 0.79;
    padding: 10px 10px 10px 10px;
	width:94%;
	height: 100%;
	overflow-y: scroll;
	color: white;
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;
}
.default_div::-webkit-scrollbar { width: 0 !important }
h2{
	text-align: center;
	font-size: 30px;
	font-weight: normal;
}
#deedtetx{
	font-size: 14px;
	line-height: 28px;
}
.timer{
	text-align: center;
}
/deep/ *{
	list-style:revert !important;
	box-sizing: border-box !important;
}
/deep/ ul,ol{
    margin-top: 0 !important;
    margin-bottom: 10px !important;
	padding-left: 40px !important; 
}
/deep/ol{
	padding-left: 40px !important; 
}
</style>