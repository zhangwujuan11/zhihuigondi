<template>
	<div class="uavideo">
		<div class="uavideobox maincon">
			<div class="uavleft">
				<p style="width: 100%;text-align: center;">
					<el-button v-if="bwbtn" class="BWbtn" type="primary" @click="back">返回</el-button>
				</p>
				
				<div 
				class="default_div_folder"
				v-for="(item ,index) in folderfilelist"
				:key="index"
				@click="changechilder(item.id)"
				>
					<img src="@/assets/image/cams/management_files_folder.png" alt="">
					<p class="folder_name">{{item.folderName}}</p>
				</div>
			</div>
			<div 
			class="uavright"
			>
				<div 
				class="default_div_file"
				v-for="(items,index) in childerlist"
				:key="items.id"
				@click="openfiler(items.fileAddr)"
				>
					<img src="@/assets/image/cams/management_files_file.png" alt="">
					<span>{{items.fileName}}</span>
				</div>
				<i v-for="num in 3" :key="num" style="width: 24%;"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import {folderfile, listid} from "@/utils/document.js"
	export default{
		data() {
			return{
				folderfilelist:[],
				childerlist:[],
				bwbtn:false,
				idList:[0]
			}
		},
		mounted() {
			this.getDatas()
		},
		methods:{
			// 总数据
			getDatas(){
				folderfile().then(res=>{
					if(res.item != []){
						this.folderfilelist=res.items
						this.childerlist=res.items[0].tblManagementFileResponse.items
					}
				})
			},
			changechilder(i){
					if(i==null||i===undefined){
						i=this.idList[this.idList.length-1]
						this.idList.pop(i)
					}
					if(i==0){
						this.bwbtn=false
					}else{
						this.bwbtn=true
					}
					listid(i).then(res=>{
						this.idList.push(i)
						this.childerlist=res.items[0].tblManagementFileResponse.items
						this.folderfilelist=res.items
						
					})
			},
			back(){
				this.idList.pop()
				this.changechilder(this.idList[this.idList.length-1])
				this.idList.pop()
				
			},
			openfiler(e){
				if(e != null){
					window.open(e)
				}else{
					this.$message.error('文件地址出错')
				}
				
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
		width: 19%;
		background-color: #1f497a78;
		border-radius: 10px;
		opacity: 0.79;
		height: calc(100% - 40px);
		overflow-y: scroll;
		display: flex;
		justify-content:center;
		padding: 10px 0;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	.uavleft::-webkit-scrollbar { width: 0 !important }
	.uavright::-webkit-scrollbar { width: 0 !important }
	.uavright{
		width: 80%;
		background-color: #1f497a78;
		border-radius: 10px;
		opacity: 0.79;
		height: calc(100% - 20px);
		overflow-y: scroll;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: space-between;
	}
	.uavright::after {
	  content: '';
	}
	.default_div_folder {
		
	    color: #000;
	    border: 2px solid #000;
	    background-color: #ffea9e;
	    box-shadow: 0px 0px 5px #444444 inset, 0px 0px 15px #75757b inset;
	    border-radius: 5px;
	    padding: 10px 10px 10px 10px;
		display: flex;
		height: 100px;
		cursor: pointer;
		box-sizing: border-box;
		margin-bottom: 20px;
		width: 85%;
		align-items: center;
	}
	.folder_name {
	    overflow: hidden;
	    font-size: 18px;
	}
	.default_div_folder img{
		width: 55px;
		height: 55px;
	}
	.default_div_file{
	    color: #000;
	    border: 2px solid #000;
	    background-color: #fff;
	    box-shadow: 0px 0px 5px #444444 inset, 0px 0px 15px #75757b inset;
	    border-radius: 5px;
	    padding: 10px 10px 20px 10px;
		width: 24%;
		min-height: 1px;
		padding-right: 15px;
		padding-left: 15px;
		box-sizing: border-box;
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		font-size: 12px;
		cursor: pointer;
	}
	.default_div_file img{
		width: 60px;
		height: 60px;
	}
	.BWbtn{
		margin-bottom: 20px;
	}
</style>