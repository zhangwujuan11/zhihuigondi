<template>
	<div class="uavideo">
		<div class="uavideobox maincon">
			<div class="uavleft">
				<div 
				class="video-item" 
				v-for="(item,index) in vlist"
				:key="index"
				@click="changevideo(index)"
				>
					<img v-if="!item.img" src="@/assets/image/logo.png" >
					<img v-if="item.img" :src="item.img">
					<p>{{item.ayVideosNote}}</p>
				</div>
			</div>
			<div class="uavright">
				<video id="uav_video" style="width: 100%;height: 100%" width="100%" height="100%" controls autoplay='true'>
				    <source id="videosSource" :src="videosrc" type="video/mp4">
				</video>
			</div>
		</div>
	</div>
</template>

<script>
	import {VidoList} from "@/utils/cams.js"
	export default{
		data() {
			return{
				vlist:[],
				videosrc:'#'
			}
		},
		mounted() {
			VidoList().then(res=>{
				this.vlist=res.items
				if(res.items.length>0){
					this.videosrc=res.items[0].ayVideosAddr
					this.$nextTick(()=>{
						this.changevideo(0)
					})
				}
			})
		},
		methods:{
			changevideo(i){
				var player = document.querySelector('#uav_video')
				player.src = this.vlist[i].ayVideosAddr
				player.play()
			}
		}
	}
</script>

<style scoped>
	.uavideo{
		display: flex;
		justify-content: center;
		height:calc( 100vh - 5.3292vw);
	}
	.uavideobox{
		display: flex;
		justify-content: space-between;
	}
	.uavleft{
		width: 25%;
		background-color: #1f497a78;
		border-radius: 10px;
		opacity: 0.79;
		height: calc(100% - 40px);
		overflow-y: scroll;
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	.uavleft::-webkit-scrollbar { width: 0 !important }
	.uavright{
		width: 72%;
		background-color: #1f497a78;
		border-radius: 10px;
		opacity: 0.79;
		height: calc(100% - 20px);
		padding: 10px;
		box-sizing: border-box;
	}
	.video-item {
	    background: #0252AD;
	    height: 140px;
	    color: #fff;
	    border: none;
	    padding: 10px;
		width: 45%;
		box-sizing: border-box;
		margin-bottom: 15px;
		cursor: pointer;
	}
	.video-item img{
		width: 100%;
		height:63%;
	}
	.video-item p{
		margin-top: 5px;
		margin-bottom: 0;
		color: #fff;
		line-height: 24px;
		text-align: center;
		height: 24px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
	}
</style>