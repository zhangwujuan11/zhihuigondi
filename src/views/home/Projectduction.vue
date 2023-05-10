<template>
	<div class="projec">
		<div class="projeccon">
			<h3>项目简介</h3>
			<p class="jianjietop">{{titlelist.content | content}}</p>
			<ul>
				<li v-for="(item,index) in datalist" :key="index">
					<span>{{item.title}}</span>
					<p class="jianjietop">{{item.content | content}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {homnescon} from '@/utils/home'
	export default{
		filters:{
			content(e){
				return e.replace(/<[^>]+>/g,"")
			}
		},
		data() {
			return{
				titlelist:{},
				datalist:[]
			}
		},
		mounted() {
			homnescon().then(res=>{
				//this.realtime=res.data.items[0].content.replace(/<[^>]+>/g,"")
				let list=res.data.items
				for(let i=0;i<list.length;i++){
					if(list[i].title == '项目简介'){
						this.titlelist=list[i]
						list.splice(i,1) 
					}
				}
				this.datalist=list
			})
		}
	}
</script>

<style scoped>
	.projec{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.projeccon::before {
	    content: "";
	    display: block;
	    width: 100%;
	    height: 43px;
		background: url("~@/assets/image/synthesize/tle.png") no-repeat;
		background-size: 100% 100%;
	}
	.projeccon::after {
	    content: "";
	    display: block;
	    width: 100%;
	    height: 43px;
		background: url("~@/assets/image/synthesize/panel-item-bottom-full.png") no-repeat;
		background-size: 100% 100%;
	}
	.projeccon{
		width: calc(100% - 30px);
	}
	.projeccon h3{
		text-align: center;
		color: rgba(76, 233, 245, 1);
		margin-top: -15px;
	}
	.jianjietop{
		text-indent: 2em;
		color: #fff;
		font-size: 12px;
		margin:10px 0 ;
	}
  li span{
	  color: rgba(76, 233, 245, 1);
	  font-weight: 600;
	  font-size: 16px;
  }
  li{
	  padding:15px;
  }
  li:nth-child(even){
	  background: rgba(2, 82, 173, 0.3);
  }
</style>