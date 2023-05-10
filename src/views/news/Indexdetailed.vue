<template>
	<div class="indexdetail">
		<div class="maincon" style="background-color: #1f497a78;">
			<el-button size="mini" @click="goback()"><i class="el-icon-d-arrow-left"></i>返回</el-button>
			<div class="activeclass">
				<span style="font-size: 30px;">
					{{info.mfteTitle}}
				</span>
				<p>{{info.mfteCreateTime}}</p>
			</div>
			<p style="color: white;" ref="con"></p>
		</div>
	</div>
</template>

<script>
	import {newsdetails} from '@/utils/news.js'
	export default{
		data() {
			return{
				info:{}
			}
		},
		mounted() {
			newsdetails(this.$route.query.id).then(res=>{
				this.info=res
				this.$refs.con.innerHTML=res.mfte
			})
		},
		methods:{
			goback(){
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	.indexdetail{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-top: 3%;
		box-sizing: border-box;
	}
	.maincon .el-button{
		background-color:#5bc0de;
		color: white;
		font-size: 14px;
		border: none;
		outline: none;
	}
	.activeclass{
		color: white;
		text-align: center;
		font-size: 14px;
	}
	.maincon {
		padding: 2%;
		box-sizing: border-box;
		border-radius:10px;
	}
	.con{
		text-indent: 30px;
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